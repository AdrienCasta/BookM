type TFormStateActionTypes = "SET_IDENTIFIER" | "SET_FIRSTNAME"
interface TFormState {
  identifier: string
  firstname: string
}

interface TFormStateAction<T = any> {
  type: TFormStateActionTypes
  payload: T
}
export type TFormStateActionCreators = (value: string) => TFormStateAction<typeof value>

const stateKeys = new Map<TFormStateActionTypes, keyof TFormState>([
  ["SET_IDENTIFIER", "identifier"],
  ["SET_FIRSTNAME", "firstname"],
])

export const formInitalState: TFormState = { identifier: "", firstname: "" }
export const formStateActionTypes: TFormStateActionTypes[] = ["SET_IDENTIFIER", "SET_FIRSTNAME"]

export function formStateReducer(state: TFormState, action: TFormStateAction) {
  if (!formStateActionTypes.includes(action.type)) {
    throw new Error()
  }
  return { ...state, [stateKeys.get(action.type)]: action.payload }
}
const [setIdentifier, setFirstname] = formStateActionTypes.map((actionType) => (value) => ({
  type: actionType,
  payload: value,
}))
export { setIdentifier, setFirstname }
