import storage from "@react-native-firebase/storage"

export class Storage {
  //   socket: SocketType

  //   config: SocketConfig

  //   constructor(config: SocketConfig = DEFAULT_SOCKET_CONFIG) {
  //     this.config = config
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup() {}

  async uploadImage(uid: string, id: string, imagePath: string) {
    const reference = storage().ref(`/images/devices/${uid}/${id}.jpg`)
    const task = await reference.putFile(imagePath)

    if (task.error) return ""

    const url = await reference.getDownloadURL()

    return url
  }
}
