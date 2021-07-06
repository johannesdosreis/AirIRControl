import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SignInScreen } from "../../screens"

const Stack = createStackNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="signIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}
