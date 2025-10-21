import { makeApiRequest } from "../../helper";
import { z } from "zod";
import { TaskRequestStatus } from "../../types";

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
