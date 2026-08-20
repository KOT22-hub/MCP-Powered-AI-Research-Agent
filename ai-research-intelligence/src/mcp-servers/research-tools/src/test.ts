import {
    connectMcp,
    listMcpTools,
    callMcpTool
} from "./client.js";

await connectMcp();

const tools = await listMcpTools();

console.log("\n🛠️ MCP Tools:");
console.log(tools.tools);

const result = await callMcpTool(
    "search_documents",
    { query: "MCP" }
);

console.log("\n📄 MCP Result:");
console.log(result);