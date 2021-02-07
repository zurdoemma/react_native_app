import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, Modal, Alert, TouchableOpacity } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date:new Date(),
            mode: 'date',
            show: false,
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number Of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking.toString() + '\nDate and Time: ' + this.state.date,
            [
            {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
            {text: 'OK', onPress: () => {this.presentLocalNotification(this.state.date); this.addReservationToCalendar(this.state.date); this.resetForm();}},
            ],
            { cancelable: false }
        );
    }  
    
    resetForm() {
        this.setState({guests: 1,
        smoking: false,
        date:new Date(),
        mode: 'date',
        show: false,
        showModal: false});
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }   

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
            },
            trigger: null,
          }); 
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show: Platform.OS === 'ios'});
        this.setState({date: currentDate});
        if(this.state.mode == 'date')
        {
            console.log(currentDate.toString());
            this.setState({mode: 'time'});
            this.setState({show: true});
        }
    };
    
    showMode = (currentMode) => {
        this.setState({show: true});
        this.setState({mode: currentMode});
    };
    
    showDatepicker = () => {
        this.showMode('date');
    };
    
    showTimepicker = () => {
        this.showMode('time');
    };
    
    obtainCalenderPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)

        if ( permission.status !== 'granted' ){
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            if ( permission.status !== 'granted' ){
                Alert.alert("Permission not granted")
            }
        }
        return permission
    }

    getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync()
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default')
        return defaultCalendars[0].source
    }

    addReservationToCalendar = async ( date ) => {
        await this.obtainCalenderPermission()

        const defaultCalendarSource = Platform.OS === 'ios' ?
            await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        const tempDate = Date.parse(date)
        const startDate = new Date(tempDate)
        const endDate = new Date(tempDate + 2 * 60 * 60 * 1000)

        const calendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })

        await Calendar.createEventAsync(calendarID, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
    }

    render() {

        return(
            <Animatable.View animation="zoomIn" duration={3000} delay={1500}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRowDatePicker}>
                    <Text style = { styles.formLabelDateTimePicker }>Date and Time</Text>
                    <Button onPress={this.showDatepicker} 
                            title=''
                            icon={<Icon name='calendar' type='font-awesome' color='white' />}
                            buttonStyle={{backgroundColor: "#512DA8", alignContent: 'center'}}
                    />
                    <TouchableOpacity onPress={this.showDatepicker}>
                        <Input
                            containerStyle={{
                                borderWidth: 2,  // size/width of the border
                                borderColor: 'lightgrey',  // color of the border
                                width: 220,
                                marginRight: 20,
                                height: 45
                            }}
                            inputStyle={{fontSize: 15}}
                            placeholder="select date and Time"
                            value={this.state.date.toLocaleString()}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {this.state.show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                        />
                    )}
                </View>
                <View>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        buttonStyle={{backgroundColor: "#512DA8", margin: 5}}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date.toString()}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formRowDatePicker: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formLabelDateTimePicker: {
        fontSize: 18,
        flex: 2,
        marginLeft: 10
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;