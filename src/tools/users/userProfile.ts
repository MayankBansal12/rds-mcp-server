import { makeApiRequest } from "../../helper";
import { z } from "zod";

export const getUserByUsernameSchema = {
  username: z.string().describe("Username of the user to fetch"),
};

type GetUserByUsernameArgs = {
  username: string;
};

export const getUserByUsernameHandler = async ({
  username,
}: GetUserByUsernameArgs) => {
  const userEndpoint = `${process.env.API_BASE_URL}/users/${username}`;
  const userData = await makeApiRequest(userEndpoint);

  if (!userData) {
    return {
      content: [
        {
          type: "text",
          text: `Couldn't retrieve user data for username: ${username}.`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `User Data for ${username}: ${JSON.stringify(userData, null, 2)}`,
      },
    ],
  } as any;
};

export const getUserProfileSchema = {};

export const getUserProfileHandler = async () => {
  const profileEndpoint = `${process.env.API_BASE_URL}/users?profile=true`;
  const profileData = await makeApiRequest(profileEndpoint);

  if (!profileData) {
    return {
      content: [
        { type: "text", text: "Couldn't retrieve current user profile data." },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Current User Profile: ${JSON.stringify(profileData, null, 2)}`,
      },
    ],
  } as any;
};
