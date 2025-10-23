import { UserType } from "./user.types";

export interface LoginResponse {
    message: string;
    token: string
    user: UserType;
}