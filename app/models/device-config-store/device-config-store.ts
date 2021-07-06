import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DeviceConfigStoreModel = types
  .model("DeviceConfigStore")
  .props({
    visibleEditModel: types.optional(types.boolean, false),
    visibleImageModel: types.optional(types.boolean, false),
    newImage: types.optional(types.string, ""),
    newName: types.optional(types.string, ""),
    newAddress: types.optional(types.string, ""),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearDeviceConfigStore: () => {
      self.visibleEditModel = false
      self.visibleImageModel = false
      self.newImage = ""
      self.newName = ""
      self.newAddress = ""
    },
    setVisibleEditModel: (value: boolean) => {
      self.visibleEditModel = value
    },
    setVisibleImageModel: (value: boolean) => {
      self.visibleImageModel = value
    },
    setNewImage: (value: string) => {
      self.newImage = value
    },
    setNewName: (value: string) => {
      self.newName = value
    },
    setNewAddress: (value: string) => {
      self.newAddress = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type DeviceConfigStoreType = Instance<typeof DeviceConfigStoreModel>
export interface DeviceConfigStore extends DeviceConfigStoreType {}
type DeviceConfigStoreSnapshotType = SnapshotOut<typeof DeviceConfigStoreModel>
export interface DeviceConfigStoreSnapshot extends DeviceConfigStoreSnapshotType {}
export const createDeviceConfigStoreDefaultModel = () => types.optional(DeviceConfigStoreModel, {})
