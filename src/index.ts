import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  createExtensionRequestHandler,
  createExtensionRequestSchema,
  createTaskRequestHandler,
  createTaskRequestSchema,
} from "./tools/requests/createRequests";
import {
  getExtensionRequestsHandler,
  getExtensionRequestsSchema,
  getTaskRequestSchema,
  getTaskRequestsHandler,
} from "./tools/requests/getRequests";
import {
  taskProgressHandler,
  taskProgressSchema,
} from "./tools/tasks/taskProgress";
import { getAllTasksHandler, getAllTasksSchema } from "./tools/tasks/tasks";
import { taskStatusHandler, taskStatusSchema } from "./tools/tasks/taskStatus";
import {
  getUserTasksHandler,
  getUserTasksSchema,
} from "./tools/tasks/userTasks";
import { getAllUsersHandler, getAllUsersSchema } from "./tools/users/allUsers";
import {
  applyOooHandler,
  applyOooSchema,
  cancelOooHandler,
  cancelOooSchema,
} from "./tools/users/ooo";
import {
  getUserByUsernameHandler,
  getUserByUsernameSchema,
  getUserProfileHandler,
  getUserProfileSchema,
} from "./tools/users/userProfile";
import { userSearchHandler, userSearchSchema } from "./tools/users/userSearch";

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

server.registerTool(
  "searchUsers",
  {
    description: "Search users with state and roles filters",
    inputSchema: userSearchSchema,
  },
  userSearchHandler,
);

server.registerTool(
  "applyOoo",
  {
    description: "Apply OOO status for current user",
    inputSchema: applyOooSchema,
  },
  applyOooHandler,
);

server.registerTool(
  "cancelOoo",
  {
    description: "Cancel OOO status for current user",
    inputSchema: cancelOooSchema,
  },
  cancelOooHandler,
);

server.registerTool(
  "getAllTaskRequests",
  {
    description: "Fetch all TCR requests with status and size filters",
    inputSchema: getTaskRequestSchema,
  },
  getTaskRequestsHandler,
);

server.registerTool(
  "getAllExtensionRequests",
  {
    description:
      "Fetch all extension requests with status, taskId, and assigneeId filters",
    inputSchema: getExtensionRequestsSchema,
  },
  getExtensionRequestsHandler,
);

server.registerTool(
  "createTaskRequest",
  {
    description: "Create a new task creation request (TCR)",
    inputSchema: createTaskRequestSchema,
  },
  createTaskRequestHandler,
);

server.registerTool(
  "createExtensionRequest",
  {
    description: "Create a new extension request (ER) for a task",
    inputSchema: createExtensionRequestSchema,
  },
  createExtensionRequestHandler,
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
