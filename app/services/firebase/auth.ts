import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

export class Auth {
  //   auth:

  //   config: SocketConfig

  //   constructor(config: SocketConfig = DEFAULT_SOCKET_CONFIG) {
  //     this.config = config
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setup() {}

  async signInWithEmailAndPassword(email: string, password: string) {
    return await auth().signInWithEmailAndPassword(email, password)
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return await auth().createUserWithEmailAndPassword(email, password)
  }

  async updateProfile(user: FirebaseAuthTypes.User, updates: FirebaseAuthTypes.UpdateProfile) {
    return user.updateProfile(updates)
  }

  async signOut() {
    return await auth().signOut()
  }

  async sendPasswordResetEmail(email: string) {
    return auth().sendPasswordResetEmail(email)
  }

  get onAuthStateChanged() {
    return auth().onAuthStateChanged
  }

  get currentUser() {
    return auth().currentUser
  }
}
