import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "../auth-store/auth-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { ThemeStoreModel } from "../theme-store/theme-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  themeStore: types.optional(ThemeStoreModel, {} as any),
  authStore: types.optional(AuthStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
