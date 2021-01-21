import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';


const MenuNavigator = createStackNavigator();

/*
const optionsNavigator = { headerStyle: { backgroundColor: '#512DA8' },
headerTintColor: '#fff',
headerTitleStyle: { color: '#fff' }};
*/

const HomeStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: '#512DA8' },
                                                                      headerTintColor: '#fff',
                                                                      headerTitleStyle: { color: '#fff' },
                                                                      headerLeft: () => { 
                                                                                            const navigation = useNavigation();
                                                                                            return <Icon name="menu" size={24} 
                                                                                                         color= 'white'
                                                                                                         onPress={ () => {navigation.dispatch(DrawerActions.openDrawer());}}/>}}} />
      </MenuNavigator.Navigator>
    );
}

const MenuStackNavigator = () => {
    return (
      <MenuNavigator.Navigator initialRouteName='Menu'>
        <MenuNavigator.Screen name="Menu" component={Menu} options={{ headerStyle: { backgroundColor: '#512DA8' },
                                                                      headerTintColor: '#fff',
                                                                      headerTitleStyle: { color: '#fff' },
                                                                      headerLeft: () => { 
                                                                        const navigation = useNavigation();
                                                                        return <Icon name="menu" size={24} 
                                                                                     color= 'white'
                                                                                     onPress={ () => {navigation.dispatch(DrawerActions.openDrawer());}}/>}}}
        />
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
                                                                                  headerTitleStyle: { color: '#fff' },
                                                                                  headerLeft: () => { 
                                                                                    const navigation = useNavigation();
                                                                                    return <Icon name="menu" size={24} 
                                                                                                 color= 'white'
                                                                                                 onPress={ () => {navigation.dispatch(DrawerActions.openDrawer());}}/>}}}
        />
      </MenuNavigator.Navigator>
    );
}

const AboutStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="About" component={About} options={{ title:"About Us",
                                                                                  headerStyle: { backgroundColor: '#512DA8' },
                                                                                  headerTintColor: '#fff',
                                                                                  headerTitleStyle: { color: '#fff' },
                                                                                  headerLeft: () => { 
                                                                                    const navigation = useNavigation();
                                                                                    return <Icon name="menu" size={24} 
                                                                                                 color= 'white'
                                                                                                 onPress={ () => {navigation.dispatch(DrawerActions.openDrawer());}}/>}}}
        />
      </MenuNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props} >
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
);

const HomeNavigator = createDrawerNavigator();

function getDrawerNavigator(props) {
    return (
        <HomeNavigator.Navigator
            initialRouteName='Home' 
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }} 
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <HomeNavigator.Screen name="Home" component={HomeStackNavigator} options={{drawerIcon: ({ tintColor, focused }) => (
                                                                                                        <Icon
                                                                                                            name='home'
                                                                                                            type='font-awesome'            
                                                                                                            size={22}
                                                                                                            color={tintColor}
                                                                                                        />)}
                                                                                    } 
            /> 
            <HomeNavigator.Screen name="About" component={AboutStackNavigator}  options={{ title:"About Us", 
                                                                                        drawerIcon: ({ tintColor, focused }) => (
                                                                                                <Icon
                                                                                                    name='info-circle'
                                                                                                    type='font-awesome'            
                                                                                                    size={22}
                                                                                                    color={tintColor}
                                                                                                />)}} 
            />
            <HomeNavigator.Screen name="Menu" component={MenuStackNavigator} options={{drawerIcon: ({ tintColor, focused }) => (
                                                                                                <Icon
                                                                                                    name='list'
                                                                                                    type='font-awesome'            
                                                                                                    size={22}
                                                                                                    color={tintColor}
                                                                                                />)}} 
            />
            <HomeNavigator.Screen name="Contact" component={ContactStackNavigator}   options={{ title:"Contact Us",
                                                                                                drawerIcon: ({ tintColor, focused }) => (
                                                                                                    <Icon
                                                                                                        name='address-card'
                                                                                                        type='font-awesome'            
                                                                                                        size={22}
                                                                                                        color={tintColor}
                                                                                                    />)}} 
            />   
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

  constructor(props) {
    super(props);
  }  

  render() {
    return (
        <NavigationContainer>
            {getDrawerNavigator(this.props)}
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
export default Main;