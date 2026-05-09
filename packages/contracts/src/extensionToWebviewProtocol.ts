import { z } from "zod";
import {
  bootstrapPayloadSchema,
  commitDetailSchema,
  commitItemSchema,
  gitRefNodeSchema,
  selectionStateSchema
} from "./gitLogProtocolSchemas";

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

export type ExtensionToWebviewMessage = z.infer<typeof extensionToWebviewMessageSchema>;
