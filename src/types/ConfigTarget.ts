export const ConfigTarget = {
  User: "user",
  Workspace: "workspace",
  Folder: "folder",
} as const;

export type ConfigTargetValueType = typeof ConfigTarget[keyof typeof ConfigTarget];
