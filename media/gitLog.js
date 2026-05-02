(function () {
  const state = window.__GIT_LOG_STATE__;

  const uiState = {
    selectedBranchId: state.initialBranchId,
    selectedCommitId: "",
    selectedFileId: "",
    expandedRefs: new Set(["head-main", "local-group", "remote-group", "origin", "tags-group"]),
    expandedFiles: new Set()
  };

  function getCommitsForSelectedBranch() {
    return state.commitsByBranch[uiState.selectedBranchId] || [];
  }

  function getSelectedCommit() {
    return getCommitsForSelectedBranch().find((commit) => commit.id === uiState.selectedCommitId) || null;
  }

  function ensureSelection() {
    const commits = getCommitsForSelectedBranch();
    if (!commits.length) {
      uiState.selectedCommitId = "";
      uiState.selectedFileId = "";
      return;
    }

    if (!commits.some((commit) => commit.id === uiState.selectedCommitId)) {
      uiState.selectedCommitId = commits[0].id;
    }

    const commit = getSelectedCommit();
    if (!commit) {
      uiState.selectedFileId = "";
      return;
    }

    initializeExpandedFiles(commit.changedFiles);
    const firstFile = flattenFiles(commit.changedFiles).find((node) => node.type === "file");
    if (!firstFile) {
      uiState.selectedFileId = "";
      return;
    }

    if (!flattenFiles(commit.changedFiles).some((node) => node.id === uiState.selectedFileId)) {
      uiState.selectedFileId = firstFile.id;
    }
  }

  function initializeExpandedFiles(nodes) {
    nodes.forEach((node) => {
      if (node.type === "folder") {
        uiState.expandedFiles.add(node.id);
        initializeExpandedFiles(node.children || []);
      }
    });
  }

  function flattenFiles(nodes) {
    const result = [];
    nodes.forEach((node) => {
      result.push(node);
      if (node.children) {
        result.push(...flattenFiles(node.children));
      }
    });
    return result;
  }

  function render() {
    ensureSelection();

    const app = document.getElementById("app");
    if (!app) {
      return;
    }

    const selectedCommit = getSelectedCommit();
    const commits = getCommitsForSelectedBranch();

    app.innerHTML = "";
    const layout = document.createElement("div");
    layout.className = "layout";

    layout.appendChild(renderRefsPanel());
    layout.appendChild(renderCommitPanel(commits));
    layout.appendChild(renderFilesPanel(selectedCommit));

    app.appendChild(layout);
  }

  function renderRefsPanel() {
    const panel = createPanel("References");
    const body = panel.querySelector(".panel-body");
    const tree = document.createElement("div");
    tree.className = "tree";
    state.branches.forEach((node) => tree.appendChild(renderRefNode(node, 0)));
    body.appendChild(tree);
    return panel;
  }

  function renderRefNode(node, depth) {
    const wrapper = document.createElement("div");
    wrapper.className = "tree-node";

    const row = document.createElement("div");
    row.className = "tree-row";
    if (isSelectableRef(node)) {
      row.classList.add("clickable");
    }
    if (node.id === uiState.selectedBranchId) {
      row.classList.add("selected");
    }

    for (let index = 0; index < depth; index += 1) {
      const indent = document.createElement("span");
      indent.className = "indent";
      row.appendChild(indent);
    }

    const toggle = document.createElement("span");
    const hasChildren = Boolean(node.children && node.children.length);
    toggle.className = hasChildren ? "toggle" : "toggle spacer";
    toggle.textContent = hasChildren ? (uiState.expandedRefs.has(node.id) ? "▾" : "▸") : "•";
    if (hasChildren) {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (uiState.expandedRefs.has(node.id)) {
          uiState.expandedRefs.delete(node.id);
        } else {
          uiState.expandedRefs.add(node.id);
        }
        render();
      });
    }
    row.appendChild(toggle);

    const icon = document.createElement("span");
    icon.className = "ref-icon";
    icon.textContent = getRefIcon(node.type);
    row.appendChild(icon);

    const label = document.createElement("span");
    label.className = "ref-label";
    label.textContent = node.label;
    row.appendChild(label);

    if (node.type === "head") {
      const suffix = document.createElement("span");
      suffix.className = "ref-type";
      suffix.textContent = "current";
      row.appendChild(suffix);
    }

    if (isSelectableRef(node)) {
      row.addEventListener("click", () => {
        uiState.selectedBranchId = node.id;
        uiState.selectedCommitId = "";
        uiState.selectedFileId = "";
        render();
      });
    }

    wrapper.appendChild(row);

    if (hasChildren && uiState.expandedRefs.has(node.id)) {
      node.children.forEach((child) => wrapper.appendChild(renderRefNode(child, depth + 1)));
    }

    return wrapper;
  }

  function renderCommitPanel(commits) {
    const panel = createPanel("Commit Log");
    const body = panel.querySelector(".panel-body");

    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    toolbar.appendChild(createInput("Text or hash"));
    toolbar.appendChild(createSelect("Branch"));
    toolbar.appendChild(createSelect("User"));
    toolbar.appendChild(createSelect("Date"));
    toolbar.appendChild(createSelect("Paths"));
    body.appendChild(toolbar);

    const header = document.createElement("div");
    header.className = "commit-header";
    header.innerHTML = `
      <div>Graph</div>
      <div>Commit message</div>
      <div>Author</div>
      <div>Date</div>
    `;
    body.appendChild(header);

    const list = document.createElement("div");
    list.className = "commit-list";

    if (!commits.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No commits for the selected reference.";
      list.appendChild(empty);
    } else {
      commits.forEach((commit) => list.appendChild(renderCommitRow(commit)));
    }

    body.appendChild(list);
    return panel;
  }

  function renderCommitRow(commit) {
    const row = document.createElement("div");
    row.className = "commit-row";
    if (commit.id === uiState.selectedCommitId) {
      row.classList.add("selected");
    }
    row.addEventListener("click", () => {
      uiState.selectedCommitId = commit.id;
      uiState.selectedFileId = "";
      render();
    });

    const graphCell = document.createElement("div");
    graphCell.className = "commit-cell graph-cell";
    buildGraph(graphCell, commit);
    row.appendChild(graphCell);

    const message = document.createElement("div");
    message.className = "commit-cell commit-message";
    message.innerHTML = `<span>${escapeHtml(commit.message)}</span><span class="commit-hash">${escapeHtml(commit.shortHash)}</span>`;
    row.appendChild(message);

    const author = document.createElement("div");
    author.className = "commit-cell secondary";
    author.textContent = commit.author;
    row.appendChild(author);

    const date = document.createElement("div");
    date.className = "commit-cell secondary";
    date.textContent = commit.date;
    row.appendChild(date);

    return row;
  }

  function buildGraph(container, commit) {
    const laneOffset = 14 + (commit.graphLane || 0) * 18;

    const vertical = document.createElement("span");
    vertical.className = "graph-line";
    vertical.style.left = `${laneOffset}px`;
    vertical.style.background = commit.graphColor || "#2f80ed";
    container.appendChild(vertical);

    if (commit.graphShape === "mergeLeft") {
      const diagonal = document.createElement("span");
      diagonal.className = "graph-line diagonal-left";
      diagonal.style.left = `${laneOffset - 16}px`;
      diagonal.style.background = commit.graphColor || "#2f80ed";
      container.appendChild(diagonal);
    }

    if (commit.graphShape === "mergeRight") {
      const diagonal = document.createElement("span");
      diagonal.className = "graph-line diagonal-right";
      diagonal.style.left = `${laneOffset}px`;
      diagonal.style.background = commit.graphColor || "#2f80ed";
      container.appendChild(diagonal);
    }

    const dot = document.createElement("span");
    dot.className = "graph-dot";
    dot.style.left = `${laneOffset - 4}px`;
    dot.style.background = commit.graphColor || "#2f80ed";
    container.appendChild(dot);
  }

  function renderFilesPanel(selectedCommit) {
    const panel = createPanel("Changed Files");
    const body = panel.querySelector(".panel-body");

    const tree = document.createElement("div");
    tree.className = "file-tree";

    if (!selectedCommit) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Select a commit to inspect changed files.";
      tree.appendChild(empty);
    } else {
      selectedCommit.changedFiles.forEach((node) => tree.appendChild(renderFileNode(node, 0)));
    }

    body.appendChild(tree);
    body.appendChild(renderDetails(selectedCommit));
    return panel;
  }

  function renderFileNode(node, depth) {
    const wrapper = document.createElement("div");
    wrapper.className = "tree-node";

    const row = document.createElement("div");
    row.className = `file-row ${node.type === "file" ? "clickable" : ""}`.trim();
    if (node.id === uiState.selectedFileId) {
      row.classList.add("selected");
    }

    for (let index = 0; index < depth; index += 1) {
      const indent = document.createElement("span");
      indent.className = "indent";
      row.appendChild(indent);
    }

    const hasChildren = Boolean(node.children && node.children.length);
    const toggle = document.createElement("span");
    toggle.className = hasChildren ? "toggle" : "toggle spacer";
    toggle.textContent = hasChildren ? (uiState.expandedFiles.has(node.id) ? "▾" : "▸") : "•";
    if (hasChildren) {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (uiState.expandedFiles.has(node.id)) {
          uiState.expandedFiles.delete(node.id);
        } else {
          uiState.expandedFiles.add(node.id);
        }
        render();
      });
    }
    row.appendChild(toggle);

    const status = document.createElement("span");
    status.className = `file-status ${node.status ? `status-${node.status}` : ""}`.trim();
    status.textContent = node.status || "";
    row.appendChild(status);

    const icon = document.createElement("span");
    icon.className = "file-icon";
    icon.textContent = node.type === "folder" ? "📁" : "📄";
    row.appendChild(icon);

    const label = document.createElement("span");
    label.className = "file-label";
    label.textContent = node.name;
    row.appendChild(label);

    if (node.type === "file") {
      row.addEventListener("click", () => {
        uiState.selectedFileId = node.id;
        render();
      });
    }

    wrapper.appendChild(row);

    if (hasChildren && uiState.expandedFiles.has(node.id)) {
      node.children.forEach((child) => wrapper.appendChild(renderFileNode(child, depth + 1)));
    }

    return wrapper;
  }

  function renderDetails(selectedCommit) {
    const details = document.createElement("div");
    details.className = "details";

    if (!selectedCommit) {
      details.innerHTML = `<div class="detail-title">Commit Details</div><div class="detail-row">No commit selected.</div>`;
      return details;
    }

    details.innerHTML = `
      <div class="detail-title">${escapeHtml(selectedCommit.message)}</div>
      <div class="detail-row">Hash: <span class="secondary">${escapeHtml(selectedCommit.shortHash)}</span></div>
      <div class="detail-row">Author: <span class="secondary">${escapeHtml(selectedCommit.author)}</span></div>
      <div class="detail-row">Date: <span class="secondary">${escapeHtml(selectedCommit.date)}</span></div>
    `;
    return details;
  }

  function createPanel(title) {
    const panel = document.createElement("section");
    panel.className = "panel";
    panel.innerHTML = `<div class="panel-title">${title}</div><div class="panel-body"></div>`;
    return panel;
  }

  function createInput(placeholder) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    return input;
  }

  function createSelect(label) {
    const select = document.createElement("select");
    select.innerHTML = `<option>${label}</option>`;
    return select;
  }

  function isSelectableRef(node) {
    return ["localBranch", "remoteBranch", "tag"].includes(node.type);
  }

  function getRefIcon(type) {
    switch (type) {
      case "head":
        return "●";
      case "group":
        return "▦";
      case "remote":
        return "☁";
      case "localBranch":
      case "remoteBranch":
        return "⑂";
      case "tag":
        return "🏷";
      default:
        return "•";
    }
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  render();
})();
