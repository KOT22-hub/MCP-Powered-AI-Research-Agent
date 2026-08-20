MCP-Powered AI Research Agent
An AI-powered backend research agent built with Node.js, TypeScript, Ollama, and Model Context Protocol (MCP). The agent can reason about a user's request, determine which external capability it needs, invoke the appropriate MCP tool, and use the returned results to generate a final response.
🚀 What It Does
KOT Research demonstrates how an LLM can move beyond generating text and dynamically interact with external tools.
Instead of hard-coding which tool should be used for each request, the agent provides the available tools to Ollama and allows the model to determine when a tool is required.
For example:
User: Calculate 125 * 37

Ollama
  ↓
Selects calculate
  ↓
MCP Tool Call
  ↓
Result: 4625
  ↓
Ollama
  ↓
Final Response
For a research request:
User: Find the latest Model Context Protocol specification

Ollama
  ↓
Selects firecrawl_search
  ↓
Firecrawl MCP Server
  ↓
Web Results
  ↓
Ollama
  ↓
Research Response
The agent can also use multiple tools within the same request, allowing it to perform multi-tool orchestration.
🛠️ Technologies
Node.js
TypeScript
Ollama — Local LLM inference
Model Context Protocol (MCP) — Standardized communication between the AI application and external tools
Firecrawl MCP — Web search and web scraping capabilities
MCP Client — Discovers and invokes available MCP tools
🔧 Current MCP Capabilities
Calculator
Allows the agent to perform mathematical operations by dynamically selecting the calculation tool.
Example:
User: What is 125 * 37?

Agent requested tool: calculate
Arguments: { expression: '125 * 37' }

Result: 4625
Firecrawl
Provides the agent with real-time web research capabilities through MCP.
Currently experimented with:
firecrawl_search
firecrawl_scrape
The Firecrawl MCP server also exposes additional capabilities such as crawling, extraction, mapping, research, GitHub search, and developer search.
🔄 Agent Tool-Calling Loop
The core of the project is the agent loop:
1. User submits a request
2. Request is sent to Ollama
3. Ollama determines whether a tool is required
4. Agent identifies the appropriate tool
5. MCP client sends the tool request
6. MCP server executes the tool
7. Tool result is returned to the agent
8. Result is provided back to Ollama
9. Ollama generates the final response
This allows the agent to make decisions such as:
"125 * 37"
      ↓
   calculate
while:
"What's the latest MCP specification?"
      ↓
 firecrawl_search
The application therefore isn't simply calling predefined APIs based on hard-coded conditions — the LLM determines which capability is appropriate for the request.
🎯 Project Goals
This project was built to explore practical agentic AI and Model Context Protocol architecture, focusing on:
LLM tool calling
MCP client/server architecture
Dynamic tool selection
External tool integration
Multi-tool orchestration
Local LLM inference
Real-time web research
Building extensible AI agent architectures
🔮 Future Development
Planned capabilities include:
RAG / vector database integration
Document ingestion and semantic retrieval
Additional MCP servers
Dynamic MCP tool discovery
Tool chaining and multi-step reasoning
Improved agent memory
More advanced research workflows
📌 Project Status
Active Development
The current version demonstrates a working MCP-powered AI agent capable of dynamically selecting and executing external tools through Ollama.
