import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function Menu(props) 
{
    const renderMenuItem = ({item, index}) => {
        return (
                <ListItem key={index} bottomDivider
                          onPress={() => props.onPress(item.id)}>
                    <Avatar rounded source={require('./images/uthappizza.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>   
                </ListItem>
        );
    };

    return (           
            <FlatList
            style={{marginTop:40}}
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}


export default Menu;