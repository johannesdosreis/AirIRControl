import { SignUpStoreModel } from "./sign-up-store"

test("can be created", () => {
  const instance = SignUpStoreModel.create({})

  expect(instance).toBeTruthy()
})
