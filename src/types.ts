export enum Status {
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
  VERIFIED = "VERIFIED",
  IN_REVIEW = "IN_REVIEW",
  IN_PROGRESS = "IN_PROGRESS",
  BACKLOG = "BACKLOG",
  ASSIGNED = "ASSIGNED",
  NEEDS_REVIEW = "NEEDS_REVIEW",
}

export enum State {
  ACTIVE = "ACTIVE",
  OOO = "OOO",
  IDLE = "IDLE",
}

export enum TaskRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum ExtensionRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
