import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})


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

const ReservationStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Reservation" component={Reservation} options={{ title:"Reservation",
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

const FavoritesStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Favorites" component={Favorites} options={{ title:"My Favorites",
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

const LoginStackNavigator = () => {
    return (
      <MenuNavigator.Navigator>
        <MenuNavigator.Screen name="Login" component={Login} options={{ title:"Login",
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
            <HomeNavigator.Screen name="Login" component={LoginStackNavigator} options={{drawerIcon: ({ tintColor, focused }) => (
                                                                                                        <Icon
                                                                                                            name='sign-in'
                                                                                                            type='font-awesome'            
                                                                                                            size={24}
                                                                                                            color={tintColor}
                                                                                                        />)}
                                                                                    } 
            /> 
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
            <HomeNavigator.Screen name="Favorites" component={FavoritesStackNavigator}   options={{ title:"My Favorites",
                                                                                                drawerIcon: ({ tintColor, focused }) => (
                                                                                                    <Icon
                                                                                                        name='heart'
                                                                                                        type='font-awesome'            
                                                                                                        size={24}
                                                                                                        color={tintColor}
                                                                                                    />)}} 
            /> 
            <HomeNavigator.Screen name="Reservation" component={ReservationStackNavigator}   options={{ title:"Reserve Table",
                                                                                                drawerIcon: ({ tintColor, focused }) => (
                                                                                                    <Icon
                                                                                                        name='cutlery'
                                                                                                        type='font-awesome'            
                                                                                                        size={24}
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

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);