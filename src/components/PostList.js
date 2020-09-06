import React from 'react';
import {FlatList, StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import {THEME} from "../theme";

const PostList = ({data, onOpen}) => {

    const loading = useSelector(state => state.post.loading)

    if (loading)
        return <ActivityIndicator color={THEME.MAIN_COLOR}/>
    if (!data.length)
        return <Text style={styles.noData}>Постов пока нет.</Text>


    return (
        <View style={styles.wrapper}>
            <FlatList
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={onOpen}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    noData: {
        fontFamily: 'open-bold',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 20
    }
})

export default PostList;