import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "../auth-store/auth-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { ForgotPasswordStoreModel } from "../forgot-password-store/forgot-password-store"
import { SignInStoreModel } from "../sign-in-store/sign-in-store"
import { SignUpStoreModel } from "../sign-up-store/sign-up-store"
import { ThemeStoreModel } from "../theme-store/theme-store"
import { UtilStoreModel } from "../util-store/util-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  themeStore: types.optional(ThemeStoreModel, {} as any),
  authStore: types.optional(AuthStoreModel, {} as any),
  signInStore: types.optional(SignInStoreModel, {} as any),
  signUpStore: types.optional(SignUpStoreModel, {} as any),
  forgotPasswordStore: types.optional(ForgotPasswordStoreModel, {} as any),
  utilStore: types.optional(UtilStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
