import { Client } from "@modelcontextprotocol/client";
import  { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
    name:"KOT-research-FireClawClient",
    version:"1.0.0",
});

const transport = new StdioClientTransport({
    command: "npx",

    args: [
        "-y",
        "firecrawl-mcp@3.23.7"
    ],

    env: {
        FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY!
    }
});

export async function connectFireClawMcp() {
    await client.connect(transport);
     console.log("🔌 Connected to Firecrawl MCP server");

    const tools = await client.listTools();
    console.log("Available Firecrawl tools:", tools.tools.map(t => t.name));
}

export async function listFirecrawlTools() {
    return await client.listTools();
}
export async function callFirecrawlTool(
    name: string,
    args: Record<string, unknown>
) {
    return await client.callTool({
        name,
        arguments: args,
    });
}