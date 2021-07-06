import { DeviceControlStoreModel } from "./device-control-store"

test("can be created", () => {
  const instance = DeviceControlStoreModel.create({})

  expect(instance).toBeTruthy()
})
