import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ThemeStoreModel = types
  .model("ThemeStore")
  .props({
    mode: types.optional(types.string, "light"),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDarkMode: () => {
      self.mode = "dark"
    },
    setLightMode: () => {
      self.mode = "light"
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ThemeStoreType = Instance<typeof ThemeStoreModel>
export interface ThemeStore extends ThemeStoreType {}
type ThemeStoreSnapshotType = SnapshotOut<typeof ThemeStoreModel>
export interface ThemeStoreSnapshot extends ThemeStoreSnapshotType {}
export const createThemeStoreDefaultModel = () => types.optional(ThemeStoreModel, {})
