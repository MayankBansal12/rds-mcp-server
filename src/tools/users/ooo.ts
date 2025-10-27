import { z } from "zod";
import { makeApiRequest } from "../../helper";

export const applyOooSchema = {
  from: z.number().describe("Start timestamp for OOO period"),
  until: z.number().describe("End timestamp for OOO period"),
  message: z.string().describe("OOO message"),
};

type ApplyOooArgs = {
  from: number;
  until: number;
  message: string;
};

export const applyOooHandler = async ({
  from,
  until,
  message,
}: ApplyOooArgs) => {
  const oooEndpoint = `${process.env.API_BASE_URL}/users/status/self?userStatusFlag=true`;
  const currentTimestamp = Date.now();

  const requestBody = {
    currentStatus: {
      from,
      message,
      state: "OOO" as const,
      until,
      updatedAt: currentTimestamp,
    },
  };

  const oooData = await makeApiRequest(oooEndpoint, "PATCH", requestBody);
  if (!oooData) {
    return {
      content: [{ type: "text", text: "Failed to apply OOO status." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `OOO status applied successfully: ${JSON.stringify(oooData, null, 2)}`,
      },
    ],
  } as any;
};

export const cancelOooSchema = {};

export const cancelOooHandler = async () => {
  const oooEndpoint = `${process.env.API_BASE_URL}/users/status/self?userStatusFlag=true`;

  const requestBody = {
    cancelOoo: true,
  };

  const cancelData = await makeApiRequest(oooEndpoint, "PATCH", requestBody);
  if (!cancelData) {
    return {
      content: [{ type: "text", text: "Failed to cancel OOO status." }],
    } as any;
  }

  return {
    content: [
      {
        type: "text",
        text: `OOO status canceled successfully: ${JSON.stringify(cancelData, null, 2)}`,
      },
    ],
  } as any;
};
