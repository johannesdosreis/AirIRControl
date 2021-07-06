import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native"
import { Button, Icon, Input, Layout, Spinner } from "@ui-kitten/components"
import { StackActions, useNavigation } from "@react-navigation/native"
import { match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { ImageOverlay } from "./extra/image-overlay.component"
import { PersonIcon } from "./extra/icons"
import { KeyboardAvoidingView } from "./extra/3rd-party"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const SignInScreen = observer(function SignInScreen() {
  // Pull in one of our MST stores
  const { signInStore, authStore, utilStore } = useStores()

  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisibility,
    togglePasswordVisibility,
    clearSignInStore,
  } = signInStore

  const { signInWithEmail } = authStore

  const { loading, setLoading, message, setMessage, clearUtilsStore } = utilStore

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    clearSignInStore()
    clearUtilsStore()
  }, [])

  // Pull in navigation via hook
  const navigation = useNavigation()

  const renderMessage = () => {
    if (!message) {
      return null
    }

    Alert.alert("Erro!", message.toString(), [
      {
        text: "OK",
        onPress: () => setMessage(""),
      },
    ])
  }

  const onSignInButtonPress = async (): Promise<void> => {
    // if (loading) return

    setLoading(true)
    if (!email || !password) {
      Alert.alert("Login!", "Para se Logar informe email e senha")
      return
    }

    const userCredentialOrError = await signInWithEmail(email, password)

    pipe(
      userCredentialOrError,
      match(
        (error: any) => {
          // todo messa of erro
          Alert.alert("Login!", error.message)
          console.log("Deu erro")
        },
        () => {
          console.log("Fez login")
          navigation.dispatch(StackActions.replace("deviceStack"))
        },
      ),
    )
    setLoading(false)
  }

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate("signUp")
  }

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate("forgotPassword")
  }

  const LoadingIndicator = (props) => {
    if (loading) {
      return (
        <View style={[props.style, styles.indicator]}>
          <Spinner size="small" />
        </View>
      )
    } else {
      return <></>
    }
  }

  const onPasswordIconPress = (): void => {
    togglePasswordVisibility()
  }

  const renderPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisibility ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  )

  return (
    <Screen style={ROOT} preset="scroll">
      <Layout style={styles.container}>
        <KeyboardAvoidingView>
          <StatusBar hidden />
          <ImageOverlay style={styles.container} source={require("./assets/image-background.jpg")}>
            <View style={styles.headerContainer}>
              <Image style={styles.iconImage} source={require("./assets/image-air.png")} />
            </View>
            <View style={styles.formContainer}>
              <Input
                status="control"
                placeholder="Email"
                accessoryRight={PersonIcon}
                value={email}
                onChangeText={setEmail}
              />
              <Input
                style={styles.passwordInput}
                status="control"
                placeholder="Senha"
                accessoryRight={renderPasswordIcon}
                value={password}
                secureTextEntry={!passwordVisibility}
                onChangeText={setPassword}
              />
              <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance="ghost"
                  status="control"
                  onPress={onForgotPasswordButtonPress}
                >
                  Esqueceu sua senha?
                </Button>
              </View>
            </View>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              onPress={onSignInButtonPress}
              accessoryLeft={LoadingIndicator}
            >
              LOGIN
            </Button>
            <Button
              style={styles.signUpButton}
              appearance="ghost"
              status="control"
              onPress={onSignUpButtonPress}
            >
              Não tem conta? Cadastrar
            </Button>
            {renderMessage()}
          </ImageOverlay>
        </KeyboardAvoidingView>
      </Layout>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  forgotPasswordButton: {
    paddingHorizontal: 0,
  },

  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },

  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 216,
  },

  // signInLabel: {
  //   marginTop: 16,
  // },

  iconImage: {
    alignSelf: "center",
    height: 150,
    width: 150,
  },

  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },

  passwordInput: {
    marginTop: 16,
  },

  signInButton: {
    marginHorizontal: 16,
  },

  signUpButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
})
