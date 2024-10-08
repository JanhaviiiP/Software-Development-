import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddCategory from '../Screens/AddCategory';
import AddProduct from '../Screens/AddProduct';
import Home from '../../Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function BottomBar() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={AddCategory} />
      <Tab.Screen name="Product" component={AddProduct} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomBar;