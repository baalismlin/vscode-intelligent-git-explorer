import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

export function AuthorFilterPopover({
  userFilter,
  onApply
}: {
  userFilter: string;
  onApply: (userFilter: string) => void;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(userFilter);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen]);

  const applyFilter = (nextUserFilter: string) => {
    onApply(nextUserFilter.trim());
    setIsOpen(false);
  };

  const submitFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilter(draft);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const togglePopover = () => {
    if (!isOpen) {
      setDraft(userFilter);
    }

    setIsOpen((value) => !value);
  };

  return (
    <div className="commit-filter-popover-anchor">
      <button
        type="button"
        className={getFilterButtonClassName(userFilter)}
        onClick={togglePopover}
        title={userFilter || "User"}
        aria-expanded={isOpen}
      >
        {userFilter || "User"}
      </button>
      {isOpen ? (
        <form className="commit-filter-popover" onSubmit={submitFilter}>
          <input
            ref={inputRef}
            className="commit-user-filter-input"
            type="text"
            value={draft}
            placeholder="Author"
            aria-label="Author filter"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="commit-filter-popover-button"
            title="Apply author filter"
            aria-label="Apply author filter"
          >
            <span className="codicon codicon-check" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="commit-filter-popover-button"
            title="Clear author filter"
            aria-label="Clear author filter"
            onClick={() => applyFilter("")}
          >
            <span className="codicon codicon-clear-all" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="commit-filter-popover-button"
            title="Close author filter"
            aria-label="Close author filter"
            onClick={() => setIsOpen(false)}
          >
            <span className="codicon codicon-close" aria-hidden="true" />
          </button>
        </form>
      ) : null}
    </div>
  );
}

function getFilterButtonClassName(value: string): string {
  return value ? "commit-filter-button" : "commit-filter-button is-placeholder";
}
