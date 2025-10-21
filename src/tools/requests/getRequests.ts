import { z } from "zod";
import { makeApiRequest } from "../../helper";
import { ExtensionRequestStatus, TaskRequestStatus } from "../../types";

export const getTaskRequestSchema = {
  status: z
    .nativeEnum(TaskRequestStatus)
    .optional()
    .describe("Status filter for TCR requests"),
  size: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .describe("Number of TCR requests to fetch"),
};

type GetAllTcrsArgs = {
  status?: TaskRequestStatus;
  size?: number;
};

export const getTaskRequestsHandler = async ({
  status,
  size = 10,
}: GetAllTcrsArgs) => {
  const searchParams = new URLSearchParams();
  const filterDescription = [];

  if (status) {
    searchParams.append("q", `status:${status}`);
    filterDescription.push(`status: ${status}`);
  }

  searchParams.append("size", size.toString());
  filterDescription.push(`size: ${size}`);

  const taskRequestsEndpoint = `${process.env.API_BASE_URL}/taskRequests?${searchParams.toString()}`;
  const taskRequestsData = await makeApiRequest(taskRequestsEndpoint);
  const filtersText = ` with filters (${filterDescription.join(", ")})`;

  if (!taskRequestsData) {
    return {
      content: [
        {
          type: "text",
          text: `Couldn't retrieve TCR requests data ${filtersText}.`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `TCR Requests${filtersText}: ${JSON.stringify(taskRequestsData, null, 2)}`,
      },
    ],
  } as any;
};

export const getExtensionRequestsSchema = {
  status: z
    .nativeEnum(ExtensionRequestStatus)
    .optional()
    .describe("Status filter for extension requests"),
  taskId: z
    .string()
    .optional()
    .describe("Task ID to filter extension requests"),
  assigneeId: z
    .string()
    .optional()
    .describe("Assignee ID to filter extension requests"),
  size: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .describe("Number of extension requests to fetch"),
};

type GetExtensionRequestsArgs = {
  status?: ExtensionRequestStatus;
  taskId?: string;
  assigneeId?: string;
  size?: number;
};

export const getExtensionRequestsHandler = async ({
  status,
  taskId,
  assigneeId,
  size = 10,
}: GetExtensionRequestsArgs) => {
  const searchParams = new URLSearchParams();
  const filterDescription = [];
  const queryParts = [];

  if (status) {
    queryParts.push(`status:${status}`);
    filterDescription.push(`status: ${status}`);
  }

  if (taskId) {
    queryParts.push(`taskId:${taskId}`);
    filterDescription.push(`taskId: ${taskId}`);
  }

  if (assigneeId) {
    queryParts.push(`assignee:${assigneeId}`);
    filterDescription.push(`assigneeId: ${assigneeId}`);
  }

  if (queryParts.length > 0) {
    searchParams.append("q", queryParts.join(" "));
  }

  searchParams.append("size", size.toString());
  filterDescription.push(`size: ${size}`);

  const extensionRequestsEndpoint = `${process.env.API_BASE_URL}/extension-requests?${searchParams.toString()}`;
  const extensionRequestsData = await makeApiRequest(extensionRequestsEndpoint);
  const filtersText = ` with filters (${filterDescription.join(", ")})`;

  if (!extensionRequestsData) {
    return {
      content: [
        {
          type: "text",
          text: `Couldn't retrieve extension requests data${filtersText}.`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Extension Requests${filtersText}: ${JSON.stringify(extensionRequestsData, null, 2)}`,
      },
    ],
  } as any;
};
