import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Either, left, right } from "fp-ts/lib/Either"
import { Device, DeviceModel } from "../../models"

export class Firestore {
  //   socket: SocketType

  //   config: SocketConfig

  //   constructor(config: SocketConfig = DEFAULT_SOCKET_CONFIG) {
  //     this.config = config
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup() {}

  async getAllDevicesFromUser(id: string) {
    try {
      const devicesCollection = firestore().collection("devices")
      const devicesSnapshot = await devicesCollection.where("uid", "==", id).get()

      const devices: Device[] = []

      devicesSnapshot.forEach((deviceSnapshot) => {
        if (deviceSnapshot.exists) {
          const data = deviceSnapshot.data()

          const device = DeviceModel.create({
            id: deviceSnapshot.id ?? "",
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

          devices.push(device)
        }
      })

      return right(devices)
    } catch (error) {
      return left(error)
    }
  }

  watchAllDevicesFromUser(
    id: string,
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    const devicesCollection = firestore().collection("devices")

    return devicesCollection.where("uid", "==", id)
  }

  async insertDevice(device: Device) {
    try {
      const devicesCollection = firestore().collection("devices")
      const { name, address, image, type, uid, localization } = device

      await devicesCollection.add({
        name,
        address,
        image,
        type,
        uid,
        localization: new firestore.GeoPoint(localization.latitude, localization.longitude),
      })

      return right(null)
    } catch (error) {
      return left(error)
    }
  }

  async updateDevice(device: Device) {
    try {
      const devicesCollection = firestore().collection("devices")
      const { id, name, address, image, type, uid, localization } = device
      await devicesCollection.doc(id).update({
        name,
        address,
        image,
        type,
        uid,
        localization: new firestore.GeoPoint(localization.latitude, localization.longitude),
      })
      return right(null)
    } catch (error) {
      return left(error)
    }
  }

  async deleteDevice(deviceId: string) {
    try {
      const devicesCollection = firestore().collection("devices")
      await devicesCollection.doc(deviceId).delete()
      return right(null)
    } catch (error) {
      return left(error)
    }
  }

  //   async uploadImage(imagePath) {
  //     const reference = storage().ref(
  //       `/images/devices/${self.selectedDevice.uid}/${self.selectedDevice.id}.jpg`,
  //     )
  //     const task = await reference.putFile(imagePath)

  //     if (task.error) return ""

  //     const url = await reference.getDownloadURL()

  //     return url
  //   }
}
