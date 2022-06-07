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
import {LinearGradient} from 'expo-linear-gradient';


const ConfirmationDiag = (props) => {
  const [test, setTest] = useState("Pcr")
  const [datePr, setDatePr] = useState()
  const [type, setType] = useState("Nasopharyngé")
  const [resultat, setResultat] = useState("Positif")

  var handleSubmit = (e) => {
    e.preventDefault();
    var values = {
      test: test,
      datePr: datePr,
      result: resultat,
      type: type
    }
    //console.log(values)
    props.addConfDiag(props.patientList["cin"], values)
    props.navigation.navigate("DiagnosticDetails")
  }

  var handleTestChange = (data) => {
    if (data[0].selected)
      setTest("Pcr")
    if (data[1].selected)
      setTest("RapideAc")
    if (data[2].selected)
      setTest("RapideAg")
    if (data[3].selected)
      setTest("Serologie")
    setResultat("Positif")
    setDatePr()
  }
  var handleTypeChange = (data) => {
    if (data[0].selected)
      setType(data[0].label)
    if (data[1].selected)
      setType(data[1].label)
    if (data[2].selected)
      setType(data[2].label)
    if (data[3].selected)
      setType(data[3].label)
  }

  var handleResulat1Change = (data) => {
    if (data[0].selected)
      setResultat(data[0].label)
    if (data[1].selected)
      setResultat(data[1].label)
    if (data[2].selected)
      setResultat(data[2].label)
  }
  var handleResultatChange = (data) => {
    if (data[0].selected)
      setResultat(data[0].label)
    if (data[1].selected)
      setResultat(data[1].label)

  }

  return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>




      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Confirmation diagnostique</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>


      <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Type de confirmation ?</Text>
      <RadioGroup radioButtons={[
        {
          label: 'PCR',
          color: '#51d1c5',

        },
        {
          label: 'Test rapide AC',
          color: '#51d1c5',
        },
        {
          label: 'Test rapide AG',
          color: '#51d1c5',
        },
        {
          label: 'Sérologie',
          color: '#51d1c5',
        },

      ]}
        //flexDirection='row'
        style={tailwind('')}
        onPress={handleTestChange}
      />

      {test === "Pcr" && <View style={tailwind("items-center py-6")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(datePr != undefined && datePr) || "Date de prise ?"}
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
        <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Type ?</Text>
        <RadioGroup radioButtons={[
          {
            label: 'Nasopharyngé',
            color: '#51d1c5',

          },
          {
            label: 'Aspiration trachéale',
            color: '#51d1c5',
          },
          {
            label: 'Sanguin',
            color: '#51d1c5',
          },
          {
            label: 'Selle ou pvt rectal',
            color: '#51d1c5',
          },

        ]}
          //flexDirection='row'
          style={tailwind('')}
          onPress={handleTypeChange}
        />

        <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Resultat ?</Text>
        <RadioGroup radioButtons={[
          {
            label: 'Positif',
            color: '#51d1c5',

          },
          {
            label: 'Negatif',
            color: '#51d1c5',
          },
          {
            label: 'Douteux',
            color: '#51d1c5',
          },


        ]}
          flexDirection='row'
          style={tailwind('')}
          onPress={handleResulat1Change}
        />
      </View>

      }
      {test === "RapideAc" && <View style={tailwind("items-center py-6")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(datePr != undefined && datePr) || "Date de prise ?"}
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
        <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Resultat ?</Text>
        <RadioGroup radioButtons={[
          {
            label: 'Positif',
            color: '#51d1c5',

          },
          {
            label: 'Negatif',
            color: '#51d1c5',
          },



        ]}
          flexDirection='row'
          style={tailwind('')}
          onPress={handleResultatChange}
        />
      </View>

      }
      {test === "RapideAg" && <View style={tailwind("items-center py-6")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(datePr != undefined && datePr) || "Date de prise ?"}
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
        <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Resultat ?</Text>
        <RadioGroup radioButtons={[
          {
            label: 'Positif',
            color: '#51d1c5',

          },
          {
            label: 'Negatif',
            color: '#51d1c5',
          },



        ]}
          flexDirection='row'
          style={tailwind('')}
          onPress={handleResultatChange}
        />
      </View>
      }
      {test === "Serologie" && <View style={tailwind("items-center py-6")}>
        <DatePicker
          style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
          mode="date"
          placeholder={(datePr != undefined && datePr) || "Date de prise ?"}
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
        <Text style={tailwind(" text-gray-700 text-center pt-8 pb-2")}>Resultat ?</Text>
        <RadioGroup radioButtons={[
          {
            label: 'Positif',
            color: '#51d1c5',

          },
          {
            label: 'Negatif',
            color: '#51d1c5',
          },



        ]}
          flexDirection='row'
          style={tailwind('')}
          onPress={handleResultatChange}
        />
      </View>
      }
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("DiagnosticDetails") }} />
          <FormButton title="Ajouter" onPress={handleSubmit} />
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
  //login: actions.login,
  //logout:actions.logout
  addConfDiag: actions.addConfDiag
};
export default connect(mapStateToProps, mapActionToProps)(ConfirmationDiag);
