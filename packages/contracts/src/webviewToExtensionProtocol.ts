import { z } from "zod";
import { filterStateSchema } from "./gitLogProtocolSchemas";

export const webviewCommandSchema = z.enum([
  "refs:newBranch",
  "refs:fetch",
  "refs:updateSelected",
  "refs:deleteSelected",
  "refs:compareWithCurrent",
  "commits:goToRef",
  "commits:cherryPick"
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
    type: z.literal("revertSelectedChanges"),
    payload: z.object({
      path: z.string()
    })
  }),
  z.object({
    type: z.literal("runCommand"),
    payload: z.object({
      command: webviewCommandSchema
    })
  })
]);

export type WebviewCommand = z.infer<typeof webviewCommandSchema>;
export type WebviewToExtensionMessage = z.infer<typeof webviewToExtensionMessageSchema>;
