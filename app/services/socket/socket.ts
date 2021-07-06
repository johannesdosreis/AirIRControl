import { io, Socket as SocketType } from "socket.io-client"

export class Socket {
  socket: SocketType

  //   config: SocketConfig

  //   constructor(config: SocketConfig = DEFAULT_SOCKET_CONFIG) {
  //     this.config = config
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setup() {}

  connect(address: string) {
    this.socket = io(address)
  }

  emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args)
  }

  on(event: string, listener: (...args: any[]) => void) {
    this.socket.on(event, listener)
  }

  connected() {
    return this.socket.connected
  }

  get disconnected() {
    return this.socket.disconnected
  }

}
