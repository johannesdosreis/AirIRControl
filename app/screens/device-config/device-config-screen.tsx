import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, Text, Alert } from "react-native"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Button, Card, Input, Modal, StyleService, TopNavigation, TopNavigationAction, useStyleSheet } from "@ui-kitten/components"
import { ProfileAvatar } from "./extra/profile-avatar.component"
import { ProfileSetting } from "./extra/profile-setting.component"
import { CameraIcon, DeviceNameIcon, LogoutIcon, WiFiIcon } from "./extra/icons"
import { useStores } from "../../models"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { KeyboardAvoidingView } from "./extra/3rd-party"

export const DeviceConfigScreen = observer(function DeviceConfigScreen() {
  // Pull in one of our MST stores
  const { deviceStore, deviceConfigStore, authStore } = useStores()

  const {signOut} = authStore

  const {
    uploadImage,
    updateDevice,
    selectedDevice,
    deleteDevice,
    setSelectedDevice,
  } = deviceStore

  const {
    visibleEditModel,
    setVisibleEditModel,
    visibleImageModel,
    setVisibleImageModel,
    newImage,
    setNewImage,
    newName,
    setNewName,
    newAddress,
    setNewAddress,
  } = deviceConfigStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    // setNewName(selectedDevice.name)
    // setNewAddress(selectedDevice.address)
    // setNewImage(selectedDevice.image)
    // // console.log("oi2")
  })

  const styles = useStyleSheet(themedStyle)

  const onDoneButtonPress = (): void => {
    navigation && navigation.goBack()
  }

  const editUpdateDevice = () => {
    selectedDevice.setName(newName)
    selectedDevice.setAddress(newAddress)
    updateDevice(selectedDevice)
    setVisibleEditModel(false)
  }

  const cancelEdit = () => {
    setNewName(selectedDevice.name)
    setNewAddress(selectedDevice.address)
    setVisibleEditModel(false)
    console.log("oi")
  }

  const saveImage = async () => {
    const url = await uploadImage(newImage)
    selectedDevice.setImage(url)
    updateDevice(selectedDevice)
    setVisibleImageModel(false)
  }

  const cancelImage = () => {
    setNewImage(selectedDevice.image)
    setVisibleImageModel(false)
  }

  const editDeviceButton = () => {
    setVisibleEditModel(true)
  }

  const deleteDeviceButton = () => {
    Alert.alert("Deletar Dispositivo", "Desenha realmente deletar esse dispositivo", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelar Precionado"),
        style: "cancel",
      },
      {
        text: "OK", onPress: () => {
          const id = selectedDevice?.id || null
          setSelectedDevice(null)
          console.log(id)
          if (!id) return
          deleteDevice(id)
          navigation.navigate("connect")
        }
      },
    ])
  }

  const imageCallback = async (response) => {
    if (response.didCancel) {
      setVisibleImageModel(false)
    } else if (response.errorMessage) {
      // todo alert error
      setVisibleImageModel(false)
    } else {
      console.log(response)

      setNewImage(response.assets[0].uri)
    }
  }

  const imageFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 1024,
        maxHeight: 1024,
      },
      imageCallback,
    )
  }

  const imageFromCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        maxWidth: 1024,
        maxHeight: 1024,
      },
      imageCallback,
    )
  }

  const changePhotoButton = () => {
    setVisibleImageModel(true)
  }

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon}
      onPress={changePhotoButton}
    />
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Modal
          style={styles.modal}
          visible={visibleImageModel}
          backdropStyle={styles.backdrop}
          // onBackdropPress={() => setVisibleImageModel(false)}
        >
          <Card>
            <ProfileAvatar
              style={styles.profileAvatar}
              source={newImage ? { uri: newImage } : require("./assets/image-product.jpg")}
            />
            <View style={styles.row}>
              <Button style={styles.button} onPress={imageFromCamera}>
                CÂMERA
              </Button>
              <Button style={styles.button} onPress={imageFromLibrary}>
                GALERIA
              </Button>
            </View>

            {/* <View style={styles.row}> */}
            <Button style={styles.button} onPress={saveImage}>
              SALVAR
            </Button>

            <Button style={styles.button} onPress={cancelImage}>
              CANCELAR
            </Button>
            {/* </View> */}
          </Card>
        </Modal>

        <Modal
          style={styles.modal}
          visible={visibleEditModel}
          backdropStyle={styles.backdrop}
          // onBackdropPress={() => setVisible(false)}
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
              <Button style={styles.buttonModal} onPress={editUpdateDevice}>
                SALVAR
              </Button>
              <Button style={styles.buttonModal} onPress={cancelEdit}>
                CANCElAR
              </Button>
            </Card>
          </KeyboardAvoidingView>
        </Modal>

        <ProfileAvatar
          style={styles.profileAvatar}
          source={
            selectedDevice && selectedDevice.image
              ? { uri: selectedDevice.image }
              : require("./assets/image-product.jpg")
          }
          editButton={renderPhotoButton}
        />
        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          hint="Nome"
          value={selectedDevice?.name || "Dispositivo não escolhido"}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Endereço"
          value={selectedDevice?.address || "Dispositivo não escolhido"}
        />
        {/* <ProfileSetting style={styles.profileSetting} hint="Latitude" value={selectedDevice.localization.latitude} /> */}
        {/* <ProfileSetting style={styles.profileSetting} hint="Age" value={`${profile.age}`} /> */}
        {/* <ProfileSetting style={styles.profileSetting} hint="Weight" value={`${profile.weight} kg`} /> */}
        {/* <ProfileSetting style={styles.profileSetting} hint="Height" value={`${profile.height} cm`} /> */}
        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          hint="Latitude"
          value={selectedDevice?.localization.latitude.toString() || "Dispositivo não escolhido"}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Longitude"
          value={selectedDevice?.localization.longitude.toString() || "Dispositivo não escolhido"}
        />

        <Button style={styles.button} onPress={editDeviceButton}>
          Editar
        </Button>
        <Button style={styles.button} onPress={deleteDeviceButton} status="danger">
          Delete
        </Button>
      </ScrollView>
    </>
  )
})

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },

  row: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },

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

  contentContainer: {
    paddingVertical: 24,
  },

  profileAvatar: {
    aspectRatio: 1.0,
    height: 148,
    alignSelf: "center",
  },

  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  button: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  
})
