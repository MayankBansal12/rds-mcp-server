export const userResourceConfig = {
  name: "user-rules",
  uri: "docs://users/rules",
  metadata: {
    name: "User Rules",
    description: "Business rules for user status and task management",
    mimeType: "text/plain",
  },
  callback: async () => {
    return {
      contents: [
        {
          uri: "docs://users/rules",
          mimeType: "text/plain",
          text: `
            # User Status Rules

            ## Rules
            - Users cannot stay IDLE for more than 7 days.
            - If unavailable for a week, users must apply for OOO (Out of Office).

            ## Conditions
            When checking user status:
            - **ONBOARDING:** Must complete onboarding and pick a task ASAP.
            - **OOO:** No action required.
            - **ACTIVE:** Everything is normal.
            - **IDLE < 5 days:** Prompt user to pick a task.
            - **IDLE 5–7 days:** Warn user to pick or apply OOO.
            - **IDLE > 7 days:** Critical — immediate action required.

            ## Actions
            1. Always check "state" and "updatedAt" fields.
            2. Calculate days in IDLE state.
            3. Apply corresponding rule based on user status and IDLE duration.

            ## Example
            User(IDLE, updatedAt=7d) → prompt: "You've been idle too long. Pick a task or set OOO."
            `,
        },
      ],
    };
  },
};
