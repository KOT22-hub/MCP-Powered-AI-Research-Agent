import { chat } from "../llm/Ollama";
import { getTools, executeTool } from "../tools";
import { connectMcp } from "../mcp-servers/research-tools/src/client.js";

export async function runAgent(userPrompt: string) {

    // Connect to the MCP server
    await connectMcp();

    // Discover tools from the MCP server
    const tools = await getTools();

    const messages: any[] = [
        {
            role: "system",
            content: `
You are KOT Research, an AI research assistant.

You have access to exactly these tools: "calculate" and "firecrawl_scrape".
Do not call any tool other than these two — no other tools exist.

Use tools when they provide information or capabilities
that you cannot reliably provide yourself.

Do not invent tool results.
            `.trim()
        },
        {
            role: "user",
            content: userPrompt
        }
    ];

    while (true) {

        const response = await chat(messages, tools);

        const assistantMessage = response.message;

        messages.push(assistantMessage);

        // No tool calls = final answer
        if (!assistantMessage.tool_calls?.length) {
            return assistantMessage.content;
        }

        // Execute requested tools
        for (const toolCall of assistantMessage.tool_calls) {

            console.log(
                `🔧 Agent requested tool: ${toolCall.function.name}`
            );

            console.log(
                `   Arguments:`,
                toolCall.function.arguments
            );

            const result = await executeTool(
                toolCall.function.name,
                toolCall.function.arguments
            );

            console.log(`   Result: ${result}`);

            messages.push({
                role: "tool",
                content: String(result)
            });
        }
    }
}