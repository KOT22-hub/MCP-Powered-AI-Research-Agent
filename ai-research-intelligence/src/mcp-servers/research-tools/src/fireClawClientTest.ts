import "dotenv/config";

import {
    connectFireClawMcp,
    listFirecrawlTools
} from "./fireClawClient.js";

async function main() {

    await connectFireClawMcp();

    const result = await listFirecrawlTools();

    console.log("\n🌐 Firecrawl Tools:\n");

    for (const tool of result.tools) {
        console.log(`- ${tool.name}`);
        console.log(`  ${tool.description}`);
    }
}

main();