import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DeviceConnectStoreModel = types
  .model("DeviceConnectStore")
  .props({
    searchQuery: types.optional(types.string, ""),
    visible: types.optional(types.boolean, false),
    newName: types.optional(types.string, ""),
    newAddress: types.optional(types.string, ""),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearDeviceConnect: () => {
      self.searchQuery = ""
      self.visible = false
      self.newName = ""
      self.newAddress = ""
    },

    setSearchQuery: (value: string) => {
      self.searchQuery = value
    },

    setVisible: (value: boolean) => {
      self.visible = value
    },

    setNewName: (value: string) => {
      self.newName = value
    },

    setNewAddress: (value: string) => {
      self.newAddress = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type DeviceConnectStoreType = Instance<typeof DeviceConnectStoreModel>
export interface DeviceConnectStore extends DeviceConnectStoreType {}
type DeviceConnectStoreSnapshotType = SnapshotOut<typeof DeviceConnectStoreModel>
export interface DeviceConnectStoreSnapshot extends DeviceConnectStoreSnapshotType {}
export const createDeviceConnectStoreDefaultModel = () =>
  types.optional(DeviceConnectStoreModel, {})
