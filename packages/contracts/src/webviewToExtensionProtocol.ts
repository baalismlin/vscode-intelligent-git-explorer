import { z } from "zod";
import { filterStateSchema } from "./gitLogProtocolSchemas";

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
    type: z.literal("revertSelectedChanges"),
    payload: z.object({
      path: z.string()
    })
  }),
  z.object({
    type: z.literal("refs:newBranch")
  }),
  z.object({
    type: z.literal("refs:fetch")
  }),
  z.object({
    type: z.literal("refs:updateSelected")
  }),
  z.object({
    type: z.literal("refs:deleteSelected")
  }),
  z.object({
    type: z.literal("refs:compareWithCurrent")
  }),
  z.object({
    type: z.literal("commits:goToRef")
  }),
  z.object({
    type: z.literal("commits:cherryPick")
  })
]);

export type WebviewToExtensionMessage = z.infer<typeof webviewToExtensionMessageSchema>;
