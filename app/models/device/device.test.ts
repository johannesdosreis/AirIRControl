import { DeviceModel } from "./device"

test("can be created", () => {
  const instance = DeviceModel.create({})

  expect(instance).toBeTruthy()
})
