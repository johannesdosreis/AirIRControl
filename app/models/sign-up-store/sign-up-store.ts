import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SignUpStoreModel = types
  .model("SignUpStore")
  .props({
    userName: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    passwordVisibility: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearSignUp: () => {
      self.userName = ""
      self.email = ""
      self.password = ""
      self.passwordVisibility = false
    },

    setUserName: (value: string) => {
      self.userName = value
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

type SignUpStoreType = Instance<typeof SignUpStoreModel>
export interface SignUpStore extends SignUpStoreType {}
type SignUpStoreSnapshotType = SnapshotOut<typeof SignUpStoreModel>
export interface SignUpStoreSnapshot extends SignUpStoreSnapshotType {}
export const createSignUpStoreDefaultModel = () => types.optional(SignUpStoreModel, {})
