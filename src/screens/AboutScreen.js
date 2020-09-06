import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {MainScreen} from "./MainScreen";

export const AboutScreen = ({}) => {
    return (
        <View style={styles.center}>
            <Text>Приложение на React Native</Text>
            <Text>Версия приложения <Text style={styles.version}>1.0.0</Text></Text>
            <Text>Complete 25.02.2020 by Standalone (G.A.S.)</Text>
        </View>
    )
}

AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'О данном приложении',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title={'Кнопка бокового меню'}>
            <Item title='Menu'
                  iconName='ios-menu'
                  onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        fontFamily: 'open-bold'
    }
})


