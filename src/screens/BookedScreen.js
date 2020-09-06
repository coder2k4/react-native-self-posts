import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Post} from "../components/Post";
import AppHeaderIcon from "../components/AppHeaderIcon";
import PostList from "../components/PostList";
import {DATA} from "../data";
import {useSelector} from "react-redux";

export const BookedScreen = ({navigation}) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
  }

    const bookedPosts = useSelector(state => state.post.bookedPosts)

  return (
      <PostList onOpen={openPostHandler} data={bookedPosts}/>
  )
}

BookedScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Избранное',
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
