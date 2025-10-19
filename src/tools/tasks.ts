import { z } from "zod";
import { makeApiRequest } from "../helper";
const BASE_URL =
  process.env.API_BASE_URL || "https://staging-api.realdevsquad.com";

export const getAllTasksSchema = {
  size: z.number(),
};

export const getAllTasksHandler = async (request: any) => {
  const { size = 5 } = request.params.arguments;
  const tasksData = await makeApiRequest(
    `${BASE_URL}/tasks?size=${Number(size)}`,
  );

  if (!tasksData) {
    return {
      content: [
        { type: "text", text: "Couldn't retrieve tasks or tasks not found" },
      ],
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `Here is the tasks data: ${JSON.stringify(tasksData)}`,
      },
    ],
  };
};

export const getAllTasksTool = {
  name: "getAllTasks",
  description: "Fetch all tasks",
  inputSchema: getAllTasksSchema,
  handler: getAllTasksHandler,
};
