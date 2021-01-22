/* eslint-disable camelcase */
import { Auth } from "aws-amplify"
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { SignUpParams } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */

export const UserModel = types
  .model("User")
  .props({
    username: types.optional(types.string, ""),
    firstname: types.optional(types.string, ""),
    lastname: types.optional(types.string, ""),
    phone_number: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
  })
  .views((self) => ({
    get fullName() {
      return `${self.firstname} ${self.lastname}`
    },
  }))
  .actions((self) => ({
    signIn: flow(function* (username: string, password: string) {
      try {
        const { attributes } = yield Auth.signIn(username, password)

        self.firstname = attributes.given_name
        self.lastname = attributes.family_name
        self.email = attributes.email
        return self
      } catch (e) {
        throw Error(e)
      }
    }),
    signUp: flow(function* (data: SignUpParams) {
      try {
        const { user } = yield Auth.signUp(data)
        self.username = user.username
      } catch (e) {
        console.error(e)
        throw Error(e)
      }
    }),
    confirmSignUp: flow(function* (code: string) {
      try {
        const response = yield Auth.confirmSignUp(self.username, code)
        return response
      } catch (e) {
        throw Error(e)
      }
    }),
    signOut: flow(function* () {
      try {
        yield Auth.signOut()
        for (const key in self) {
          self[key] = ""
        }
        return Promise.resolve()
      } catch (e) {
        throw Error(e)
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
