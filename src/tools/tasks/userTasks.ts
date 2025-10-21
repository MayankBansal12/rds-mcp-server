import { makeApiRequest } from "../../helper";
import { z } from "zod";
import { Status } from "../../types";
const BASE_URL =
  process.env.API_BASE_URL || "https://staging-api.realdevsquad.com";

export const getUserTasksSchema = {
  username: z.string().describe("Username to fetch tasks for!"),
  status: z
    .nativeEnum(Status)
    .optional()
    .describe("Status for the tasks to filter out!"),
};

type getAllTasksArgs = {
  username: string;
  status?: Status;
};

export const getUserTasksHandler = async ({
  username,
  status,
}: getAllTasksArgs) => {
  const taskEndpoint =
    `${BASE_URL}/tasks/${username}` + (!!status ? `?status=${status}` : "");
  const tasksData = await makeApiRequest(taskEndpoint);

  if (!tasksData) {
    return {
      content: [
        { type: "text", text: "Couldn't retrieve tasks for the user." },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Tasks Data for the user: ${JSON.stringify(tasksData, null, 2)}`,
      },
    ],
  } as any;
};
