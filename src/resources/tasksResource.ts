export const tasksResourceConfig = {
  name: "tasks-rules",
  uri: "docs://tasks/rules",
  metadata: {
    name: "Task Rules",
    description: "Business rules for task - progress updates and status",
    mimeType: "text/plain",
  },
  callback: async () => {
    return {
      contents: [
        {
          uri: "docs://tasks/rules",
          mimeType: "text/plain",
          text: `
          # Task Rules

          ## Critical Rules
          - Only one progress update can be added for a task in a day
          - A task CANNOT go without updates for more than 3 days (it can cause problem to user and should be updated immediately)
          - Any task that is not marked as COMPLETED or DONE is considered as ongoing or active task
          - Active task should provide progress updates regularly (atleast one update in 3 days is required)
          - Task with endsOn (deadline) closer is critical, task is considered RED if deadline is crossed
          - ER (extension request) should be raised for task with closer deadline and if task can't be completed in remaining time (ideally <15% of total time)

          ## When Fetching Task Updates
          When you fetch updates for a task, check the timestamp of the last update and current task status:
          - If last update was < 1 day ago: Task is healthy, no action needed
          - If last update was 1-2 days ago: Task should be monitored, consider prompting for update
          - If last update was > 3 days ago: CRITICAL - Task is in danger, MUST prompt user to add update immediately
          - If last update was exactly close to 3 days: Use caution, prompt user to add update
          - If task deadline is in <15% of total time taken: Prompt user to recalculate and raise ER if required
          - If task deadline is in <2 days: Use caution and ask user to evaluate their task, either COMPLETE or raise ER immediately.

          ## Recommended Actions
          1. After fetching task updates, always check the "last_update_timestamp"
          2. Calculate days since last update
          3. If >= 2.5 days, prompt the user with: "Your task '[task_name]' hasn't been updated in X days. Please add an update to keep it on track."
          4. If > 3 days, use urgent language: "WARNING: Your task '[task_name]' is overdue for an update (X days without update). Add an update now."

          ## Example Scenarios
          - Task updated today: No action needed, no more updates can be added!
          - Task updated 2 days ago: Optional reminder
          - Task updated 2.8 days ago: Should prompt user
          - Task updated 3.1 days ago: Must prompt user, consider this urgent
          - Task going on for 3 weeks and deadline is in 3 days: Critical and ER should be raised if can't be completed in remaining time
          - Task status is COMPLETED: no action needed.
          `,
        },
      ],
    };
  },
};
