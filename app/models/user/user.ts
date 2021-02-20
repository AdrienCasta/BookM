/* eslint-disable generator-star-spacing */
/* eslint-disable camelcase */
import { Auth } from "aws-amplify"
import * as yup from "yup"
import type { Asserts } from "yup"
import { flow, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RootStoreModel } from "../root-store/root-store"

export interface UserFormData extends Asserts<typeof UserSchema> {}

export const UserSchema = yup.object({
  image: yup.string().nullable().default(null),
  firstname: yup.string().required("champ obligatoire").default(""),
  lastname: yup.string().required("champ obligatoire").default(""),
  description: yup.string().default(""),
  tags: yup
    .array()
    .of(
      yup.object({
        id: yup.string(),
        label: yup.string(),
      }),
    )
    .notRequired()
    .default([]),
})

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
    get handleRequest() {
      return getParent<typeof RootStoreModel>(self).request.startRequest
    },
  }))
  .actions((self) => ({
    signIn: flow(function* (username: string, password: string) {
      try {
        const { attributes } = yield self.handleRequest(() => Auth.signIn(username, password))
        self.firstname = attributes.given_name
        self.lastname = attributes.family_name
        self.email = attributes.email
        return self
      } catch (error) {
        throw Error(error)
      }
    }),
    signUp: flow(function* (data) {
      try {
        const { user } = yield self.handleRequest(() => Auth.signUp(data))
        self.username = user.username
      } catch (e) {
        console.error(e)
        throw Error(e)
      }
    }),
    confirmSignUp: flow(function* (code: string) {
      try {
        return yield self.handleRequest(() => Auth.confirmSignUp(self.username, code))
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
