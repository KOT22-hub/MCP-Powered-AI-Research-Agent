import type { Tool } from "ollama";
import { calculate } from "./calculator";
import {
    listMcpTools,
    callMcpTool
} from "../mcp-servers/research-tools/src/client.js";
import {
    connectFireClawMcp,
    listFirecrawlTools,
    callFirecrawlTool
} from "../mcp-servers/research-tools/src/fireClawClient.js";

const toolSourceMap = new Map<string, "kot" | "firecrawl">();

export async function getTools(): Promise<Tool[]> {
     await connectFireClawMcp(); 

    const mcpTools = await listMcpTools();
    const firecrawlTools = await listFirecrawlTools();

    const ollamaMcpTools: Tool[] = mcpTools.tools.map((tool) => ({
        type: "function",
        function: {
            name: tool.name,
            description: tool.description ?? "",
            parameters: tool.inputSchema as Tool["function"]["parameters"]
        }
    }));

    const ollamaFirecrawlTools: Tool[] = firecrawlTools.tools
        .filter((tool) => tool.name === "firecrawl_scrape")
        .map((tool) => {
            toolSourceMap.set(tool.name, "firecrawl");
            return {
                type: "function" as const,
                function: {
                    name: tool.name,
                    description: tool.description ?? "",
                    parameters: tool.inputSchema as Tool["function"]["parameters"]
                }
            };
        });

    return [
        {
            type: "function",
            function: {
                name: "calculate",
                description: "Perform a mathematical calculation.",
                parameters: {
                    type: "object",
                    properties: {
                        expression: {
                            type: "string",
                            description: "The mathematical expression to calculate."
                        }
                    },
                    required: ["expression"]
                }
            }
        },
        ...ollamaMcpTools,
        ...ollamaFirecrawlTools
    ];
}

export async function executeTool(
    name: string,
    args: Record<string, unknown>
) {
    switch (name) {

        case "calculate":
            return calculate(args.expression as string);

        default:
            console.log(`📡 Calling MCP tool: ${name}`);

            const result =
                toolSourceMap.get(name) === "firecrawl"
                    ? await callFirecrawlTool(name, args)
                    : await callMcpTool(name, args);

            return result.content
                ?.map((item: any) => item.text ?? "")
                .join("\n") ?? "";
    }
}