import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const server = new McpServer({
    name: "kot-research-tools",
    version: "1.0.0",
});

server.registerTool(
    "search_documents",
    {
        title: "Search Documents",
        description: "Search the KOT Research local knowledge base.",
        inputSchema: z.object({
            query: z
                .string()
                .min(1)
                .describe("The topic or keywords to search for"),
        }),
    },
    async ({ query }) => {

        // Temporary result.
        // We'll connect this to real documents next.

        return {
            content: [
                {
                    type: "text",
                    text: `Search results for: ${query}

MCP is a standardized protocol that allows AI applications
to connect to external tools, data sources and capabilities.`,
                },
            ],
        };
    }
);

await serveStdio(() => server);