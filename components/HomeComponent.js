import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

function RenderItem(props) {
    
    const item = props.item;
    
    if (item != null) {
        return(
            <Card>
                <Card.Image source={{uri: baseUrl + item.image}} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Card.Title style={{ color: "white"}}>
                        {item.name}
                    </Card.Title>
                    <Card.FeaturedSubtitle style={{ color: "white"}}>
                        {item.designation}
                    </Card.FeaturedSubtitle>
                </Card.Image>
                <Card.Divider/>
                <Text
                    style={{margin: 10}}
                >
                    {item.description}
                </Text>   
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}


class Home extends Component {

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);