
import analytics, { FirebaseAnalyticsTypes } from "@react-native-firebase/analytics"

export class Analytics {
  //   socket: SocketType

  //   config: SocketConfig

  //   constructor(config: SocketConfig = DEFAULT_SOCKET_CONFIG) {
  //     this.config = config
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup() {}

  async logEvent(name: string, params?: { [key: string]: any }): Promise<void> {
    return await analytics().logEvent(name, params)
  }

  async logLogin(params: FirebaseAnalyticsTypes.LoginEventParameters): Promise<void> {
    return await analytics().logLogin(params)
  }

  async logSignUp(params: FirebaseAnalyticsTypes.SignUpEventParameters): Promise<void> {
    return await analytics().logSignUp(params)
  }
}
