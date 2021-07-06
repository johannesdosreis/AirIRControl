import { Icon } from "@ui-kitten/components"
import React from "react"
import { ImageProps } from "react-native"

export const ListIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="devices" />
)

export const RemoteIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="gamepad" />
)

export const DeviceIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="cog" />
)
