import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DeviceModel = types
  .model("Device")
  .props({
    id: types.identifier,
    name: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    type: types.optional(types.union(types.literal("wifi"), types.literal("bluetooth")), "wifi"),
    uid: types.optional(types.string, ""),
    localization: types.optional(
      types.model({
        latitude: types.number,
        longitude: types.number,
      }),
      { latitude: 0.0, longitude: 0.0 },
    ),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearDevice: () => {
      self.id = ""
      self.name = ""
      self.address = ""
      self.image = ""
      self.type = "wifi"
      self.uid = ""
      self.localization = { latitude: 0, longitude: 0 }
    },

    setDevice: (value: {
      name: string
      address: string
      image: string
      type: string
      uid: string
    }) => {
      self.name = value.name
      self.address = value.address
      self.image = value.image
      self.type = value.type === "bluetooth" ? "bluetooth" : "wifi"
      self.uid = value.uid
      self.localization = { latitude: 0, longitude: 0 }
    },

    setId: (value: string) => {
      self.id = value
    },
    setName: (value: string) => {
      self.name = value
    },
    setAddress: (value: string) => {
      self.address = value
    },
    setImage: (value: string) => {
      self.image = value
    },
    setType: (value: string) => {
      self.type = value === "bluetooth" ? "bluetooth" : "wifi"
    },
    setUid: (value) => {
      self.uid = value
    },

    setLocalization: (value: { latitude: number; longitude: number }) => {
      self.localization = { latitude: value.latitude ?? 0, longitude: value.longitude ?? 0 }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type DeviceType = Instance<typeof DeviceModel>
export interface Device extends DeviceType {}
type DeviceSnapshotType = SnapshotOut<typeof DeviceModel>
export interface DeviceSnapshot extends DeviceSnapshotType {}
export const createDeviceDefaultModel = () => types.optional(DeviceModel, {})
