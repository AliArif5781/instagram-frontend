import type { RouteObject } from "react-router-dom";
import MessageContainer from "../pages/MessageContainer";

export const messageRoute: RouteObject[] = [
  {
    path: "messages", // remove /
    element: <MessageContainer />,
  },
];
