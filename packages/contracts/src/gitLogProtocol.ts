import { z } from "zod";
import {
  CommitDetailViewModel,
  CommitListItemViewModel,
  GitLogBootstrapViewModel
} from "./gitLogViewModels";

const changedFileNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    path: z.string(),
    type: z.enum(["file", "folder"]),
    status: z.enum(["M", "A", "D", "R"]).optional(),
    children: z.array(changedFileNodeSchema).optional()
  })
);

const gitRefNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(["head", "group", "localBranch", "remote", "remoteBranch", "tag"]),
    children: z.array(gitRefNodeSchema).optional()
  })
);

const commitGraphSchema = z.object({
  color: z.string(),
  lane: z.number(),
  shape: z.enum(["straight", "mergeLeft", "mergeRight"])
});

const commitItemSchema = z.object({
  id: z.string(),
  shortHash: z.string(),
  message: z.string(),
  author: z.string(),
  date: z.string(),
  graph: commitGraphSchema
});

const commitDetailSchema = z.object({
  commitId: z.string(),
  shortHash: z.string(),
  message: z.string(),
  author: z.string(),
  date: z.string(),
  changedFiles: z.array(changedFileNodeSchema),
  defaultExpandedFileIds: z.array(z.string()),
  initialSelectedFileId: z.string()
});

const filterStateSchema = z.object({
  searchText: z.string(),
  branch: z.string(),
  user: z.string(),
  date: z.string(),
  paths: z.string()
});

const selectionStateSchema = z.object({
  selectedRefId: z.string(),
  selectedCommitId: z.string()
});

export const bootstrapPayloadSchema = z.object({
  workspace: z.object({
    repositoryRoot: z.string()
  }),
  refs: z.array(gitRefNodeSchema),
  commits: z.array(commitItemSchema),
  selectedCommitDetail: commitDetailSchema.nullable(),
  selection: selectionStateSchema,
  filters: filterStateSchema
});

export const extensionToWebviewMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bootstrap"),
    payload: bootstrapPayloadSchema
  }),
  z.object({
    type: z.literal("refsUpdated"),
    payload: z.object({
      refs: z.array(gitRefNodeSchema)
    })
  }),
  z.object({
    type: z.literal("commitsUpdated"),
    payload: z.object({
      refId: z.string(),
      commits: z.array(commitItemSchema)
    })
  }),
  z.object({
    type: z.literal("commitDetailsUpdated"),
    payload: z.object({
      commitId: z.string(),
      detail: commitDetailSchema.nullable()
    })
  }),
  z.object({
    type: z.literal("selectionUpdated"),
    payload: selectionStateSchema
  }),
  z.object({
    type: z.literal("loadingStateChanged"),
    payload: z.object({
      area: z.enum(["refs", "commits", "details"]),
      isLoading: z.boolean()
    })
  }),
  z.object({
    type: z.literal("errorOccurred"),
    payload: z.object({
      message: z.string()
    })
  })
]);

export const webviewToExtensionMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("ready")
  }),
  z.object({
    type: z.literal("log"),
    payload: z.object({
      level: z.enum(["info", "warn", "error"]),
      message: z.string()
    })
  }),
  z.object({
    type: z.literal("selectRef"),
    payload: z.object({
      refId: z.string()
    })
  }),
  z.object({
    type: z.literal("selectCommit"),
    payload: z.object({
      commitId: z.string()
    })
  }),
  z.object({
    type: z.literal("setFilters"),
    payload: filterStateSchema
  }),
  z.object({
    type: z.literal("refresh")
  }),
  z.object({
    type: z.literal("openFile"),
    payload: z.object({
      path: z.string()
    })
  }),
  z.object({
    type: z.literal("openDiff"),
    payload: z.object({
      path: z.string()
    })
  }),
  z.object({
    type: z.literal("runCommand"),
    payload: z.object({
      command: z.string()
    })
  })
]);

export type BootstrapPayload = GitLogBootstrapViewModel;
export type CommitListItemPayload = CommitListItemViewModel;
export type CommitDetailPayload = CommitDetailViewModel;
export type ExtensionToWebviewMessage = z.infer<typeof extensionToWebviewMessageSchema>;
export type WebviewToExtensionMessage = z.infer<typeof webviewToExtensionMessageSchema>;
