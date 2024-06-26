import { Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import utils from '../utils'
import { FontAwesome5 } from '@expo/vector-icons'

export default function ChangeFirstPassScreen({navigation, route}) {
    const params = route.params
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowRePassword, setIsShowRePassword] = useState(false)
    const onContinue = async () => {
        if(newPassword == "") {
            alert("Mật khẩu không được bỏ trống")
        }
        else {
            if(newPassword != reNewPassword) {
                alert("Mật khẩu không trùng khớp")
            }
            else {
                try {
                    const response = await axios.post(`${utils.apiUrl}/user/change-password`, {
                        oldPassword: params.oldPassword,
                        newPassword: newPassword
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + params.accessToken
                        }
                    })
                    const data = response.data
                    if(data.status == true) {
                        navigation.replace('HomeBottomTabNavigator')
                    }
                    else {
                        alert("Thất bại")
                        console.log(data)
                    }
                } catch (error) {
                    alert(error)
                }
            }
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={{fontSize: 16, textAlign: 'center', fontWeight: '600'}}>Bạn vui lòng cập nhật mật khẩu mới !</Text>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.inputArea}>
                            <TextInput style={styles.input} placeholder='Mật khẩu mới' secureTextEntry={!isShowPassword} onChangeText={(value) => setNewPassword(value)}/>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => {setIsShowPassword(!isShowPassword)}}>
                                <FontAwesome5 name={isShowPassword ? 'eye-slash' : 'eye'} size={18}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputArea}>
                            <TextInput style={styles.input} placeholder='Nhập lại mật khẩu mới' secureTextEntry={!isShowRePassword} onChangeText={(value) => setReNewPassword(value)}/>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => {setIsShowRePassword(!isShowRePassword)}}>
                                <FontAwesome5 name={isShowRePassword ? 'eye-slash' : 'eye'} size={18}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.continueButton} activeOpacity={0.6} onPress={onContinue}>
                            <Text style={{fontSize: 15, fontWeight: '600', color: 'yellow'}}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Dimensions.get('window').height * 0.25
    },
    continueButton: {
        backgroundColor: 'red',
        marginTop: 60,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 24
    },
    inputArea: {
        width: Dimensions.get('screen').width * 0.7, 
        borderBottomWidth: 1, 
        marginTop: 40, 
        paddingBottom: 4, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    input: {
        fontSize: 15, 
        color: 'black', 
        opacity: 0.8, 
        flex: 1
    }
})