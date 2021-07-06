import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Avatar, Button, Icon, ListItem, ListItemProps, Text } from "@ui-kitten/components"
import { WiFiIcon } from "./icons"

// const BluetoothIcon = (props) => <Icon {...props} name="bluetooth-outline" />

export const DeviceItem = (props) => {
  const { device, onPress, ...listItemProps } = props

  //   const renderButton = (style: ViewStyle): React.ReactElement => (
  //     <View style={styles.dateContainer}>
  //       {/* {message.isRead && <DoneAllIcon />} */}
  //       {message.isRead && (
  //         <Text style={styles.dateText} appearance="hint" category="c1">
  //           {message.date}
  //         </Text>
  //       )}
  //       <Button style={styles.button} status="primary" accessoryLeft={BluetoothIcon} size="small">
  //         {message.isRead ? "OPEN" : "CONNECT"}
  //       </Button>
  //     </View>
  //   )

  const renderItemButton = () => (
    <Button status="primary" accessoryLeft={WiFiIcon} size="small" onPress={onPress}>
      CONNECT
    </Button>
  )

  const renderItemIcon = (props) => <Icon {...props} name="air-conditioner" />

  const renderItemAvatar = (props) => (
    <Avatar {...props} style={styles.avatar} source={{ uri: device.image }} />
  )

  return (
    <ListItem
      {...listItemProps}
      title={device.name}
      description={device.address}
      accessoryLeft={device.image ? renderItemAvatar : renderItemIcon}
      accessoryRight={renderItemButton}
    />
  )
}

const styles = StyleSheet.create({
  //   button: {
  //     // margin: 2,
  //   },

  avatar: {
    height: 40,
    marginRight: 10,
    // tintColor: null,
    width: 40,
  },

  //   dateContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },

  //   dateText: {
  //     marginRight: 20,
  //     textAlign: "right",
  //     minWidth: 64,
  //   },
})
