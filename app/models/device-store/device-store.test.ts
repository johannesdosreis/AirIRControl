import { DeviceStoreModel } from "./device-store"

test("can be created", () => {
  const instance = DeviceStoreModel.create({})

  expect(instance).toBeTruthy()
})
