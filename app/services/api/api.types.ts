import { GeneralApiProblem } from "./api-problem"

/* eslint-disable camelcase */

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export interface SignUpParams {
  username: string
  password: string
  attributes: {
    family_name: string
    given_name: string
  }
}
