import { z } from "zod";
import { makeApiRequest } from "../../helper";

export const createTaskRequestSchema = {
  description: z
    .string()
    .describe("Task description (can include markdown formatting)"),
  githubIssueUrl: z
    .string()
    .url()
    .describe(
      "GitHub issue URL (e.g., https://github.com/Real/website/issues/1)",
    ),
  proposedDeadline: z
    .number()
    .describe("Proposed deadline as unix timestamp (in ms)"),
  proposedStartDate: z
    .number()
    .describe("Proposed start date as unix timestamp (in ms)"),
  userId: z.string().describe("User ID for the task request"),
};

type CreateTaskRequestArgs = {
  description: string;
  githubIssueUrl: string;
  proposedDeadline: number;
  proposedStartDate: number;
  userId: string;
};

export const createTaskRequestHandler = async ({
  description,
  githubIssueUrl,
  proposedDeadline,
  proposedStartDate,
  userId,
}: CreateTaskRequestArgs) => {
  const externalIssueHtmlUrl = githubIssueUrl;
  const externalIssueUrl = githubIssueUrl
    .replace("https://github.com/", "https://api.github.com/repos/")
    .replace("/issues/", "/issues/");

  const requestBody = {
    description,
    externalIssueHtmlUrl,
    externalIssueUrl,
    markdownEnabled: true,
    proposedDeadline,
    proposedStartDate,
    requestType: "CREATION" as const,
    userId,
  };

  const taskRequestEndpoint = `${process.env.API_BASE_URL}/taskRequests`;
  const taskRequestData = await makeApiRequest(
    taskRequestEndpoint,
    "POST",
    requestBody,
  );

  if (!taskRequestData) {
    return {
      content: [{ type: "text", text: "Failed to create task request." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Task request created successfully: ${JSON.stringify(taskRequestData, null, 2)}`,
      },
    ],
  } as any;
};

export const createExtensionRequestSchema = {
  assignee: z.string().describe("Assignee username for the task"),
  newEndsOn: z
    .number()
    .describe("New end timestamp for the task (unix timestamp in seconds)"),
  oldEndsOn: z.number().describe("Original end timestamp for the task"),
  reason: z.string().describe("Reason for extension request"),
  taskId: z.string().describe("Task ID for the extension request"),
  title: z.string().describe("Title for the extension request"),
};

type CreateExtensionRequestArgs = {
  assignee: string;
  newEndsOn: number;
  oldEndsOn: number;
  reason: string;
  taskId: string;
  title: string;
};

export const createExtensionRequestHandler = async ({
  assignee,
  newEndsOn,
  oldEndsOn,
  reason,
  taskId,
  title,
}: CreateExtensionRequestArgs) => {
  const requestBody = {
    assignee,
    newEndsOn,
    oldEndsOn,
    reason,
    status: "PENDING" as const,
    taskId,
    title,
  };

  const extensionRequestEndpoint = `${process.env.API_BASE_URL}/extension-requests`;
  const extensionRequestData = await makeApiRequest(
    extensionRequestEndpoint,
    "POST",
    requestBody,
  );

  if (!extensionRequestData) {
    return {
      content: [{ type: "text", text: "Failed to create extension request." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Extension request created successfully: ${JSON.stringify(extensionRequestData, null, 2)}`,
      },
    ],
  } as any;
};
