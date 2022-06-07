import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormInput from "../../Form/FormInput";
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
//import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';


const AVC = (props) => {

  const [anciennete, setAnciennete] = useState(0.0);
  const [traitement, setTraitement] = useState(0);
  const [episode_1, setEpisode_1] = useState(true)
  const [episode_x, setEpisode_x] = useState(false)
  const [handicap, setHandicap] = useState("mineur")

  var handleHandicapChange = (data) => {
    if (data[0].selected)
      setHandicap("mineur")
    else if (data[1].selected)
      setHandicap("moyen")
    else if (data[2].selected)
      setHandicap("majeur")
  }

  var handleAnciennteChange = (text) => {
    setAnciennete(text)
  }
  var handleTraitementChange = (text) => {
    setTraitement(text)
  }
  var handleAvcChange = (data) => {
    if (data[0].selected) {
      setEpisode_1(true);
      setEpisode_x(false);
    }
    else if (data[1].selected) {
      setEpisode_1(false);
      setEpisode_x(true)
    }
  }
  var handleSubmit = (e) => {
    var values = {
      antecedent: "AVC",
      anciennete: anciennete,
      traitement: traitement,
      episode_1: episode_1,
      getEpisode_x: episode_x,
      handicap: handicap
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
        <Text style={tailwind('text-gray-700 font-bold py-2 text-xl')}>AVC</Text>

        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            AVC?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Un seul episode',
              color: '#51d1c5',

            },
            {
              label: 'Plusieurs episodes',
              color: '#51d1c5',
            },
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleAvcChange}
          />

        </View>

        <FormInput title="Ancienneté" placeholder="Ancienneté" onChangeText={handleAnciennteChange} type="decimal-pad" />
        <FormInput title="Traitement" placeholder="Traitement" onChangeText={handleTraitementChange} />

        <View style={styles.row}>
          <Text style={tailwind('text-gray-700 py-2')}>
            Handicap?
    </Text>
          <RadioGroup radioButtons={[
            {
              label: 'Mineur',
              color: '#51d1c5',

            },
            {
              label: 'Moyen',
              color: '#51d1c5',
            },
            {
              label: 'Majeur',
              color: '#51d1c5',
            }
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleHandicapChange}
          />

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

export default connect(mapStateToProps, mapActionToProps)(AVC);
