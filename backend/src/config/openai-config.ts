import { Configuration } from "openai";
import ts from "typescript";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return config;
};
