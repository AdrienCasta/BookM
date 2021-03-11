/* eslint-disable generator-star-spacing */
/* eslint-disable camelcase */
import { Auth, Storage } from "aws-amplify"
import * as yup from "yup"
import type { Asserts } from "yup"
import { flow, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RootStoreModel } from "../root-store/root-store"

export interface UserFormData extends Asserts<typeof UserSchema> {}
export interface SignupFormData extends Asserts<typeof SignupUserSchema> {}

export const UserSchema = yup.object({
  picture: yup.string().nullable().default(null),
  firstname: yup.string().required("champ obligatoire").default(""),
  lastname: yup.string().required("champ obligatoire").default(""),
  description: yup.string().default(""),
  tags: yup
    .array()
    .of(
      yup.object({
        value: yup.string(),
      }),
    )
    .notRequired()
    .default([]),
})

export const SignupUserSchema = yup.object({
  firstname: yup.string().required("champ obligatoire").default(""),
  lastname: yup.string().required("champ obligatoire").default(""),
  username: yup
    .string()
    .email("L'e-mail doit être valide")
    .required("champ obligatoire")
    .default(""),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 charactères")
    .required("champ obligatoire")
    .default(""),
  passwordConfirmation: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 charactères")
    .required("champ obligatoire")
    .oneOf([yup.ref("password"), null], "Les mots de passes doivent être identique")
    .default(""),
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
    tags: types.optional(types.string, ""),
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
        const { attributes } = yield self.handleRequest(() => Auth.signIn(username, password), {
          error: "Il semblerait y avoir une erreur dans le mot de passe ou l’identifiant renseigné",
        })
        self.picture = (yield Storage.get(attributes.picture, { level: "protected" })) as string
        self.firstname = attributes.given_name
        self.lastname = attributes.family_name
        self.email = attributes.email
        self.tags = attributes["custom:tags"]
        self.description = attributes["custom:description"]
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
    resendConfirmationCode: flow(function* () {
      try {
        return yield Auth.resendSignUp(self.username)
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
    edit: flow(function* ({
      description,
      firstname: given_name,
      lastname: family_name,
      picture,
      tags,
    }) {
      const getImageUriFileName = (url: string) => {
        return decodeURIComponent(
          new URL(url).pathname
            .split("/")
            .filter((part) => part !== "")
            .pop(),
        )
      }
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
            "custom:tags": tags.map(({ value }) => value).join(","),
          })
        })

        self.firstname = given_name
        self.picture = picture
        self.lastname = family_name
        self.description = description
        self.tags = tags.map(({ value }) => value).join(",")

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
