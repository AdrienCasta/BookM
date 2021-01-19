import { getSnapshot } from "mobx-state-tree"
import { UserModel } from "./user"

jest.mock("aws-amplify", () => {
  return {
    Auth: {
      signIn: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          attributes: { given_name: "Jean", family_name: "Terroire", email: "jean@terroire" },
        })
      }),
      signUp: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          user: { username: "Jean" },
        })
      }),
      signOut: jest.fn().mockImplementation(() => {
        return Promise.resolve()
      }),
    },
  }
})

test("can be created", () => {
  const instance = UserModel.create({})
  expect(getSnapshot(instance)).toMatchSnapshot()
})

test("view", () => {
  const instance = UserModel.create({
    firstname: "Adrien",
    lastname: "Castagliola",
  })
  expect(instance.fullName).toBe("Adrien Castagliola")
})

test("signIn", async () => {
  const instance = UserModel.create({})
  await instance.signIn("adrien.castagliola@gmail.com", "passw0rd")

  expect(getSnapshot(instance)).toMatchSnapshot()
})
test("signUp", async () => {
  const instance = UserModel.create({})
  await instance.signUp({
    username: "test",
    password: "test",
    attributes: {
      family_name: "test",
      given_name: "test",
    },
  })

  expect(getSnapshot(instance)).toMatchSnapshot()
})
test("signOut", async () => {
  const instance = UserModel.create({
    firstname: "Adrien",
    lastname: "Castagliola",
  })
  await instance.signOut()

  expect(getSnapshot(instance)).toMatchSnapshot()
})
