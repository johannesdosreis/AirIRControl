import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, ViewStyle, Alert } from "react-native"
import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/native"
import { match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { ImageOverlay } from "./extra/image-overlay.component"
import { EmailIcon } from "./extra/icons"
import { KeyboardAvoidingView } from "./extra/3rd-party"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  // Pull in one of our MST stores
  const { forgotPasswordStore, authStore } = useStores()
  const { forgotPassword } = authStore
  const { email, setEmail, clearForgotPasswordStore } = forgotPasswordStore

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    clearForgotPasswordStore()
  }, [])

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onResetPasswordButtonPress = async (): Promise<void> => {
    console.log("Passou aqui")

    const sendEmail = await forgotPassword(email)

    pipe(
      sendEmail,
      match(
        (error: Error) => {
          // todo messa of erro
          Alert.alert("Login!", error.message)
          console.log("Deu erro")
        },
        () => {
          Alert.alert("Recuperação de senha!", "Email enviado para seu email")
        },
      ),
    )
    navigation && navigation.goBack()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Layout style={styles.containerRoot}>
        <KeyboardAvoidingView>
          <ImageOverlay style={styles.container} source={require("./assets/image-background.jpg")}>
            <Text style={styles.forgotPasswordLabel} category="h4" status="control">
              Esqueceu sua senha
            </Text>
            <Text style={styles.enterEmailLabel} status="control">
              Por favor insira seu endereço de email
            </Text>
            <View style={styles.formContainer}>
              <Input
                status="control"
                placeholder="Email"
                accessoryRight={EmailIcon}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <Button size="giant" onPress={onResetPasswordButtonPress}>
              REDEFINIR SENHA
            </Button>
          </ImageOverlay>
        </KeyboardAvoidingView>
      </Layout>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  containerRoot: {
    flex: 1,
  },

  enterEmailLabel: {
    alignSelf: "center",
    marginTop: 64,
    zIndex: 1,
  },

  forgotPasswordLabel: {
    alignSelf: "center",
    marginTop: 24,
    zIndex: 1,
  },

  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
  },
})
