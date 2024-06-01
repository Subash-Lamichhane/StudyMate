// Document loader
const { TokenTextSplitter } = require("langchain/text_splitter");

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
const { MemoryVectorStore } = require("langchain/vectorstores/memory");

const { RetrievalQAChain } = require("langchain/chains");
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const { PromptTemplate } = require("@langchain/core/prompts");

const fs = require("fs");

const getCardDeckFromtext = async (docs) => {
    try {
        //     const filePath = `uploads/${filename}`;

        //     console.log("filePath", filePath);

        //     // Check if the file exists
        //     if (!fs.existsSync(filePath)) {
        //       console.error(`File not found: ${filePath}`);
        //       return;
        //     }

        //     const loader = new PDFLoader(filePath, {
        //       splitPages: false,
        //       parsedItemSeparator: "",
        //     });

        //     const docs = await loader.load();

        const textSplitter = new TokenTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 0,
        });

        const splitDocs = await textSplitter.splitDocuments(docs);

        

        // const embeddings = new OpenAIEmbeddings({
        //   modelName: "text-embedding-ada-002",
        //   openAIApiKey: process.env.OPENAI_API_KEY,
        // });
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "embedding-001", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            apiKey: process.env.API_KEY,
            title: "Document title",
        });

        //   const res = await embeddings.embedQuery("OK Google");

        const vectorStore = await MemoryVectorStore.fromDocuments(
            splitDocs,
            embeddings,
        );

        // const model = new ChatOpenAI({
        //   modelName: "gpt-3.5-turbo",
        //   openAIApiKey: process.env.OPENAI_API_KEY,
        // });
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
        })

        const template = `{context} Question: {question}`;

        const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
            prompt: PromptTemplate.fromTemplate(template),
        });

        const response = await chain.invoke({
            query: `Given the provided context, generate 100 flashcards covering all essential information. Present the flashcards in the following format: [{question: '', answer: ''}].
      Ensure that the output is in valid JSON format without any non-JSON text or numbering. If it's not possible to generate flashcards from the context, provide an empty array without attempting to fabricate answers or extract information from unrelated sources.`,
        });

        // Parse the JSON string
        const parsedCards = JSON.parse(response.text);

        return parsedCards;
    } catch (err) {
        console.error("Error getting card deck from PDF:", err);
    }
};

module.exports = { getCardDeckFromtext };