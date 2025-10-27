import { z } from "zod";
import { makeApiRequest } from "../../helper";
import { State } from "../../types";

export const userSearchSchema = {
  state: z.nativeEnum(State).optional().describe("State filter for users"),
  role: z
    .enum(["archived"])
    .optional()
    .describe("Role filter for users (archived for past users)"),
};

type UserSearchArgs = {
  state?: State;
  role?: "archived";
};

export const userSearchHandler = async ({ state, role }: UserSearchArgs) => {
  const searchParams = new URLSearchParams();
  const filterDescription = [];

  if (state) {
    searchParams.append("state", state);
    filterDescription.push(`state: ${state}`);
  }

  if (role) {
    searchParams.append("role", role);
    filterDescription.push(`role: ${role}`);
  }

  const searchEndpoint = `${process.env.API_BASE_URL}/users/search?${searchParams.toString()}`;
  const searchData = await makeApiRequest(searchEndpoint);

  const filtersText =
    filterDescription.length > 0
      ? ` with filters (${filterDescription.join(", ")})`
      : "";

  if (!searchData) {
    return {
      content: [
        {
          type: "text",
          text: `Couldn't retrieve users search data ${filtersText}`,
        },
      ],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `Users Search Results${filtersText}: ${JSON.stringify(searchData, null, 2)}`,
      },
    ],
  } as any;
};
