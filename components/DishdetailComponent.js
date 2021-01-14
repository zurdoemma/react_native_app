import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Image source={require('./images/uthappizza.png')} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Card.Title style={{ color: "white"}}>
                            {dish.name}
                        </Card.Title>
                    </Card.Image>
                    <Card.Divider/>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>    
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

function Dishdetail(props) {
    return(<RenderDish dish={props.dish} />);
}

export default Dishdetail;