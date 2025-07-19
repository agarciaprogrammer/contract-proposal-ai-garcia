import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";      // swap for Claude if desired
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const FormBlockSchema = z.object({
  type: z.literal("form"),
  title: z.string(),
  questions: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

// Output schema = Notion-style blocks
const BlockSchema = z.union([
  z.object({ type: z.enum(["heading_1", "paragraph", "bulleted_list_item"]), text: z.string() }),
  FormBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;

const ProposalSchema = z.object({
  blocks: z.array(BlockSchema),
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert government-contract proposal writer for Gunn Construction LLC.
Return ONLY valid JSON matching: {{ "blocks": [...] }}

Blocks must include:
1. narrative text (heading_1, paragraph, bulleted_list_item)
2. two form blocks:
   {{ "type":"form","title":"Attachment 2: Release of Financial Information","questions":[...] }}
   {{ "type":"form","title":"Attachment 3: Financial Information Questionnaire","questions":[...] }}

Fill obvious company data in each "value" field.`,
  ],
  [
    "user",
    `Contract:
{contract}

Company:
{entity}`,
  ],
]);

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.3,
}).withStructuredOutput(zodToJsonSchema(ProposalSchema));

export const proposalChain = prompt.pipe(model);

export type FormBlock = z.infer<typeof FormBlockSchema>;
