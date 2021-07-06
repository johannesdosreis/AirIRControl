import React from "react"
import { ImageProps, ImageStyle } from "react-native"
import { Icon, IconElement, useTheme } from "@ui-kitten/components"

export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="arrow-ios-back" />
)

export const PowerIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="power" />
)

export const PlusIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="plus" />
)

export const MinusIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="minus" />
)

export const SwapIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="swap-horizontal" />
)

export const FanIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="fan" />
)

export const Fan1Icon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="fan-speed-1" />
)

export const Fan2Icon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="fan-speed-2" />
)

export const Fan3Icon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="fan-speed-3" />
)

export const ShuffleIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="shuffle" />
)

export const PowerSleepIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="power-sleep" />
)

export const NavigationIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="navigation" />
)

export const SendIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="send" />
)

export const SnowFlakeIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="snowflake" />
)

export const SunIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="white-balance-sunny" />
)

export const WatterOffIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="water-off" />
)


export const LogoutIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name="logout" />
)
