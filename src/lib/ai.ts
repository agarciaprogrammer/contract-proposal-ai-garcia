import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";      // swap for Claude if desired
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Output schema = Notion-style blocks
const BlockSchema = z.object({
  type: z.enum(["heading_1", "paragraph", "bulleted_list_item"]),
  text: z.string(),
});

const ProposalSchema = z.object({
  blocks: z.array(BlockSchema),
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are an expert government-contract proposal writer for Gunn Construction LLC.
Given the contract details and the company profile below, craft a concise, persuasive proposal in **Notion-style blocks** (heading_1, paragraph, bulleted_list_item).  
Return ONLY valid JSON matching the schema: {{ "blocks": [...] }}.
`,
  ],
  [
    "user",
    `
Contract:
{contract}

Company:
{entity}
`,
  ],
]);

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.3,
}).withStructuredOutput(zodToJsonSchema(ProposalSchema));

export const proposalChain = prompt.pipe(model);

export type Block = z.infer<typeof BlockSchema>;