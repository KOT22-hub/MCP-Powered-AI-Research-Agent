import ollama from "ollama";
import type { Message, Tool } from "ollama";

export async function chat(
    messages: Message[],
    tools?: Tool[]
) {
    return await ollama.chat({
        model: "gemma4:cloud",
        messages,
        tools,
    });
}