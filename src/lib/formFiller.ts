import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0.2 });

const questionPrompt = ChatPromptTemplate.fromTemplate(`
Company profile:
{entity}

Contract:
{contract}

Question:
{question}

Return ONLY the single best answer (max 80 chars). If unsure, return empty string.
`);

interface Question {
  label: string;
  value: string;
}

interface CompanyData {
  businessName: string;
  ueiCode: string;
  [key: string]: unknown;
}

interface ContractData {
  title: string;
  solicitationNumber: string;
  [key: string]: unknown;
}

export async function generateFormAnswers(
  questions: Question[],
  entity: CompanyData,
  contract: ContractData
): Promise<string[]> {
  const answers = await Promise.all(
    questions.map(async (q) => {
      const res = await questionPrompt.pipe(model).invoke({
        entity: JSON.stringify(entity),
        contract: JSON.stringify(contract),
        question: q.label,
      });
      return (res.content as string).trim();
    })
  );
  return answers;
}