import "dotenv/config";
import { runAgent } from "./Agent/agent";

async function main() {

    const answer = await runAgent(
        "Read the MCP specification page and explain the new stateless architecture"
    );

    console.log("\n🤖 KOT Research:");
    console.log(answer);
}

main();