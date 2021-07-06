import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DeviceControlStoreModel = types
  .model("DeviceControlStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type DeviceControlStoreType = Instance<typeof DeviceControlStoreModel>
export interface DeviceControlStore extends DeviceControlStoreType {}
type DeviceControlStoreSnapshotType = SnapshotOut<typeof DeviceControlStoreModel>
export interface DeviceControlStoreSnapshot extends DeviceControlStoreSnapshotType {}
export const createDeviceControlStoreDefaultModel = () => types.optional(DeviceControlStoreModel, {})
