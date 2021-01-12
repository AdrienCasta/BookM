import { UserStoreModel } from "./user"

test("can be created", () => {
  const instance = UserStoreModel.create({})

  expect(instance).toBeTruthy()
})
