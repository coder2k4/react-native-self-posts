import React, {useState, useRef} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Button,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {THEME} from "../theme";
import {addPost} from "../store/actions/post";
import {useDispatch} from "react-redux";
import PhotoPicker from "../components/PhotoPicker";


export const CreateScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [text, setText] = useState('');

    const imageRef = useRef();


    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imageRef.current,
            booked: 0
        }
        dispatch(addPost(post))
        navigation.navigate('Main')
    }

    const photoPickHandler = uri => {
        imageRef.current = uri
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Создайте пост</Text>
                    <TextInput style={styles.textarea}
                               placeholder={'Введите текст заметки'}
                               value={text}
                               onChangeText={setText}
                               multiline/>
                </View>
                <PhotoPicker onPick={photoPickHandler}/>
                <Button
                    title={'Создать пост'}
                    color={THEME.MAIN_COLOR}
                    onPress={saveHandler}
                    disabled={!text}
                />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Создать пост',
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
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-bold'
    }
})
