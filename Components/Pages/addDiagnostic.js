import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../Form/FormButton";
import * as actions from "../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {LinearGradient} from 'expo-linear-gradient';
import 'localstorage-polyfill';



const AddDiagnostic = (props) => {
  const [date, setDate] = useState()
  const [date2, setDate2] = useState()

  var handleAdd = (e) => {
    var values = {
      date: date
    }
    e.preventDefault()
    setDate2(date)
    props.addDiagnostic(props.patientList["cin"], values)
    //console.log(props.message)
  }

  return (

<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>
      {props.message != undefined && typeof (props.message) !== 'string' && date2 != undefined && props.navigation.navigate("DiagnosticDetails")}

      <View style={tailwind(' items-center ')} >
        <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Ajouter diagnostic: {props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
        <Text style={tailwind("text-red-500 py-8")}>{props.message != undefined && typeof (props.message) === 'string' && date2 != undefined && props.message}</Text>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(date !== undefined && date) || "Date du diagnostic"}
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
          onDateChange={(date) => { setDate(date) }}
        />

        <View style={styles.row}>

          <FormButton title=" Ajouter " onPress={handleAdd} />
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("Diagnostic") }} />
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
  patientList: state.medicalService.patientList,
  message: state.medicalService.message

});
const mapActionToProps = {
  addDiagnostic: actions.addDiagnostic

};

export default connect(mapStateToProps, mapActionToProps)(AddDiagnostic);
