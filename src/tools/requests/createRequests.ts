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
  proposedDeadline: z.number().describe("Proposed deadline as timestamp"),
  proposedStartDate: z.number().describe("Proposed start date as timestamp"),
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
