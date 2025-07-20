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

Return ONLY the single best answer (max 80 chars).
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
      let answer = (res.content as string).trim();
      // Si la respuesta parece JSON, intenta parsear y formatear
      if (answer.startsWith('{') && answer.endsWith('}')) {
        try {
          const obj = JSON.parse(answer);
          // Si es un objeto tipo { phone:..., email:... }
          if (typeof obj === 'object' && obj !== null) {
            // Unir los valores en una sola línea
            answer = Object.values(obj).filter(Boolean).join(' | ');
          }
        } catch {
          // Si falla el parseo, deja la respuesta original
        }
      }
      // Si la respuesta son solo comillas vacías, devuelvo string vacío
      if (answer === '""') answer = '';
      return answer;
    })
  );
  return answers;
}