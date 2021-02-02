/* eslint-disable generator-star-spacing */
/* eslint-disable camelcase */
import { Auth, API, graphqlOperation } from "aws-amplify"
import { flow, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import * as queries from "../../graphql/queries"
import { RecipeModel } from "../recipe/recipe"

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
    recipes: types.array(RecipeModel),
    recipe: types.maybe(RecipeModel),
  })
  .views((self) => ({
    get fullName() {
      return `${self.firstname} ${self.lastname}`
    },
    get root() {
      return getParent(self)
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
    signUp: flow(function* (data) {
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
        return yield Auth.confirmSignUp(self.username, code)
      } catch (e) {
        console.tron.log(e)
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
    previewRecipe(recipe) {
      self.recipe = recipe
    },
    listRecipes: flow(function* (): any {
      try {
        // const {
        //   data: { listRecipes },
        // } = yield API.graphql(graphqlOperation(queries.listRecipes))
        const response = yield API.graphql(graphqlOperation(queries.listRecipes))

        self.recipes = response.data.listRecipes.items

        return response
        // return Promise.resolve()
      } catch (e) {
        console.log(e)
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
