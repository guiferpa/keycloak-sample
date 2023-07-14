import {NextFunction, Request, Response} from "express";
import HTTPStatusCodes from "http-status-codes";

const baseURL = process.env.KEYCLOAK_HOST as string;
const realm = process.env.KEYCLOAK_REALM as string;
const endpoint = `${baseURL}/realms/${realm}/protocol/openid-connect/userinfo`;

export const authorization = () => async (
  req: Request, res: Response, next: NextFunction
) => {
  const authorizationHeader = req.header("Authorization");
  console.log("Authorization header:", authorizationHeader);

  if (!authorizationHeader) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      message: "Authorization header's empty"
    });
  }

  const resp = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Authorization": authorizationHeader
    }
  });
  
  if (resp.status !== HTTPStatusCodes.OK) {
    const body = await resp.text();
    console.log("Keycloak authorization error:", resp.status, body);

    return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
      message: "Invalid token"
    });
  }

  return next();
}
