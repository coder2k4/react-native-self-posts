import React, {useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import {DATA} from "../data";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {removePost, toggleBooked} from "../store/actions/post";
import {MainScreen} from "./MainScreen";

export const PostScreen = ({navigation}) => {
    const dispatch = useDispatch()

    const postId = navigation.getParam('postId')

    const post = useSelector(state => state.post.allPosts.find(post => post.id === postId))

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({toggleHandler})
    }, [toggleHandler])

    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

    useEffect(() => {
        navigation.setParams({booked})
    }, [booked])

    //Заготовочка для удаления поста
    const removeHandler = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        navigation.goBack()
                        dispatch(removePost(postId))
                    }
                },
            ],
            {cancelable: false},
        );
    }

    if(!post)
        return null

    return (
        <ScrollView style={styles.center}>
            <Image source={{uri: post.img}} style={styles.img}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title='Удалить'
                    color={THEME.DANGER_COLOR}
                    onPress={removeHandler}
            />
        </ScrollView>

    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? 'ios-star' : 'ios-star-outline'
    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Take photo'
                      iconName={iconName}
                      onPress={toggleHandler}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})
