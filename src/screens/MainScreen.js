import React,{useEffect} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Post} from "../components/Post";
import {DATA} from "../data";
import AppHeaderIcon from "../components/AppHeaderIcon";
import PostList from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/actions/post";

export const MainScreen = ({navigation}) => {
    const openPostHandler = post => {
        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadPosts())
    },[dispatch])

    const allPosts = useSelector(state => state.post.allPosts)

    return (
        <PostList onOpen={openPostHandler} data={allPosts}/>
    )
}

MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Мой блог',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title={'Кнопка камеры'}>
            <Item title='Take photo'
                  iconName='ios-camera'
                  onPress={() => navigation.push('Create')}
            />
        </HeaderButtons>
    ),
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title={'Кнопка бокового меню'}>
            <Item title='Menu'
                  iconName='ios-menu'
                  onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})