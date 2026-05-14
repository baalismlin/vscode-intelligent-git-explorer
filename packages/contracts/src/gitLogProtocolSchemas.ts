import { z } from "zod";
import { type FilterState, type GitRefNode, type WorkspaceState } from "./gitLogModels";
import {
  type ChangedFileNodeViewModel,
  type CommitDetailViewModel,
  type CommitGraphViewModel,
  type CommitListItemViewModel,
  type GitLogBootstrapViewModel
} from "./gitLogViewModels";

export const changedFileStatusSchema = z.enum(["M", "A", "D", "R"]);

export const changedFileNodeSchema: z.ZodType<ChangedFileNodeViewModel> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    path: z.string(),
    type: z.enum(["file", "folder"]),
    status: changedFileStatusSchema.optional(),
    children: z.array(changedFileNodeSchema).optional()
  })
);

export const gitRefNodeSchema: z.ZodType<GitRefNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(["head", "group", "localBranch", "remote", "remoteBranch", "tag"]),
    children: z.array(gitRefNodeSchema).optional()
  })
);

export const commitGraphSchema: z.ZodType<CommitGraphViewModel> = z.object({
  width: z.number(),
  lanes: z.array(
    z.object({
      lane: z.number(),
      color: z.string(),
      top: z.boolean(),
      bottom: z.boolean()
    })
  ),
  edges: z.array(
    z.object({
      fromLane: z.number(),
      toLane: z.number(),
      from: z.enum(["node", "lane"]),
      to: z.enum(["top", "bottom"]),
      color: z.string()
    })
  ),
  node: z.object({
    lane: z.number(),
    color: z.string()
  })
});

export const commitItemSchema: z.ZodType<CommitListItemViewModel> = z.object({
  id: z.string(),
  shortHash: z.string(),
  message: z.string(),
  author: z.string(),
  date: z.string(),
  graph: commitGraphSchema
});

export const commitDetailSchema: z.ZodType<CommitDetailViewModel> = z.object({
  commitId: z.string(),
  shortHash: z.string(),
  message: z.string(),
  author: z.string(),
  date: z.string(),
  changedFiles: z.array(changedFileNodeSchema),
  defaultExpandedFileIds: z.array(z.string()),
  initialSelectedFileId: z.string()
});

export const filterStateSchema: z.ZodType<FilterState> = z.object({
  searchText: z.string(),
  branch: z.string(),
  user: z.string(),
  date: z.string(),
  paths: z.string()
});

export const selectionStateSchema = z.object({
  selectedRefId: z.string(),
  selectedCommitId: z.string()
});

export const workspaceStateSchema: z.ZodType<WorkspaceState> = z.object({
  repositoryRoot: z.string()
});

export const bootstrapPayloadSchema: z.ZodType<GitLogBootstrapViewModel> = z.object({
  workspace: workspaceStateSchema,
  refs: z.array(gitRefNodeSchema),
  commits: z.array(commitItemSchema),
  selectedCommitDetail: commitDetailSchema.nullable(),
  selection: selectionStateSchema,
  filters: filterStateSchema
});
