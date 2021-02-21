import { RouteHandlerResponse } from "../../routing/model";
import data from "./data.js";

export default async (): Promise<RouteHandlerResponse> => {
  return {
    statusCode: 200,
    body: data,
  };
};
