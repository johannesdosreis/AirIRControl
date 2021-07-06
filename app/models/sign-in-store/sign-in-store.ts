import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SignInStoreModel = types
  .model("SignInStore")
  .props({
    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    passwordVisibility: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearSignInStore: () => {
      self.email = ""
      self.password = ""
      self.passwordVisibility = false
    },

    setEmail: (value: string) => {
      self.email = value
    },

    setPassword: (value: string) => {
      self.password = value
    },

    togglePasswordVisibility: () => {
      self.passwordVisibility = !self.passwordVisibility
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type SignInStoreType = Instance<typeof SignInStoreModel>
export interface SignInStore extends SignInStoreType {}
type SignInStoreSnapshotType = SnapshotOut<typeof SignInStoreModel>
export interface SignInStoreSnapshot extends SignInStoreSnapshotType {}
export const createSignInStoreDefaultModel = () => types.optional(SignInStoreModel, {})
