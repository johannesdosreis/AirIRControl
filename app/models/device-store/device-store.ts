import { Either, left, right } from "fp-ts/lib/Either"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DeviceSocket } from "../../services/socket/device-socket"
import { Device, DeviceModel } from "../device/device"
import { withEnvironment } from "../extensions/with-environment"
import Geolocation from "react-native-geolocation-service"
/**
 * Model description here for TypeScript hints.
 */
export const DeviceStoreModel = types
  .model("DeviceStore")
  .props({
    selectedDevice: types.maybeNull(types.reference(DeviceModel)),
    devices: types.optional(types.array(DeviceModel), []),
    selectedDeviceStatus: types.optional(types.string, "disconnected"),
    power: types.optional(types.boolean, false),
    temperature: types.optional(types.number, 23),
    mode: types.optional(types.enumeration("Mode", ["auto", "cool", "dry", "fan", "heat"]), "auto"),
    fan: types.optional(types.enumeration("Fan", ["auto", "low", "middle", "high"]), "auto"),
    swing: types.optional(types.boolean, false),
    sleep: types.optional(types.boolean, false),
    searchQuery: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get filteredDevices() {
      return self.devices.filter((dev) => dev.name.includes(self.searchQuery))
    },
    get modeIndex() {
      switch (self.mode) {
        case "auto":
          return 0
        case "cool":
          return 1
        case "dry":
          return 2
        case "fan":
          return 3
        case "heat":
          return 4
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearDevicesStore() {
      self.selectedDevice = null
      self.devices.clear()
      self.selectedDeviceStatus = "disconnected"
      self.power = false
      self.temperature = 23
      self.mode = "auto"
      self.fan = "auto"
      self.swing = false
      self.sleep = false
      self.searchQuery = ""
    },

    clearDevices: () => {
      self.searchQuery = ""
    },
    setSearchQuery: (value: string) => {
      self.searchQuery = value
    },
    setDevices: (value: Device[]) => {
      self.devices.replace(value)
    },

    setSelectedDevice: (value: Device) => {
      self.selectedDevice = value
    },

    setSelectedDeviceStatus: (value: string) => {
      self.selectedDeviceStatus = value
    },

    setPower: (value) => {
      self.power = value
    },

    toggleMode: () => {
      switch (self.mode) {
        case "auto":
          self.mode = "cool"
          break
        case "cool":
          self.mode = "dry"
          break
        case "dry":
          self.mode = "fan"
          break
        case "fan":
          self.mode = "heat"
          break
        case "heat":
          self.mode = "auto"
          break
      }
    },

    toggleFan: () => {
      switch (self.fan) {
        case "auto":
          self.fan = "low"
          break
        case "low":
          self.fan = "middle"
          break
        case "middle":
          self.fan = "high"
          break
        case "high":
          self.fan = "auto"
          break
      }
    },

    setSwing: (value) => {
      self.swing = value
    },

    setSleep: (value) => {
      self.sleep = value
    },

    temperatureUp: () => {
      if (self.temperature < 30) self.temperature++
    },

    temperatureDown: () => {
      if (self.temperature > 18) self.temperature--
    },

    setSelectedDeviceLocation: (value: { latitude: number; longitude: number }) => {
      self.selectedDevice.setLocalization(value)

      // self.deviceLocalization = { latitude: value.latitude, longitude: value.longitude }
    },

    setState: (state: {
      power: boolean
      temperature: number
      mode: string
      fan: string
      swing: boolean
      sleep: boolean
    }) => {
      const { power, temperature, mode, fan, swing, sleep } = state

      if (mode === "auto" || mode === "heat" || mode === "cool" || mode === "dry") self.mode = mode
      if (fan === "auto" || fan === "high" || fan === "middle" || fan === "low") self.fan = fan

      if (temperature > 18 && temperature < 30) {
        self.temperature = temperature
      }

      self.power = power
      self.swing = swing
      self.sleep = sleep
    },
  }))
  .actions((self) => ({
    getAllDevicesFromUser: async (id: string) => {
      try {
        return right(await self.environment.firestore.getAllDevicesFromUser(id))
      } catch (error) {
        return left(error)
      }
    },

    watchAllDevicesFromUser: async (id: string): Promise<Either<Error, () => void>> => {
      try {
        const unsubscribe = self.environment.firestore
          .watchAllDevicesFromUser(id)
          .onSnapshot((docSnapshot) => {
            try {
              const devices =
                docSnapshot?.docs.map((doc) => {
                  const data = doc.data()

                  const device = DeviceModel.create({
                    id: doc.id ?? "",
                    name: data.name ?? "",
                    address: data.address ?? "",
                    image: data.image ?? "",
                    type: data.type ?? "wifi",
                    uid: data.uid ?? "",
                    localization: {
                      latitude: data.localization?._latitude ?? 0,
                      longitude: data.localization?._longitude ?? 0,
                    },
                  })

                  return device
                }) ?? []
              // console.log(devices)
              self.setDevices(devices)
            } catch (error) {
              self.setDevices([])
            }
          })

        return right(unsubscribe)
      } catch (error) {
        return left(error)
      }
    },

    insertDevice: async (device: Device) => {
      return await self.environment.firestore.insertDevice(device)
    },

    updateDevice: async (device: Device) => {
      return await self.environment.firestore.updateDevice(device)
    },

    deleteDevice: async (deviceId: string) => {
      return await self.environment.firestore.deleteDevice(deviceId)
    },

    uploadImage: async (imagePath: string) => {
      return await self.environment.storage.uploadImage(
        self.selectedDevice.uid,
        self.selectedDevice.id,
        imagePath,
      )
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    connectDevice: (device?: Device) => {
      if (!device) return

      self.setSelectedDevice(device)

      console.log(self.selectedDevice)

      const socket = new DeviceSocket(self.environment.socket)

      if (!socket.socket || !socket.socket.connected) {
        self.setSelectedDeviceStatus("disconnected")
      }

      socket.setSocket(device.address)

      socket.onDisconnect(() => {
        self.setSelectedDeviceStatus("disconnected")

        Geolocation.getCurrentPosition((position) => {
          console.log(position)
          self.environment.analytics.logEvent("device_disconnected", {
            user_id: self.environment.auth.currentUser.uid,
            device: self.selectedDevice.id,
            user_location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            device_location: {
              latitude: self.selectedDevice?.localization?.latitude || 0,
              longitude: self.selectedDevice?.localization?.longitude || 0,
            },
          })
        })
      })

      socket.onConnect(() => {
        self.setSelectedDeviceStatus("connected")

        Geolocation.getCurrentPosition((position) => {
          console.log(position)
          self.environment.analytics.logEvent("device_connected", {
            user_id: self.environment.auth.currentUser.uid,
            device: self.selectedDevice.id,
            user_location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            device_location: {
              latitude: self.selectedDevice?.localization?.latitude || 0,
              longitude: self.selectedDevice?.localization?.longitude || 0,
            },
          })
        })
      })

      socket.onReconnect(() => {
        self.setSelectedDeviceStatus("connected")

        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
            self.environment.analytics.logEvent("device_reconnected", {
              user_id: self.environment.auth.currentUser.uid,
              device: self.selectedDevice.id,
              user_location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              device_location: {
                latitude: self.selectedDevice?.localization?.latitude || 0,
                longitude: self.selectedDevice?.localization?.longitude || 0,
              },
            })
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      })

      socket.getLocalization()

      socket.onLocalization((localization) => {
        self.setSelectedDeviceLocation(localization)
        self.updateDevice(self.selectedDevice)
      })

      socket.onState((state) => {
        self.setState(state)
      })
    },

    sendState() {
      const socket = new DeviceSocket(self.environment.socket)

      const state = {
        power: self.power,
        temperature: self.temperature,
        mode: self.mode,
        fan: self.fan,
        swing: self.swing,
        sleep: self.sleep,
      }

      socket.sendState(state)

      Geolocation.getCurrentPosition((position) => {
        console.log(position)
        self.environment.analytics.logEvent("send_state", {
          user_id: self.environment.auth.currentUser.uid,
          device: self.selectedDevice.id,
          state,
          user_location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          device_location: {
            latitude: self.selectedDevice?.localization?.latitude || 0,
            longitude: self.selectedDevice?.localization?.longitude || 0,
          },
        })
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type DeviceStoreType = Instance<typeof DeviceStoreModel>
export interface DeviceStore extends DeviceStoreType {}
type DeviceStoreSnapshotType = SnapshotOut<typeof DeviceStoreModel>
export interface DeviceStoreSnapshot extends DeviceStoreSnapshotType {}
export const createDeviceStoreDefaultModel = () => types.optional(DeviceStoreModel, {})
