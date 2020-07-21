import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Level1 from '../pages/level 1/index'

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Level1" component={Level1} options={{ gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
