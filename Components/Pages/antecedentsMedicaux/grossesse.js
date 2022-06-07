import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormInput from "../../Form/FormInput";
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import RadioGroup from 'react-native-radio-buttons-group';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
//import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';



const Grossesse = (props) => {
  const [simple, setSimple] = useState(true)
  const [gpa, setGPA] = useState(true)
  const [sa, setSa] = useState(true)
  const [path, setPath] = useState(true)
  const [pathologie, setPathologie] = useState(null)


  var handleSimpleChange = (data) => {
    if (data[0].selected)
      setSimple(true)
    else if (data[1].selected)
      setSimple(false)
  }

  var handleGpaChange = (data) => {
    if (data[0].selected)
      setGPA(true)
    else if (data[1].selected)
      setGPA(false)
  }

  var handleSaChange = (data) => {
    if (data[0].selected)
      setSa(true)
    else if (data[1].selected)
      setSa(false)
  }
  var handlePathChange = (data) => {
    if (data[0].selected)
      setPath(true)
    else if (data[1].selected)
      setPath(false)
  }
  var handlePathologieChange = (text) => {
    setPathologie(text)
  }


  var handleSubmit = (e) => {
    var values = {
      antecedent: "grossesse",
      simple: simple,
      gpa: gpa,
      sa: sa,
      pathologie: pathologie
    }
    e.preventDefault();
    console.log(values)
    props.antecedentsMedicaux(props.patientList["cin"], values)
    props.navigation.navigate("AddAntecendentsMedicaux")
  }




  return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>


      <View style={tailwind(' items-center ')} >
        <Text style={tailwind('text-gray-700 font-bold py-2 text-xl')}>Grossesse en cours</Text>

        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            Grossesse?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Grossesse simple',
              color: '#51d1c5',

            },
            {
              label: 'Grossesse compliqué',
              color: '#51d1c5',
            },
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleSimpleChange}
          />

        </View>



        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            G.P.A?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Oui',
              color: '#51d1c5',

            },
            {
              label: 'Non',
              color: '#51d1c5',
            },
          ]}
            flexDirection='row'
            style={tailwind('')}
            onPress={handleGpaChange}
          />
        </View>

        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            SA?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Oui',
              color: '#51d1c5',

            },
            {
              label: 'Non',
              color: '#51d1c5',
            },
          ]}
            flexDirection='row'
            style={tailwind('')}
            onPress={handleSaChange}
          />



        </View>

        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            Pathologies liées à la grossesse?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Oui',
              color: '#51d1c5',

            },
            {
              label: 'Non',
              color: '#51d1c5',
            },
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handlePathChange}
          />



        </View>
        <View>
          {(path === true) && <FormInput placeholder="Précisier les pathologies" onChangeText={handlePathologieChange} />}
        </View>




        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("AddAntecendentsMedicaux") }} />
          <FormButton title="Enregister" onPress={handleSubmit} />

        </View>



      </View>



    </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2193b0',
  },
});
const mapStateToProps = (state) => ({
  patientList: state.medicalService.patientList
});
const mapActionToProps = {

  antecedentsMedicaux: actions.antecedentsMedicaux
};

export default connect(mapStateToProps, mapActionToProps)(Grossesse);
