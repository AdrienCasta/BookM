import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api, SignUpParams } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const UserModel = types.model("User").props({
  username: types.optional(types.string, ""),
  firstname: types.optional(types.string, ""),
  lastname: types.optional(types.string, ""),
  phone_number: types.optional(types.string, ""),
})

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
  })
  .views((self) => ({
    get fullName() {
      return `${self.user.firstname} ${self.user.lastname}`
    },
  }))
  .actions((self) => ({
    setUser(user: UserType) {
      self.user = user
    },
    signUp: flow(function* (user: SignUpParams) {
      try {
        const { username } = yield new Api().signUp(user)
        self.user.username = username
      } catch (e) {
        console.error(e)
      }
    }),
    confirmSignUp: flow(function* (code: string) {
      try {
        const response = yield new Api().confirmSignUp(self.user.username, code)
        console.tron.log(response)
      } catch (e) {
        console.error(e)
      }
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
