import React, { useEffect } from "react"
import { ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { color, spacing } from "../../theme"
import { Device, DeviceModel, useStores } from "../../models"
import {
  Button,
  Card,
  Input,
  Layout,
  List,
  Modal,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components"
import { DeviceItem } from "./extra/device-item"
import { DeviceNameIcon, LogoutIcon, SearchIcon, WiFiIcon } from "./extra/icons"
import { KeyboardAvoidingView } from "./extra/3rd-party"
import { pipe } from "fp-ts/lib/function"
import { match } from "fp-ts/lib/Either"
import { StackActions, useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}



export const DeviceConnectScreen = observer(function DeviceConnectScreen() {
  // Pull in one of our MST stores
  const { deviceStore, deviceConnectStore, authStore } = useStores()

  const navigation = useNavigation()

  const {
    searchQuery,
    setSearchQuery,
    filteredDevices,
    watchAllDevicesFromUser,
    insertDevice,
    setSelectedDevice,
    clearDevicesStore,
  } = deviceStore

  const {
    visible,
    setVisible,
    newName,
    setNewName,
    newAddress,
    setNewAddress,
    clearDeviceConnect,
  } = deviceConnectStore

  const { getCurrentUser, signOut } = authStore

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const styles = useStyleSheet(themedStyles)
 

  useEffect(() => {
    clearDevicesStore()
    clearDeviceConnect()
    console.log(filteredDevices)
    
    const userOrError = getCurrentUser()

    const uid = pipe(
      userOrError,
      match(
        () => "",
        (user) => user.uid,
      ),
    )

    const unsubscribeOrError = watchAllDevicesFromUser(uid)

    const unsubscribe = pipe(
      unsubscribeOrError,
      () => () => null,
      (unsubscribe) => unsubscribe,
    )

    return () => {
      unsubscribe()
      setSearchQuery('')
      setVisible(false)
      setNewName('')
      setNewAddress('')
    }
  }, [])

  const addDevice = () => {
    const userOrError = getCurrentUser()

    const uid = pipe(
      userOrError,
      match(
        () => "",
        (user) => user.uid,
      ),
    )

    if (!uid) return

    const device = DeviceModel.create({
      id: "",
      name: newName,
      address: newAddress,
      uid: uid,
    })

    insertDevice(device)
    // setSelectedDevice(device)
    setVisible(false)
    navigation.navigate("control")
  }

  const onItemPress = (item: Device) => {
    setSelectedDevice(item)
    navigation.navigate("control")
  }

  const renderItem = ({ item }) => <DeviceItem device={item} onPress={() => onItemPress(item)} />

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <Input
        placeholder="Pesquisar"
        value={searchQuery}
        accessoryRight={SearchIcon}
        onChangeText={setSearchQuery}
      />
    </Layout>
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
    <Screen style={ROOT} preset="fixed">
      <Layout style={styles.container}>
        <TopNavigation
          alignment="center"
          title="Air Control"
          // subtitle="Subtitle"
          // accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
        {renderHeader()}
        <List
          data={filteredDevices}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          // ListHeaderComponent={renderHeader}
        />
        <Button style={styles.doneButton} onPress={() => setVisible(true)}>
          NOVO DISPOSITIVO
        </Button>
        <Modal
          style={styles.modal}
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <KeyboardAvoidingView>
            <Card disabled={true}>
              <Input
                style={styles.inputModal}
                autoCapitalize="none"
                placeholder="Nome"
                accessoryRight={DeviceNameIcon}
                value={newName}
                onChangeText={setNewName}
              />
              <Input
                autoCapitalize="none"
                placeholder="Endereço"
                accessoryRight={WiFiIcon}
                value={newAddress}
                onChangeText={setNewAddress}
              />
              <Button style={styles.buttonModal} onPress={addDevice}>
                ADICIONAR
              </Button>
            </Card>
          </KeyboardAvoidingView>
        </Modal>
      </Layout>
    </Screen>
  )
})

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    minWidth: "80%",
  },
  inputModal: {
    marginBottom: 15,
  },
  buttonModal: {
    marginTop: 20,
  },
  doneButton: {
    // flex: 1,
    margin: 24,
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
})
