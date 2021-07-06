import { ThemeStoreModel } from "./theme-store"

test("can be created", () => {
  const instance = ThemeStoreModel.create({})

  expect(instance).toBeTruthy()
})
