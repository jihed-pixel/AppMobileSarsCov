import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../Form/FormButton";
import FormInput from "../Form/FormInput";
import * as actions from "../../Actions/medicalService";
import { connect } from "react-redux";
import { StyleSheet,Text, View, Image } from 'react-native';
import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';

const Login = (props) => {
  useEffect(() => {


  }, [props.loggedUser])

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();



  const handleUsernameChange = (text) => {
    setUsername(text)

  }

  const handlePasswordChange = (text) => {
    setPassword(text)

  }

  const handleSubmit = (e) => {
    const values = {
      username: username,
      password: password
    }
    e.preventDefault();
    props.login(values);
    console.log(localStorage.getItem("loggedUser"))
  }

  return (
    <LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    < ScrollView>
      {(props.loggedUser !== null) && typeof (props.loggedUser) !== 'string' && (props.navigation.navigate("Home"))}
      <View style={tailwind(' items-center ')} >

        <Image source={{ uri: 'https://videohive.img.customer.envatousercontent.com/files/c19e97e7-ccae-4ec9-8bc8-e885d542dec4/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=1cf50a43f008c125f78607e910046d78' }}
          style={tailwind('rounded-full w-64 h-64 my-12')} />
        <Text style={tailwind('text-red-500')}>
          {typeof (props.loggedUser) === 'string' && props.loggedUser}

        </Text>

        <FormInput
          placeholder="Username"
          onChangeText={handleUsernameChange}
        />
        <FormInput
          placeholder="Password"
          onChangeText={handlePasswordChange}
          isPassword='true'
        />
        <FormButton title="Se connecter" onPress={handleSubmit} />

      </View>
      <View style={tailwind('pt-24 bottom-0 ')}  >
        <Text style={tailwind('font-bold text-gray-700 text-center')} > Copyright ©2021 All rights reserved | Yobitrust</Text>
      </View>
    </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2193b0',
  },
});
const mapStateToProps = (state) => ({
  loggedUser: state.medicalService.loggedUser,
});
const mapActionToProps = {
  login: actions.login,
};
export default connect(mapStateToProps, mapActionToProps)(Login);
