// import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
// import { embeddings } from "./embeddings.js";


// let store:MemoryVectorStore|null = null

// export async function createStore(docs) {
//     store = await MemoryVectorStore.fromDocuments(docs, embeddings)
// }


// export async function getStore(){
//     if (!store) throw new Error("No pdf indexed yet")
//     return store
// }