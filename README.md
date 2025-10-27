# RDS MCP Server

A MCP server that exposes RDS (Real Dev Squad) APIs for AI agents to fetch and create task requests, task updates and manage user status, profile etc.

## Features

The MCP server exposes RDS APIs to perform the following tasks using AI agents:

- Creating new task creation requests (TCR) and extension requests (ER)
- Fetching all user tasks, user profiles, and user status info
- Fetching all TCRs and ERs with filtering options
- Applying and cancelling Out-of-Office (OOO) status
- Viewing and creating progress updates for tasks
- Changing task status and completion percentages
- Filter and search users

**_View Demo [here](https://5kas5z928t.ufs.sh/f/wBHVA4PQTleAIgyhQnJk5lBHphFeYR79MkDyxJtPNVZqKfOj)_**

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MayankBansal12/rds-mcp-server
cd rds-mcp-server
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm run build
```

## Environment Variable Details

- **`API_BASE_URL`**: The base URL for the RDS API endpoints
- **`AUTH_TOKEN`**: Your authentication token obtained from RDS login
- **`COOKIE_NAME`**: The name of the authentication cookie

## Configuration

### MCP Client Configuration

To use this server with an MCP-compatible client (like Claude Desktop), add the following configuration:

#### Example Configuration

Add to your MCP client's configuration file (`config.json`):

```json
{
  "mcpServers": {
    "rds-mcp-server": {
      "command": "node",
      "args": ["/path/to/rds-mcp-server/build/index.js"],
      "env": {
        "API_BASE_URL": <rds-base-endpoint>,
        "AUTH_TOKEN": <auth-token>,
        "COOKIE_NAME": <cookie-name>
      }
    }
  }
}
```

## Usage

### Starting the Server

The server runs as an MCP server and communicates via stdio. It's typically started by an MCP client rather than directly. Once build is generated and mcp server is configured correctly in client, tools should be available to interact with RDS.

For development/testing, you can run:

```bash
node build/index.js
```

### Available Tools

Once connected to an MCP client, the following tools are available:

#### Task Management

- `getAllTasks` - Fetch all tasks with optional size limit
- `getUserTasks` - Fetch tasks for a specific user with status filtering
- `updateTaskProgress` - Update progress information for a task
- `updateTaskStatus` - Update task status and completion percentage
- `getTaskProgress` - Fetch all progress updates for a specific task

#### User Management

- `getAllUsers` - Fetch all active users
- `getUserByUsername` - Get user details by username
- `getUserProfile` - Get current user's profile
- `searchUsers` - Search users with state and role filters
- `getUserStatus` - Get current user's status
- `getUserStatusByUsername` - Get specific user's status

#### Request Management

- `getAllTaskRequests` - Fetch all task creation requests (TCRs)
- `getAllExtensionRequests` - Fetch all extension requests (ERs)
- `createTaskRequest` - Create a new task creation request
- `createExtensionRequest` - Create a new extension request

#### Out-of-Office Management

- `applyOoo` - Apply OOO status for current user
- `cancelOoo` - Cancel OOO status for current user

### Example Usage with AI Agent

Once configured with an MCP client, you can interact with the server using natural language:

- "Show me all my current tasks"
- "Create a new task request for implementing user authentication"
- "Update the progress on task XYZ - I completed the database setup"
- "Apply OOO status from December 25th to January 2nd"
- "Show me all pending extension requests"

## Development

### Project Structure

```
rds-mcp-server/
├── src/
│   ├── tools/          # Tool implementations
│   │   ├── tasks/      # Task-related tools
│   │   ├── users/      # User-related tools
│   │   └── requests/   # Request management tools
│   ├── resources/      # MCP resources
│   ├── helper.ts       # Utility functions and API client
│   ├── types.ts        # Type definitions
│   └── index.ts        # Main server entry point
├── build/              # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

### Adding New Tools

1. Create a new tool file in the appropriate subdirectory under `src/tools/`
2. Define the Zod schema for input validation
3. Implement the handler function
4. Register the tool in `src/index.ts`

## Troubleshooting

### Authentication Issues

- Verify that `AUTH_TOKEN` and `COOKIE_NAME` are correctly set
- Ensure the token hasn't expired
- Check that the API endpoints are accessible

### Connection Issues

- Verify `API_BASE_URL` is correct and accessible
- Check network connectivity to RDS APIs
- Ensure MCP client configuration is correct

## Contributing

Feel free to create an issue or raise a PR for adding new tools and resources.
