import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View } from "react-native"
import {
  Button,
  Card,
  Divider,
  StyleService,
  Tab,
  TabBar,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components"
import { ImageOverlay } from "./extra/image-overlay.component"
import {
  Fan1Icon,
  Fan2Icon,
  Fan3Icon,
  FanIcon,
  LogoutIcon,
  MinusIcon,
  NavigationIcon,
  PlusIcon,
  PowerIcon,
  PowerSleepIcon,
  ShuffleIcon,
  SnowFlakeIcon,
  SunIcon,
  SwapIcon,
  WatterOffIcon,
} from "./extra/icons"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"

export const DeviceControlScreen = observer(function DeviceControlScreen() {

  const navigation = useNavigation()

  // Pull in one of our MST stores
  const { deviceStore, authStore } = useStores()

  const { signOut } = authStore

  const {
    selectedDevice,
    selectedDeviceStatus,
    power,
    temperature,
    mode,
    modeIndex,
    fan,
    swing,
    sleep,
    setPower,
    temperatureUp,
    temperatureDown,
    toggleMode,
    setSwing,
    toggleFan,
    setSleep,
    sendState,
    connectDevice
  } = deviceStore

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const styles = useStyleSheet(themedStyles)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    console.log(selectedDevice)
    selectedDevice && connectDevice(selectedDevice)
  }, [])

  const onPowerPressed = () => {
    setPower(true)
    sendState()
    setPower(false)
  }

  const onTempUpPressed = () => {
    temperatureUp()
    sendState()
  }

  const onTempDownPressed = () => {
    temperatureDown()
    sendState()
  }

  const onModePressed = () => {
    toggleMode()
    sendState()
  }

  const onSwingPressed = () => {
    setSwing(true)
    sendState()
    setSwing(false)
  }

  const onFanPressed = () => {
    toggleFan()
    sendState()
  }

  const onSleepPressed = () => {
    setSleep(!sleep)
    sendState()
  }

  const renderHeader = (props): React.ReactElement => (
    <View {...props}>
      <Text category="h1">
        {selectedDevice ? selectedDevice.name : "Dispositivo não escolhido"}
      </Text>
      <Text category="s1">
        {selectedDeviceStatus === "connected" ? "Conectado" : "Desconectado"}
      </Text>
    </View>
  )

  const logout = async () => {
    await signOut()
    navigation.dispatch(StackActions.replace("mainStack"))
  }

  const renderRightActions = () => (
    <React.Fragment>
      <Text>Sair</Text>
      <TopNavigationAction icon={LogoutIcon} onPress={logout} />
    </React.Fragment>
  )

  return (
    <>
       <TopNavigation
          alignment="center"
          title="Air Control"
          // subtitle="Subtitle"
          // accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={
          selectedDevice && selectedDevice.image
            ? { uri: selectedDevice.image }
            : require("./assets/image-product.jpg")
        }
      />
      <Card
        style={styles.bookingCard}
        appearance="filled"
        disabled={true}
        header={renderHeader}
        // footer={renderFooter}
      >
        {/* {!power && (
          <View style={styles.textContainer}>
            <Text category="h1">Desligado</Text>
          </View>
        )} */}

        {/* {power && ( */}
        <View>
          {mode === "auto" && (
            <View style={styles.textContainer}>
              <Text category="h1">Automático</Text>
            </View>
          )}
          {mode !== "auto" && (
            <TabBar selectedIndex={modeIndex - 1}>
              {mode === "cool" ? (
                <Tab title="Resfriar" icon={SnowFlakeIcon} />
              ) : (
                <Tab icon={SnowFlakeIcon} />
              )}
              {mode === "dry" ? (
                <Tab title="Secar" icon={WatterOffIcon} />
              ) : (
                <Tab icon={WatterOffIcon} />
              )}
              {mode === "fan" ? <Tab title="Vento" icon={FanIcon} /> : <Tab icon={FanIcon} />}
              {mode === "heat" ? <Tab title="Aquecer" icon={SunIcon} /> : <Tab icon={SunIcon} />}
            </TabBar>
          )}
          {mode !== "auto" && (
            <View style={styles.textContainer}>
              <Text category="h1">{temperature}ºC</Text>
              {fan === "auto" && (
                <Button style={styles.fanButton} appearance="ghost" accessoryLeft={FanIcon}>
                  Auto
                </Button>
              )}
              {fan === "low" && (
                <Button appearance="ghost" accessoryLeft={Fan1Icon}>
                  lento
                </Button>
              )}
              {fan === "middle" && (
                <Button appearance="ghost" accessoryLeft={Fan2Icon}>
                  médio
                </Button>
              )}
              {fan === "high" && (
                <Button appearance="ghost" accessoryLeft={Fan3Icon}>
                  rápido
                </Button>
              )}
            </View>
          )}
          <View style={styles.textContainer}>
            <Text category="h6">Sleep {sleep ? "ON" : "OFF"}</Text>
            <Text category="h6">Swing {swing ? "ON" : "OFF"}</Text>
          </View>
        </View>
        {/* )} */}

        <Divider />

        <View style={styles.containerButtons}>
          <Button
            style={styles.button}
            status="danger"
            accessoryLeft={PowerIcon}
            onPress={onPowerPressed}
          >
            POWER
          </Button>

          <Button
            accessoryLeft={PlusIcon}
            style={styles.button}
            status="basic"
            onPress={onTempUpPressed}
          >
            TEMP
          </Button>
          <Button
            accessoryLeft={SwapIcon}
            style={styles.button}
            status="basic"
            onPress={onModePressed}
          >
            MODE
          </Button>
          <Button
            accessoryLeft={MinusIcon}
            style={styles.button}
            status="basic"
            onPress={onTempDownPressed}
          >
            TEMP
          </Button>
          <Button
            accessoryLeft={ShuffleIcon}
            style={styles.button}
            status="basic"
            onPress={onSwingPressed}
          >
            SWING
          </Button>
          <Button
            accessoryLeft={FanIcon}
            style={styles.button}
            status="basic"
            onPress={onFanPressed}
          >
            FAN
          </Button>
          <Button
            accessoryLeft={PowerSleepIcon}
            style={styles.button}
            status="basic"
            onPress={onSleepPressed}
          >
            SLEEP
          </Button>
          <Button
            accessoryLeft={NavigationIcon}
            style={styles.button}
            status="basic"
            onPress={sendState}
          >
            ENTER
          </Button>
        </View>
      </Card>
      </ScrollView>
      </>
  )
})

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
  },

  textContainer: {
    margin: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  fanButton: {
    backgroundColor: "transparent",
  },

  containerInfos: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    minWidth: "40%",
    margin: 8,
  },
  image: {
    height: 250,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: "65%",
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    // position: "absolute",
    // bottom: 24,
    // right: 24,
  },
  detailsList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
})
