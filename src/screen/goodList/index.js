import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import { SearchHeader } from '../../components/index'


import Test from '../../components/test'
import { API_HOME } from '@/api';
import { Screen } from '@/utils'


const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class GoodListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: [],
            menuData: [],
            offsetY: 0,
            loading: true
        };
        this.animateOpacity = new Animated.Value(1);
        // this.animateOpacity.addListener(event => {
        //     console.log(event,"valuevaluevalue")
        //     // this.setState({offset: event.value});
        //   });
    }

    componentDidMount() {

        this.fetchCategory();
    }

    fetchCategory = async ()=>{
        const res = await API_HOME.getCategory({ client_type: 'WAP' });
        
    }

    fetchFocus = async () => {
        this.setState({
            loading: true
        })
        const res = await API_HOME.getFocusPictures({ client_type: 'WAP' });
        const menuData = await API_HOME.getSiteMenu();
        // console.log(res, "resres")
        this.setState({
            focusData: res,
            menuData,
            loading: false
        })
    }

    _scrollY = (event) => {
        // console.log(event, "event")
        // console.log(event.nativeEvent, "event.nativeEvent")
        let { contentOffset: { y } } = event.nativeEvent;
        this.setState({
            offsetY: y
        })
        // console.log(y, "yyyyy")
    }


    render() {
        const { animateOpacity } = this;
        const { focusData, loading, menuData, offsetY } = this.state;
        // console.log(this.animateOpacity, "animateOpacity")
        // Animated.timing(this.animateOpacity, {
        //     toValue: 1,
        //     duration: 2000
        // }).start();
        // this.animateOpacity.interpolate({
        //     inputRange:[0,1],
        //     outputRange:[0,80],
        //     extrapolate:'clamp'
        // })



        if (loading) {
            return <View style={styles.loading} >
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        }
        // console.log(menuData, "menuData ====")

        return <View  >
           

                <Text>pixelRatio{pixelRatio}</Text>
              
 

        </View>
    }
}



const styles = StyleSheet.create({
    container: {

    },
    loading: {
        height: Screen.sHeight - 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    }
});