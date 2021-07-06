import { ForgotPasswordStoreModel } from "./forgot-password-store"

test("can be created", () => {
  const instance = ForgotPasswordStoreModel.create({})

  expect(instance).toBeTruthy()
})
