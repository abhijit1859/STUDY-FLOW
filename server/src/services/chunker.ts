import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocumets(docs:any) {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })
    const texts = splitter.splitDocuments(docs)

    return texts

}