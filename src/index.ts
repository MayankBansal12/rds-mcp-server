import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAllTasksSchema, getAllTasksHandler } from "./tools/tasks";

const server = new McpServer(
  {
    name: "rds-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.registerTool(
  "getAllTasks",
  {
    description: "Fetch all tasks",
    inputSchema: getAllTasksSchema,
  },
  getAllTasksHandler,
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  server.sendLoggingMessage({
    level: "info",
    data: "RDS MCP Server started successfully",
  });
}

main().catch((err) => {
  server.sendLoggingMessage({
    level: "error",
    data: `Error in starting server: ${err.message || err}`,
  });
  process.exit(1);
});
