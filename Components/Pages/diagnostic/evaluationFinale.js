import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
//import 'localstorage-polyfill';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import FormInput from '../../Form/FormInput';
import FormInput2 from '../../Form/FormInput2';
import {LinearGradient} from 'expo-linear-gradient';




const EvaluationFinale = (props) => {
  const [dateSor, setDateSor] = useState()
  const [deces, setDeces] = useState(false)
  const [dateDispSig, setDateDispSig] = useState()
  const [causesDir, setCausesDir] = useState()
  const [causesIndir, setCausesIndir] = useState()

  var handleDecesChange = (data) => {
    if (data[0].selected)
      setDeces(false)
    else setDeces(true)
  }
  var handleSubmit = (e) => {
    e.preventDefault()
    var values = {
      dateSor: dateSor,
      dateDispSig: dateDispSig,
      deces: deces,
      causesDir: causesDir,
      causesIndir: causesIndir,
    }
    //console.log(values)
    props.addEvaluationFinale(props.patientList["cin"], values)
    props.navigation.navigate("DiagnosticDetails")
  }


  return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>



      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Evaluation finale</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
      <View style={tailwind("items-center py-8")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(dateSor != undefined && dateSor) || "Date de sortie?"}
          format="YYYY-MM-DD"
          minDate="1920-05-01"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              left: 0,
              top: 0,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0
            }

          }}
          onDateChange={(date) => { setDateSor(date) }}
        />

      </View>
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <Text style={tailwind("text-gray-700")}>Décès</Text>
          <RadioGroup radioButtons={[

            {
              label: "  Non",
              color: '#51d1c5',
            },
            {
              label: "Oui",
              color: '#51d1c5',
            },

          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleDecesChange}
          />


        </View>
        {
          deces === false &&
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(dateDispSig != undefined && dateDispSig) || "Date de disparition des signes"}
            format="YYYY-MM-DD"
            minDate="1920-05-01"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                left: 0,
                top: 0,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0
              }

            }}
            onDateChange={(date) => { setDateDispSig(date) }}
          />
        }
        {
          deces === true && <View>
            <FormInput placeholder="Causes directes" onChangeText={setCausesDir} />
            <FormInput placeholder="Causes indirectes" onChangeText={setCausesIndir} />
          </View>
        }

      </View>

      <View style={tailwind("items-center py-8")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("DiagnosticDetails") }} />
          <FormButton title="Enregistrer" onPress={handleSubmit} />

        </View>
      </View>
      <View>

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
  loggedUser: state.medicalService.loggedUser,
  patientList: state.medicalService.patientList,
});
const mapActionToProps = {
  login: actions.login,
  logout: actions.logout,
  addEvaluationFinale: actions.addEvaluationFinale
};
export default connect(mapStateToProps, mapActionToProps)(EvaluationFinale);
