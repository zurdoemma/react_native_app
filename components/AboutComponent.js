import React, { Component } from 'react';
import { Text, FlatList, View, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History() {
    return(
        <Card>
            <Card.Title style={{justifyContent: "center", alignItems: "center"}}>
                Our History
            </Card.Title>
            <Card.Divider/>
            <Text style={{margin: 10}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{margin: 10}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>   
        </Card>
    );
}

class About extends Component {

    render() {

        const renderLeaders = ({item, index}) => {
            return (
                    <ListItem key={index} bottomDivider>
                        <Avatar rounded source={{uri: baseUrl + item.image}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>   
                    </ListItem>
                    );                    
        }

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History />
                        <Card
                            title='Corporate Leadership'>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else 
        {        
            return(
                <ScrollView keyboardShouldPersistTaps="always">
                    <View>
                        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                            <History />
                            <Card>
                                <Card.Title style={{justifyContent: "center", alignItems: "center"}}>
                                    Corporate Leadership
                                </Card.Title>
                                <Card.Divider/>
                                    <FlatList
                                        style={{marginTop:40}}
                                        data={this.props.leaders.leaders}
                                        renderItem={renderLeaders}
                                        keyExtractor={item => item.id.toString()}
                                    />
                            </Card>
                        </Animatable.View>
                    </View>
                </ScrollView >
            );
        }
    }
}

export default connect(mapStateToProps)(About);