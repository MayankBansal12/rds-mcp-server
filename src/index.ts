import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getAllTasksTool } from "./tools/tasks";

const server = new Server(
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

export const allTools = [
  {
    name: getAllTasksTool.name,
    description: getAllTasksTool.description,
    inputSchema: getAllTasksTool.inputSchema,
  },
];

export const toolHandlers = {
  [getAllTasksTool.name]: getAllTasksTool.handler,
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: allTools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const handler = toolHandlers[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return await handler(request);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("RDS Server started successfully");
  server.sendLoggingMessage({
    level: "info",
    data: "RDS Server started successfully",
  });
}

main().catch((err) => {
  server.sendLoggingMessage({
    level: "error",
    data: `Error in starting server: ${err.message || err}`,
  });
  process.exit(1);
});
