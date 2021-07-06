import React from "react"
import { ImageProps, ImageStyle } from "react-native"
import { Icon, IconElement } from "@ui-kitten/components"

export const CameraIcon = (style: ImageStyle): IconElement => <Icon {...style} name="camera" />

export const WiFiIcon = (style: ImageStyle): IconElement => <Icon {...style} name="wifi" />

export const DeviceNameIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="rename-box" />
)


export const LogoutIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="logout" />
)

