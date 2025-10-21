import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAllTasksSchema, getAllTasksHandler } from "./tools/tasks/tasks";
import {
  getUserTasksSchema,
  getUserTasksHandler,
} from "./tools/tasks/userTasks";
import {
  taskProgressSchema,
  taskProgressHandler,
} from "./tools/tasks/taskProgress";
import { taskStatusSchema, taskStatusHandler } from "./tools/tasks/taskStatus";
import { getAllUsersSchema, getAllUsersHandler } from "./tools/users/allUsers";
import {
  getUserByUsernameSchema,
  getUserByUsernameHandler,
  getUserProfileSchema,
  getUserProfileHandler,
} from "./tools/users/userProfile";

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

server.registerTool(
  "getUserTasks",
  {
    description: "Fetch all user tasks",
    inputSchema: getUserTasksSchema,
  },
  getUserTasksHandler,
);

server.registerTool(
  "updateTaskProgress",
  {
    description: "Update ongoing progress for a task",
    inputSchema: taskProgressSchema,
  },
  taskProgressHandler,
);

server.registerTool(
  "updateTaskStatus",
  {
    description: "Update status or percent completion for a task",
    inputSchema: taskStatusSchema,
  },
  taskStatusHandler,
);

server.registerTool(
  "getAllUsers",
  {
    description: "Fetch all active users",
    inputSchema: getAllUsersSchema,
  },
  getAllUsersHandler,
);

server.registerTool(
  "getUserByUsername",
  {
    description: "Fetch a specific user by username",
    inputSchema: getUserByUsernameSchema,
  },
  getUserByUsernameHandler,
);

server.registerTool(
  "getUserProfile",
  {
    description: "Fetch current user's profile",
    inputSchema: getUserProfileSchema,
  },
  getUserProfileHandler,
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
