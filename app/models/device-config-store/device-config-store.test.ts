import { DeviceConfigStoreModel } from "./device-config-store"

test("can be created", () => {
  const instance = DeviceConfigStoreModel.create({})

  expect(instance).toBeTruthy()
})
