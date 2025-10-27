import { z } from "zod";
import { makeApiRequest } from "../../helper";

export const taskProgressSchema = {
  taskId: z.string().describe("ID of the task to update progress for"),
  blockers: z.string().describe("Current blockers for the task"),
  completed: z.string().describe("Work completed on the task"),
  planned: z.string().describe("Work planned for the task"),
};

type TaskProgressArgs = {
  taskId: string;
  blockers: string;
  completed: string;
  planned: string;
};

export const taskProgressHandler = async ({
  taskId,
  blockers,
  completed,
  planned,
}: TaskProgressArgs) => {
  const progressEndpoint = `${process.env.API_BASE_URL}/progresses`;

  const requestBody = {
    blockers,
    completed,
    planned,
    taskId,
    type: "task" as const,
  };

  const progressData = await makeApiRequest(
    progressEndpoint,
    "POST",
    requestBody,
  );

  if (!progressData) {
    return {
      content: [{ type: "text", text: "Failed to update task progress." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Task progress updated successfully: ${JSON.stringify(progressData, null, 2)}`,
      },
    ],
  } as any;
};

export const getTaskProgressSchema = {
  taskId: z.string().describe("ID of the task to fetch progress updates for"),
};

type GetTaskProgressArgs = {
  taskId: string;
};

export const getTaskProgressHandler = async ({
  taskId,
}: GetTaskProgressArgs) => {
  const progressEndpoint = `${process.env.API_BASE_URL}/progresses?taskId=${taskId}`;

  const progressData = await makeApiRequest(progressEndpoint);

  if (!progressData) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to fetch progress updates for task: ${taskId}`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Task progress updates for ${taskId}: ${JSON.stringify(progressData, null, 2)}`,
      },
    ],
  } as any;
};
