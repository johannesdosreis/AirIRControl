import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, StatusBar, View, ViewStyle, Image } from "react-native"
import { Screen } from "../../components"
import { color } from "../../theme"
import { Layout } from "@ui-kitten/components"
import { ImageOverlay } from "./extra/image-overlay.component"
import { StackActions, useNavigation } from "@react-navigation/native"
import { pipe } from "fp-ts/lib/function"
import { match } from "fp-ts/lib/Either"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SplashScreen = observer(function SplashScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  const { getCurrentUser } = authStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const loading = async () => {
    const userOrError = getCurrentUser()
    pipe(
      userOrError,
      match(
        () => {
          navigation.dispatch(StackActions.replace("authStack"))
        },
        () => {
          navigation.dispatch(StackActions.replace("deviceStack"))
        },
      ),
    )
  }

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    loading()
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <Layout style={styles.container}>
        {/* <KeyboardAvoidingView> */}
        <StatusBar hidden />
        <ImageOverlay
          style={(styles.container, styles.containerImage)}
          source={require("./assets/image-background.jpg")}
        >
          <View style={styles.headerContainer}>
            {/* <Image style={styles.itemImage} source={info.item.image} /> */}
            <Image style={styles.iconImage} source={require("./assets/image-air.png")} />
          </View>
        </ImageOverlay>
        {/* </KeyboardAvoidingView> */}
      </Layout>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 216,
  },
  iconImage: {
    alignSelf: "center",
    height: 150,
    width: 150,
  },
})
