import React, { ReactElement, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableWithoutFeedback, Alert, StatusBar } from "react-native"
import { Screen } from "../../components"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  AnimationConfig,
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components"
import { ImageOverlay } from "./extra/image-overlay.component"
import { ProfileAvatar } from "./extra/profile-avatar.component"
import { pipe } from "fp-ts/lib/function"
import { match } from "fp-ts/lib/Either"
import { EmailIcon, PersonIcon, PlusIcon } from "./extra/icons"
import { IconAnimationRegistry } from "@ui-kitten/components/ui/icon/iconAnimation"
import { KeyboardAvoidingView } from "./extra/3rd-party"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const SignUpScreen = observer(function SignUpScreen() {
  // Pull in one of our MST stores
  const { signUpStore, authStore, utilStore } = useStores()
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    passwordVisibility,
    togglePasswordVisibility,
    clearSignUp,
  } = signUpStore

  const { signUpWithEmail } = authStore

  const { loading, setLoading, message, setMessage, clearUtilsStore } = utilStore

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    clearSignUp()
    clearUtilsStore()
  }, [])

  // Pull in navigation via hook
  const navigation = useNavigation()

  const styles = useStyleSheet(themedStyles)

  const onSignUpButtonPress = async (): Promise<void> => {
    if (loading) return

    setLoading(true)

    const userCredentialOrError = await signUpWithEmail(email, password, userName)

    pipe(
      userCredentialOrError,
      match(
        (error: Error) => {
          // todo messa of erro
          Alert.alert("Login!", error.message)
          console.log("Deu erro")
        },
        () => {
          console.log("Fez cadastro e fez login")
          navigation.dispatch(StackActions.replace("deviceStack"))
        },
      ),
    )
    setLoading(false)
  }

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("signIn")
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

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryRight={PlusIcon}
      onPress={onPressAddImage}
    />
  )

  const onPressAddImage = (): void => {
    console.log("Adicionar imagem")
  }

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

  const renderPasswordIcon = (
    props: JSX.IntrinsicAttributes &
      JSX.IntrinsicClassAttributes<Icon<unknown>> &
      Pick<
        Readonly<{
          name: string
          pack?: string
          animation?: keyof IconAnimationRegistry
          animationConfig?: AnimationConfig
        }> &
          Readonly<{ children?: React.ReactNode }>,
        never
      > &
      Partial<
        Pick<
          Readonly<{
            name: string
            pack?: string
            animation?: keyof IconAnimationRegistry
            animationConfig?: AnimationConfig
          }> &
            Readonly<{ children?: React.ReactNode }>,
          "children" | "name" | "pack" | "animation" | "animationConfig"
        >
      > &
      Partial<Pick<Partial<any>, string | number | symbol>>,
  ): ReactElement => (
    <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
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
              <ProfileAvatar
                style={styles.profileAvatar}
                resizeMode="center"
                source={require("./assets/image-person.png")}
                editButton={renderEditAvatarButton}
              />
            </View>
            <View style={styles.formContainer}>
              <Input
                status="control"
                autoCapitalize="none"
                placeholder="Nome de Usuário"
                accessoryRight={PersonIcon}
                value={userName}
                onChangeText={setUserName}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                placeholder="Email"
                accessoryRight={EmailIcon}
                value={email}
                onChangeText={setEmail}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                secureTextEntry={!passwordVisibility}
                placeholder="Senha"
                accessoryRight={renderPasswordIcon}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button
              style={styles.signUpButton}
              size="giant"
              onPress={onSignUpButtonPress}
              accessoryLeft={LoadingIndicator}
            >
              CADASTRAR
            </Button>
            <Button
              style={styles.signInButton}
              appearance="ghost"
              status="control"
              onPress={onSignInButtonPress}
            >
              Já possui uma conta? Logar
            </Button>
            {renderMessage()}
          </ImageOverlay>
        </KeyboardAvoidingView>
      </Layout>
    </Screen>
  )
})

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },

  editAvatarButton: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },

  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  formInput: {
    marginTop: 16,
  },

  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 216,
  },

  profileAvatar: {
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    borderRadius: 58,
    height: 116,
    tintColor: "text-hint-color",
    width: 116,
  },

  signInButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  signUpButton: {
    marginHorizontal: 16,
  },
})
