import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
//import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import FormInput from '../../Form/FormInput';
import {LinearGradient} from 'expo-linear-gradient';


const Admission = (props) => {
  const [type, setType] = useState("hhop")
  const [lieu, setLieu] = useState("chez lui")
  const [lieuCB, setLieuCB] = useState("lui")
  const [dateEnt, setDateEnt] = useState()
  const [mode, setMode] = useState("transfert inter-hopital")
  const [modeCB, setModeCB] = useState("transfert")
  const [hopital, setHopital] = useState()
  const [service, setService] = useState()


  var handleModeCB = (data) => {
    if (data[0].selected) {
      setMode(data[0].label)
      setModeCB(data[0].label)
    }
    if (data[1].selected) {
      setMode(data[1].label)
      setModeCB(data[1].label)
    }
    if (data[2].selected) {
      setMode(data[2].label)
      setModeCB(data[2].label)
    }
    if (data[3].selected) {
      setMode(data[3].label)
      setModeCB(data[3].label)
    }
    if (data[4].selected) {
      setMode(data[4].label)
      setModeCB(data[4].label)
    }
    if (data[5].selected) {
      //setMode(data[5].label)
      setModeCB(data[5].label)
    }
  }
  var handleTypeChange = (data) => {
    if (data[0].selected)
      setType("hhop")
    if (data[1].selected)
      setType("hop")
  }
  var handleLieuCB = (data) => {
    if (data[0].selected) {
      setLieu("chez lui"),
        setLieuCB("lui")
    }
    if (data[1].selected) {
      setLieuCB("centre")
    }
    if (data[2].selected)
      setLieuCB("autre")

  }
  var handleLieuChange = (text) => {
    setLieu(text)
  }
  var handleHopitalChange = (text) => {
    setHopital(text)
  }
  var handleServiceChange = (text) => {
    setService(text)
  }
  var handleModeChange = (text) => {
    setMode(text)
  }

  var handleSubmit = (e) => {
    e.preventDefault();
    var values = {
      type: type,
      lieu: lieu,
      hopital: hopital,
      service: service,
      dateEnt: dateEnt,
      mode: mode,

    }
    console.log(values)
    console.log(props.patientList["cin"])
    props.addAdmission(props.patientList["cin"], values)
    //props.navigation.navigate("DiagnosticDetails")

  }

  return (
    <LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>
      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Admission d'un cas confirmé COVID-19</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
      <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Admission?</Text>
      <RadioGroup radioButtons={[

        {
          label: "En dehors de l'hopital",
          color: '#51d1c5',
        },
        {
          label: "A l'hopital",
          color: '#51d1c5',
        },


      ]}
        flexDirection='row'
        style={tailwind('')}
        onPress={handleTypeChange}
      />
      {
        type === "hhop" && <View style={tailwind("items-center")}>
          <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Précisier le lieu?</Text>
          <RadioGroup radioButtons={[

            {
              label: "Chez lui",
              color: '#51d1c5',
            },
            {
              label: "Dans un centre d'isolement",
              color: '#51d1c5',
            },
            {
              label: "Autre",
              color: '#51d1c5',
            }


          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleLieuCB}
          />
          {lieuCB === "autre" && <FormInput placeholder="..." onChangeText={handleLieuChange} />}
          {lieuCB == "centre" && <FormInput placeholder="Préciser le quel" onChangeText={handleLieuChange} />}
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
            mode="date"
            placeholder={(dateEnt != undefined && dateEnt) || "Date d'entée?"}
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
            onDateChange={(date) => { setDateEnt(date) }}
          />

        </View>
      }
      {
        type === "hop" && <View style={tailwind("items-center")}>
          <FormInput placeholder="Hopital" onChangeText={handleHopitalChange} />
          <FormInput placeholder="Service" onChangeText={handleServiceChange} />
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
            mode="date"
            placeholder={(dateEnt != undefined && dateEnt) || "Date d'entée?"}
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
            onDateChange={(date) => { setDateEnt(date) }}
          />

          <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Mode d'entrée?</Text>
          <RadioGroup radioButtons={[

            {
              label: "Transfert inter-hopital",
              color: '#51d1c5',
            },
            {
              label: "Transfert inter-service",
              color: '#51d1c5',
            },
            {
              label: "Urgences",
              color: '#51d1c5',
            },
            {
              label: "SAMU",
              color: '#51d1c5',
            },
            {
              label: "D'un lieu d'isolement(Chez lui ou centre)",
              color: '#51d1c5',
            },
            {
              label: "Autre",
              color: '#51d1c5',
            },
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleModeCB}
          />
          {modeCB === "Autre" && <FormInput placeholder="Précisier" onChangeText={handleModeChange} />}


        </View>
      }
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("DiagnosticDetails") }} />
          <FormButton title="Enregistrer" onPress={handleSubmit} />

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
  loggedUser: state.medicalService.loggedUser,
  patientList: state.medicalService.patientList,

});
const mapActionToProps = {
  addAdmission: actions.addAdmission
};
export default connect(mapStateToProps, mapActionToProps)(Admission);
