import { makeApiRequest } from "../helper";
import { z } from "zod";
const BASE_URL =
  process.env.API_BASE_URL || "https://staging-api.realdevsquad.com";

export const getAllTasksSchema = {
  size: z.number().default(5).describe("Number of tasks to fetch"),
};

type getAllTasksArgs = {
  size?: number;
};

export const getAllTasksHandler = async ({ size }: getAllTasksArgs) => {
  const tasksData = await makeApiRequest(
    `${BASE_URL}/tasks?size=${Number(size)}`,
  );

  if (!tasksData) {
    return {
      content: [
        { type: "text", text: "Couldn't retrieve tasks or tasks not found" },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Tasks Data: ${JSON.stringify(tasksData, null, 2)}`,
      },
    ],
  } as any;
};
