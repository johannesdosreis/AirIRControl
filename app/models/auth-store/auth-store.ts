import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Either, left, right } from "fp-ts/lib/Either"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({})
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    signInWithEmail: async (
      email: string,
      password: string,
    ): Promise<Either<Error, FirebaseAuthTypes.UserCredential>> => {
      try {
        // console.log(`Chegou aqui ${email} ${password}`)
        const userCredential = await self.environment.auth.signInWithEmailAndPassword(
          email,
          password,
        )
        self.environment.analytics.logLogin({ method: "email" })
        console.log("Chegou aqui")

        return right(userCredential)
      } catch (error) {
        return left(error)
      }
    },

    signUpWithEmail: async (
      email: string,
      password: string,
      userName: string,
    ): Promise<Either<Error, FirebaseAuthTypes.UserCredential>> => {
      try {
        const userCredential = await self.environment.auth.createUserWithEmailAndPassword(
          email,
          password,
        )
        self.environment.auth.updateProfile(userCredential.user, {
          displayName: userName,
        })

        self.environment.analytics.logSignUp({ method: "email" })
        return right(userCredential)
      } catch (error) {
        return left(error)
      }
    },

    signOut: async (): Promise<Either<Error, null>> => {
      try {
        await self.environment.auth.signOut()
        return right(null)
      } catch (error) {
        return left(error)
      }
    },

    forgotPassword: async (email: string): Promise<Either<Error, null>> => {
      try {
        await self.environment.auth.sendPasswordResetEmail(email)
        return right(null)
      } catch (error) {
        return left(error)
      }
    },

    watchCurrentUser: (): Either<Error, (listener: any) => void> => {
      try {
        const userObserver = self.environment.auth.onAuthStateChanged
        return right(userObserver)
      } catch (error) {
        return left(error)
      }
    },

    getCurrentUser: (): Either<Error, FirebaseAuthTypes.User> => {
      try {
        const user = self.environment.auth.currentUser
        if (user == null) {
          return left(null)
        }
        return right(user)
      } catch (error) {
        return left(error)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
