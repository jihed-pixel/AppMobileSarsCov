import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, View, Image } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {IconButton,Colors} from 'react-native-paper';
import FormButton from "../Form/FormButton";
const Home = (props) => {
  return (
    <PaperProvider><View style={styles.BigContainer}>
    <View style={styles.ExtraSpaceUp}>
    </View>
    <View style={styles.BoxLayout}>
    <View style={styles.LeftBox}>
    <View style={styles.LeftBox1}></View>
    <View style={styles.LeftBox2}>
      <IconButton icon="mail" color={Colors.red500} size={50} onPress={() => props.navigation.navigate("SearchPatient")}></IconButton>
      <Text style={styles.title}>item.title</Text>
      </View>
    </View>
    <View style={styles.RightBox}>
    <View style={styles.RightBox1}><IconButton icon="mail" color={Colors.red500} size={50} onPress={() => props.navigation.navigate("SearchPatient")}></IconButton>
      <Text style={styles.title}>item.title</Text></View>
    <View style={styles.RightBox2}></View>
    </View>
    </View>
    
    <View style={styles.ExtraSpaceDown}>
    </View>
  </View></PaperProvider>
     
  );
}

const styles = StyleSheet.create({
  BigContainer:{
      flex:1,
      backgroundColor:'#fff',
  },
  ExtraSpaceUp:{
    flex:1,
    backgroundColor:'#fff',
  },
  BoxLayout:{
    flex:3,
    flexDirection:'row',
    //justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#fff',
    //width:'95%',
  },
  ExtraSpaceDown:{
    flex:1,
    backgroundColor:'#fff',
  },
  LeftBox:{
    flex:1,
    
    backgroundColor:'#fff',
    marginRight:'2.5%',
    marginLeft:'10%',
    marginVertical:'5%',
},
  RightBox:{
    flex:1,
    backgroundColor:'#fff',
    marginLeft:'2.5%',
    marginRight:'7%',
    marginVertical:'5%',
  },
  LeftBox1:{
    flex:1,
    backgroundColor:'#fff',
    marginBottom:'15%',
    borderRadius:15,
    elevation:10,
    justifyContent:'center',
    alignItems:'center',
  },
  LeftBox2:{
    flex:1,
    backgroundColor:'#fff',
    borderRadius:15,
    elevation:10,
    justifyContent:'center',
    alignItems:'center',
  },
  RightBox1:{
    flex:3,
    backgroundColor:'#fff',
    marginBottom:'15%',
    borderRadius:15,
    elevation:10,
    justifyContent:'center',
    alignItems:'center',
  },
  RightBox2:{
    flex:1,
    backgroundColor:'#fff',
    borderRadius:15,
    elevation:10,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontSize:20,
    color:"#696969"
  },
});
export default Home;
