import { makeApiRequest } from "../../helper";
import { z } from "zod";
import { Status } from "../../types";

export const taskStatusSchema = {
  id: z.string().describe("ID of the task to update"),
  status: z.nativeEnum(Status).optional().describe("New status for the task"),
  percentCompleted: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe("Percent completion of the task (0-100)"),
};

type TaskStatusArgs = {
  id: string;
  status?: Status;
  percentCompleted?: number;
};

export const taskStatusHandler = async ({
  id,
  status,
  percentCompleted,
}: TaskStatusArgs) => {
  if (!status && percentCompleted === undefined) {
    return {
      content: [
        {
          type: "text",
          text: "Error: At least one of 'status' or 'percentCompleted' must be provided.",
        },
      ],
    } as any;
  }

  const statusEndpoint = `${process.env.API_BASE_URL}/tasks/${id}/status`;

  const requestBody = {
    ...(status && { status }),
    ...(percentCompleted !== undefined && { percentCompleted }),
  };

  const statusData = await makeApiRequest(statusEndpoint, "PATCH", requestBody);

  if (!statusData) {
    return {
      content: [{ type: "text", text: "Failed to update task status." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Task status updated successfully: ${JSON.stringify(statusData, null, 2)}`,
      },
    ],
  } as any;
};
