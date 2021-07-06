import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UtilStoreModel = types
  .model("UtilStore")
  .props({
    loading: types.optional(types.boolean, false),
    message: types.optional(types.string, ""),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearUtilsStore: () => {
      self.loading = false
      self.message = ""
    },

    setLoading: async (value: boolean) => {
      self.loading = value
    },
    toggleLoading: async () => {
      self.loading = !self.loading
    },
    setMessage: (value: string) => {
      self.message = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UtilStoreType = Instance<typeof UtilStoreModel>
export interface UtilStore extends UtilStoreType {}
type UtilStoreSnapshotType = SnapshotOut<typeof UtilStoreModel>
export interface UtilStoreSnapshot extends UtilStoreSnapshotType {}
export const createUtilStoreDefaultModel = () => types.optional(UtilStoreModel, {})
