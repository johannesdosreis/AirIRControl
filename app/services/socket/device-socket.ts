import { Socket } from "./socket"

export class DeviceSocket {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  setSocket(uri: string) {
    this.socket.connect(uri)
  }

  onDisconnect(listener: (...args: any[]) => void) {
    this.socket.on("disconnect", listener)
  }

  onConnect(listener: (...args: any[]) => void) {
    this.socket.on("connect", listener)
  }

  onReconnect(listener: (...args: any[]) => void) {
    this.socket.on("reconnect", listener)
  }

  getLocalization() {
    this.socket.emit("localization")
  }

  onLocalization(listener: (...args: any[]) => void) {
    this.socket.on("localization", listener)
  }

  onState(listener: (...args: any[]) => void) {
    this.socket.on("state", listener)
  }

  sendState(state) {
    const { power, temperature, mode, fan, swing, sleep } = state

    if (!this.socket || Object.keys(this.socket).length === 0) {
      // todo alert
      console.log("Desconectado")
      return
    }

    console.log(state)

    this.socket.emit("state", {
      power: power ? "change" : "keep",
      temperature,
      mode,
      speed: fan === "high" ? 3 : fan === "middle" ? 2 : fan === "low" ? 1 : "auto",
      swing: swing ? "change" : "keep",
      sleep: sleep ? "on" : "off",
    })
  }
}
