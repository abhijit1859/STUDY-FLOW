import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export const embeddings = new HuggingFaceInferenceEmbeddings({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        apiKey: process.env.HF_API_KEY as string,
    });