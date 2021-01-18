import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator   } from '@react-navigation/drawer';




const MenuNavigator = createStackNavigator();
const optionsNavigator = { headerStyle: { backgroundColor: '#512DA8' },
headerTintColor: '#fff',
headerTitleStyle: { color: '#fff' }};

const HomeStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Home" component={Home} options={optionsNavigator} />
      </MenuNavigator.Navigator>
    );
}

const MenuStackNavigator = () => {
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

const ContactStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Contact" component={Contact} options={{ title:"Contact Us",
                                                                                  headerStyle: { backgroundColor: '#512DA8' },
                                                                                  headerTintColor: '#fff',
                                                                                  headerTitleStyle: { color: '#fff' }}} />
      </MenuNavigator.Navigator>
    );
}

const AboutStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="About" component={About} options={{ title:"About Us",
                                                                                  headerStyle: { backgroundColor: '#512DA8' },
                                                                                  headerTintColor: '#fff',
                                                                                  headerTitleStyle: { color: '#fff' }}} />
      </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createDrawerNavigator();

function getDrawerNavigator() {
    return (
        <HomeNavigator.Navigator
            initialRouteName='Home' 
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
        >
            <HomeNavigator.Screen name="Home" component={HomeStackNavigator} /> 
            <HomeNavigator.Screen name="About" component={AboutStackNavigator}  options={{ title:"About Us"}} />
            <HomeNavigator.Screen name="Menu" component={MenuStackNavigator} />
            <HomeNavigator.Screen name="Contact" component={ContactStackNavigator}   options={{ title:"Contact Us"}} />   
        </HomeNavigator.Navigator>
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
            {getDrawerNavigator()}
        </NavigationContainer>
    );
  }
}
  
export default Main;