import { ILogin, ILoginProps } from "@/interfaces";
import { post } from "@/utils";

export const login = async (credentials: ILoginProps) => {
  try {
    return await post<ILogin>("api/token/", credentials, undefined, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw new Error("Status", { cause: error.cause });
  }
};

export const refreshToken = async (refresh: string) =>
  await post<{ refresh: string; access: string }>(
    `api/token/refresh/`,
    refresh,
    undefined,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const tokenVerify = async (token: string) =>
  await post<{ token: string }>("api/token/verify/", token, undefined, {
    headers: {
      "Content-Type": "application/json",
    },
  });
