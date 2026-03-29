export const ACTIONS = {
  SELECT: "select",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  ARROW: "arrow",
  SCRIBBLE: "scribble",
} as const;

export type ActionType = typeof ACTIONS[keyof typeof ACTIONS];
