import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';




const MenuNavigator = createStackNavigator();
const optionsNavigator = { headerStyle: { backgroundColor: '#512DA8' },
headerTintColor: '#fff',
headerTitleStyle: { color: '#fff' }};

function getMenuNavigator() {
    return (
      <MenuNavigator.Navigator initialRouteName='Menu'>
        <MenuNavigator.Screen name="Menu" component={Menu} options={optionsNavigator} />
        <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{ title:"Dish Detail",
                                                                                  headerStyle: { backgroundColor: '#512DA8' },
                                                                                  headerTintColor: '#fff',
                                                                                  headerTitleStyle: { color: '#fff' }}} />
      </MenuNavigator.Navigator>
    );
}




/*
const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MenuNavigator />    
        </View>
*/

class Main extends Component {

  render() {
    return (
        <NavigationContainer>
            {getMenuNavigator()}
        </NavigationContainer>
    );
  }
}
  
export default Main;