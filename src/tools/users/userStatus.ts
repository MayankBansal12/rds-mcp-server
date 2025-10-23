import { makeApiRequest } from "../../helper";
import { z } from "zod";

export const getUserStatusByUserIdSchema = {
  userId: z.string().describe("UserId of the user to fetch status for"),
};

type GetUserStatusByUserIdArgs = {
  userId: string;
};

export const getUserStatusByUserIdHandler = async ({
  userId,
}: GetUserStatusByUserIdArgs) => {
  const userStatusEndpoint = `${process.env.API_BASE_URL}/users/status/${userId}`;
  const userStatusData = await makeApiRequest(userStatusEndpoint);

  if (!userStatusData) {
    return {
      content: [
        {
          type: "text",
          text: `Couldn't retrieve status data for userId: ${userId}.`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Status data for ${userId}: ${JSON.stringify(userStatusData, null, 2)}`,
      },
    ],
  } as any;
};

export const getUserStatusSchema = {};

export const getUserStatusHandler = async () => {
  const statusEndpoint = `${process.env.API_BASE_URL}/users/status/self`;
  const statusData = await makeApiRequest(statusEndpoint);

  if (!statusData) {
    return {
      content: [
        { type: "text", text: "Couldn't retrieve current user status data." },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Current User Status: ${JSON.stringify(statusData, null, 2)}`,
      },
    ],
  } as any;
};
