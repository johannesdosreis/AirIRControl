import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DeviceConnectScreen, DeviceControlScreen, DeviceConfigScreen } from "../../screens"
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import { DeviceIcon, ListIcon, RemoteIcon } from "./extra/icons"

const Tab = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="DEVICES" icon={ListIcon} />
    <BottomNavigationTab title="CONTROL" icon={RemoteIcon} />
    <BottomNavigationTab title="CONFIGS" icon={DeviceIcon} />
  </BottomNavigation>
)

export function DeviceNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      // screenOptions={{
      //   cardStyle: { backgroundColor: "transparent" },
      //   headerShown: false,
      // }}
    >
      <Tab.Screen name="connect" component={DeviceConnectScreen} />
      <Tab.Screen name="control" component={DeviceControlScreen} />
      <Tab.Screen name="config" component={DeviceConfigScreen} />
    </Tab.Navigator>
  )
}
