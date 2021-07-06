import { Socket } from "./../services/socket/socket"
import { Storage } from "./../services/firebase/storage"
import { Firestore } from "./../services/firebase/firestore"
import { Analytics } from "./../services/firebase/analytics"
import { Api } from "../services/api"
import { Auth } from "../services/firebase"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.api = new Api()
    this.auth = new Auth()
    this.analytics = new Analytics()
    this.firestore = new Firestore()
    this.storage = new Storage()
    this.socket = new Socket()
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    await this.api.setup()
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: Api
  auth: Auth
  analytics: Analytics
  firestore: Firestore
  storage: Storage
  socket: Socket
}
