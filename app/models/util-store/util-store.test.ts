import { UtilStoreModel } from "./util-store"

test("can be created", () => {
  const instance = UtilStoreModel.create({})

  expect(instance).toBeTruthy()
})
