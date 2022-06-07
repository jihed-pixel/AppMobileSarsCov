import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import FormInput from "../../Form/FormInput";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
//import 'localstorage-polyfill';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import FormCheckBox from "../../Form/CheckBox";
import {LinearGradient} from 'expo-linear-gradient';





const ExamenRadioParaCli = (props) => {

  const [type, setType] = useState("Thorax")
  const [datePr, setDatePr] = useState()
  const [result, setResult] = useState("Normale")
  const [espaceQT, setEspaceQT] = useState()
  const [aspect, setAspect] = useState()
  const [nbQua, setNbQua] = useState()

  var handleCheckBoxChange = (newValue, text) => {
    if (newValue == true) setResult(result + text + " ")
    else { setResult(result.replace(text + " ", "")) }

  }


  var handleResultChange = (data) => {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].selected) { setResult(data[i].label) }

    }
  }
  var handleTypeChange = (data) => {
    if (data[0].selected) {
      setType("Thorax")
      setDatePr()
      setResult("Normale")
    }

    if (data[1].selected) {
      setType("TdmTho")
      setDatePr()
      setResult("")
    }

    if (data[2].selected) {
      setType("ECG")
      setDatePr()
      setResult("")
    }


  }
  var handleSubmit = (e) => {
    e.preventDefault()
    var values = {
      type: type,
      datePr: datePr,
      result: result,
      espaceQT: espaceQT,
      aspect: aspect,
      nbQua: nbQua,
      datepr: datePr
    }
    props.addExamRadioParaCli(props.patientList["cin"], values)
    props.navigation.navigate("DiagnosticDetails")
    console.log(values)

  }


  return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>
      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Examens radiologiques et para-cliniques</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
      <Text style={tailwind("pt-8 text-center pb-2 text-gray-700")}>Ajouter un examen?</Text>
      <RadioGroup radioButtons={[
        {
          label: 'Radio Thorax',
          color: '#51d1c5',

        },
        {
          label: 'TDM thoracique',
          color: '#51d1c5',
        },
        {
          label: 'ECG',
          color: '#51d1c5',
        },
      ]}
        //flexDirection='row'
        style={tailwind('')}
        onPress={handleTypeChange}
      />

      <View style={tailwind("items-center")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(datePr !== undefined && datePr) || "Date de prise"}
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
          onDateChange={(date) => { setDatePr(date) }}
        />

      </View>
      {
        type === "Thorax" && <View style={tailwind("items-center py-2")}>
          <Text style={tailwind("font-bold py-4 text-xl text-gray-700")}>Radio Thorax</Text>
          <RadioGroup radioButtons={[
            {
              label: 'Normale',
              color: '#51d1c5',

            },
            {
              label: 'Opacité alvéolaire',
              color: '#51d1c5',
            },
            {
              label: 'Opacité interstitielle',
              color: '#51d1c5',
            },
          ]}
            //flexDirection='row'
            style={tailwind('')}
            onPress={handleResultChange}
          />
          <FormInput placeholder="Nb de quadrants atteints" type="number-pad" onChangeText={setNbQua} />
        </View>
      }
      {
        type === "TdmTho" && <View  >


          <Text style={tailwind("font-bold py-4 text-xl text-gray-700 text-center")}>TDM thoracique</Text>



          <View style={tailwind("px-6")}>

            <FormCheckBox text="Normale" value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Atteinte alvéolaire" value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Atteinte interstitielle" value={false} value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Atteinte bilatérale" value={false} value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Atteinte unilatérale" value={false} value={false} onPress={handleCheckBoxChange} />


          </View>



          <View style={tailwind('items-center')}>
            <FormInput placeholder="Aspect en verre dépoli"  onChangeText={setAspect} />

          </View>
        </View>
      }
      {
        type === "ECG" && <View >
          <Text style={tailwind("font-bold py-4 text-xl text-gray-700 text-center")}>ECG</Text>
          <View style={tailwind("px-6")}>

            <FormCheckBox text="Normale" value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Troubles de la repolarisation" value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Troubles du rythme" value={false} value={false} onPress={handleCheckBoxChange} />
            <FormCheckBox text="Bloc auriculo vantriculaire" value={false} value={false} onPress={handleCheckBoxChange} />

          </View>
          <View style={tailwind("items-center")}>
            <FormInput placeholder="Espace Qt" type="decimal-pad" onChangeText={setEspaceQT} />

          </View>

        </View>
      }
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => props.navigation.navigate("DiagnosticDetails")} />
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
  patientList: state.medicalService.patientList,
});
const mapActionToProps = {
  login: actions.login,
  logout: actions.logout,
  addExamRadioParaCli: actions.addExamRadioParaCli
};
export default connect(mapStateToProps, mapActionToProps)(ExamenRadioParaCli);
