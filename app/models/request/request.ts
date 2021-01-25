import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RequestModel = types
  .model("Request")
  .props({
    status: types.enumeration("Status", ["IDLE", "PENDING", "SUCCESS", "FAILURE"]),
    message: types.optional(types.string, ""),
  })
  .actions((self) => ({
    startRequest: flow(function* (request, ...args) {
      self.status = "PENDING"
      self.message = ""
      try {
        const response = yield request(...args)
        self.status = "SUCCESS"
        return response
      } catch (e) {
        self.status = "FAILURE"
        throw Error(e)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RequestType = Instance<typeof RequestModel>
export interface Request extends RequestType {}
type RequestSnapshotType = SnapshotOut<typeof RequestModel>
export interface RequestSnapshot extends RequestSnapshotType {}
