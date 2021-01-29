import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Image source={{uri: baseUrl + dish.image}} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Card.Title style={{ color: "white"}}>
                            {dish.name}
                        </Card.Title>
                    </Card.Image>
                    <Card.Divider/>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text> 
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        /> 
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.openModal()}
                        /> 
                    </View> 
                </Card>
                
                /*
                <Card
                featuredTitle={dish.name}
                image={require()}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
                */
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={20} readonly startingValue={item.rating} style={{marginTop:10, marginBottom:10, alignItems:'flex-start'}}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card>
            <Card.Title>
                {'Comments'}
            </Card.Title>
            <Card.Divider/>
            <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />   
        </Card>
    );
}

class Dishdetail extends Component {

    //static navigationOptions = {
    //    title: 'Dish Details 2'
    //};

    constructor(props) {
        super(props);

        this.state = {
            author:'',
            comment:'',
            stars:2,
            showModal: false
        }
    }    

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    } 
    
    handleComment() {
        console.log(JSON.stringify(this.state));
        this.props.postComment(this.props.route.params.dishId, this.state.stars, this.state.author, this.state.comment);
    }

    render() {
        const dishId = this.props.route.params.dishId;

        return(<ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+dishId]}
                                favorite={this.props.favorites.some(el => el === dishId)}
                                onPress={() => this.markFavorite(dishId)}
                                openModal={() => this.toggleModal()}
                                
                    />
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View>
                            <Rating showRating fractions={0} startingValue={2} 
                                    onFinishRating={(value) => this.setState({stars: value})} 
                            /> 
                        </View>
                        <View>
                            <Input
                                placeholder='Author'
                                leftIcon={
                                    <Icon
                                    name='user'
                                    type='font-awesome'
                                    />
                                }
                                ref={this.state.author}
                                onChangeText={(value) => this.setState({author: value})}
                            />
                        </View>
                        <View style={{marginTop:-10}}>
                            <Input
                                placeholder='Comment'
                                leftIcon={
                                    <Icon
                                    name='comment'
                                    type='font-awesome'
                                    />
                                }
                                ref={this.state.comment}
                                onChangeText={(value) => this.setState({comment: value})}
                            />
                        </View>
                        <View style={{margin:10}}>
                            <Button 
                                onPress = {() =>{this.toggleModal();this.handleComment()}}
                                color="#512DA8"
                                title="SUBMIT" 
                                />
                        </View>
                        <View style={{margin:10}}>
                        <Button 
                                onPress = {() =>{this.toggleModal();}}
                                color="#9b9b9b"
                                title="CANCEL" 
                                />
                        </View>
                    </Modal>
            </ScrollView>);   
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
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

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);