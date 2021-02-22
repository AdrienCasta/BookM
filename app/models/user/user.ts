/* eslint-disable generator-star-spacing */
/* eslint-disable camelcase */
import { Auth, Storage } from "aws-amplify"
import * as yup from "yup"
import type { Asserts } from "yup"
import { flow, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RootStoreModel } from "../root-store/root-store"

export interface UserFormData extends Asserts<typeof UserSchema> {}

export const UserSchema = yup.object({
  picture: yup.string().nullable().default(null),
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
    description: types.optional(types.string, ""),
    picture: types.optional(types.string, ""),
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
        self.picture = (yield Storage.get(attributes.picture)) as string
        self.firstname = attributes.given_name
        self.lastname = attributes.family_name
        self.description = attributes["custom:description"]
        self.email = attributes.email
        return self
      } catch (error) {
        throw Error(error)
      }
    }),
    signUp: flow(function* (data) {
      try {
        const { user } = yield self.handleRequest(() => Auth.signUp(data))
        console.tron.log(user)
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
    edit: flow(function* ({ description, firstname: given_name, lastname: family_name, picture }) {
      const getImageUriFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1)
      try {
        const response = yield self.handleRequest(async () => {
          if (picture !== self.picture) {
            if (self.picture) {
              await Storage.remove(getImageUriFileName(self.picture), { level: "protected" })
            }
            const fetchedPicture = await fetch(picture)
            const blob = (await fetchedPicture.blob()) as { _data: { name: string } }
            const fileName = blob._data.name
            await Storage.put(fileName, blob, {
              contentType: "image/jpeg",
              level: "protected",
            })
          }
          const user = await Auth.currentAuthenticatedUser()
          await Auth.updateUserAttributes(user, {
            picture: getImageUriFileName(picture),
            given_name,
            family_name,
            "custom:description": description,
          })
        })

        self.firstname = given_name
        self.picture = picture
        self.lastname = family_name

        return response
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
