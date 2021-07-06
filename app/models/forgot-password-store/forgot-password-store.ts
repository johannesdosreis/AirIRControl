import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ForgotPasswordStoreModel = types
  .model("ForgotPasswordStore")
  .props({
    email: types.optional(types.string, ""),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearForgotPasswordStore: () => {
      self.email = ""
    },

    setEmail: (value: string) => {
      self.email = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ForgotPasswordStoreType = Instance<typeof ForgotPasswordStoreModel>
export interface ForgotPasswordStore extends ForgotPasswordStoreType {}
type ForgotPasswordStoreSnapshotType = SnapshotOut<typeof ForgotPasswordStoreModel>
export interface ForgotPasswordStoreSnapshot extends ForgotPasswordStoreSnapshotType {}
export const createForgotPasswordStoreDefaultModel = () =>
  types.optional(ForgotPasswordStoreModel, {})
