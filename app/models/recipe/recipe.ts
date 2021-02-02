import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as yup from "yup"
import type { Asserts } from "yup"

export interface IRecipeFieldValues extends Asserts<typeof RecipeSchema> {}

export const RecipeSchema = yup.object({
  title: yup.string().required(),
  image: yup.object({ uri: yup.string().required() }).required(),
  description: yup.string().required(),
  numberOfPersons: yup.number().positive().integer().required(),
  time: yup
    .date()
    .min(new Date(60000))
    .max(new Date(24 * 3600 * 1000))
    .required(),
  steps: yup
    .array(yup.object({ description: yup.string().required(), trick: yup.string() }))
    .min(2),
  ingredients: yup
    .array(
      yup.object({
        image: yup.object({ uri: yup.string().required() }).required(),
        label: yup.string().required(),
      }),
    )
    .transform((value) => value.filter(({ label, image }) => label && image))
    .min(2)
    .required(),
  cookingTime: yup
    .date()
    .min(new Date(60000))
    .max(new Date(24 * 3600 * 1000))
    .nullable()
    .default(null),
  numberOfCalories: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .notRequired(),
})

/**
 * Model description here for TypeScript hints.
 */
export const RecipeModel = types.model({
  title: types.string,
  description: types.string,
  image: types.model({ uri: types.string }),
  numberOfPersons: types.number,
  time: types.Date,
  ingredients: types.array(
    types.model({ label: types.string, image: types.model({ uri: types.string }) }),
  ),
  cookingTime: types.union(types.Date, types.null),
  numberOfCalories: types.union(types.number, types.null),
  steps: types.array(
    types.model({ description: types.string, trick: types.union(types.string, types.null) }),
  ),
})

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RecipeType = Instance<typeof RecipeModel>
export interface Recipe extends RecipeType {}
type RecipeSnapshotType = SnapshotOut<typeof RecipeModel>
export interface RecipeSnapshot extends RecipeSnapshotType {}
