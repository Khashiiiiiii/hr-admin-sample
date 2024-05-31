export enum USER_TYPE {
  ORGANIZATION = "Organization",
  EMPLOYEE = "Employee",
  SUPER = "super",
}

export interface ILogin {
  refresh: string;
  access: string;
  type: USER_TYPE;
  usernme: string;
}
