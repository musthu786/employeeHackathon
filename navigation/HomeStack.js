import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Detail from '../screens/Detail';
import AddHackathon from '../screens/AddHackathon';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator  options={({ route }) => ({ title: route.params.name })}>
      {/* <Stack.Screen  options={{ title: 'My home' }} name='Home' component={HomeScreen} /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='AddHackathon' component={AddHackathon} />
    </Stack.Navigator>
  );
}
