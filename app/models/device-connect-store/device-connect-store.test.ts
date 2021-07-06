import { DeviceConnectStoreModel } from "./device-connect-store"

test("can be created", () => {
  const instance = DeviceConnectStoreModel.create({})

  expect(instance).toBeTruthy()
})
