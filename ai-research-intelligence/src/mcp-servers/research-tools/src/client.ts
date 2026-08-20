import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

const client = new Client({
    name: "kot-research-agent",
    version: "1.0.0",
});

const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "src/mcp-servers/research-tools/src/server.ts"],
});

export async function connectMcp() {
    await client.connect(transport);
    console.log("🔌 Connected to KOT MCP server");
}

export async function listMcpTools() {
    return await client.listTools();
}

export async function callMcpTool(
    name: string,
    args: Record<string, unknown>
) {
    return await client.callTool({
        name,
        arguments: args,
    });
}