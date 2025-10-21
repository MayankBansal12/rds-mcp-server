import { makeApiRequest } from "../../helper";

export const getAllUsersSchema = {};

export const getAllUsersHandler = async () => {
  const usersEndpoint = `${process.env.API_BASE_URL}/users`;
  const usersData = await makeApiRequest(usersEndpoint);

  if (!usersData) {
    return {
      content: [{ type: "text", text: "Couldn't retrieve users data." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `All Users Data: ${JSON.stringify(usersData, null, 2)}`,
      },
    ],
  } as any;
};
