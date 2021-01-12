type TFormStateActionTypes =
  | "SET_USERNAME"
  | "SET_FIRSTNAME"
  | "SET_FAMILY_NAME"
  | "SET_PASSWORD"
  | "SET_PASSWORD_CONFIRMATION"
interface TFormState {
  username: string
  firstname: string
  familyname: string
  password: string
  passwordConfirmation: string
}

interface TFormStateAction<T = any> {
  type: TFormStateActionTypes
  payload: T
}
export type TFormStateActionCreators = (value: string) => TFormStateAction<typeof value>

const stateKeys = new Map<TFormStateActionTypes, keyof TFormState>([
  ["SET_USERNAME", "username"],
  ["SET_FIRSTNAME", "firstname"],
  ["SET_FAMILY_NAME", "familyname"],
  ["SET_PASSWORD", "password"],
  ["SET_PASSWORD_CONFIRMATION", "passwordConfirmation"],
])

export const formInitalState: TFormState = {
  username: "",
  firstname: "",
  familyname: "",
  password: "",
  passwordConfirmation: "",
}
export const formStateActionTypes: TFormStateActionTypes[] = [
  "SET_USERNAME",
  "SET_FIRSTNAME",
  "SET_FAMILY_NAME",
  "SET_PASSWORD",
  "SET_PASSWORD_CONFIRMATION",
]

export function formStateReducer(state: TFormState, action: TFormStateAction) {
  if (!formStateActionTypes.includes(action.type)) {
    throw new Error()
  }
  return { ...state, [stateKeys.get(action.type)]: action.payload }
}
const [
  setUsername,
  setFirstname,
  setFamilyname,
  setPassword,
  setPasswordConfirmation,
] = formStateActionTypes.map((actionType) => (value) => ({
  type: actionType,
  payload: value,
}))
export { setUsername, setFirstname, setFamilyname, setPassword, setPasswordConfirmation }
