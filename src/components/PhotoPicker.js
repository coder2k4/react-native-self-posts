import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {View, Button, StyleSheet, Image} from "react-native";

async function askPermissions() {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )

    if (status !== 'granted'){
        Alert.alert('Ошибка', 'Вы не дали прав на создание фото')
        return false
    }
    return true
}

const PhotoPicker = ({onPick}) => {

    const [image, setImage] = useState(null)

    const takePhoto = async () => {
        const hasPermission = await askPermissions()

        if(!hasPermission)
            return

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9]
        })
        // console.log(img)
        setImage(img.uri)
        onPick(img.uri)
    }

    return (
        <View style={styles.wrapper}>
            <Button title={'Сделать фото'} onPress={takePhoto}/>
            {image && <Image style={styles.image} source={{uri: image}}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
})


export default PhotoPicker;