import { 
  View, 
  Text, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import { connect } from "react-redux";
//import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';


const ConfirmationDiag1 = (props) => {
  const { colors } = useTheme();
  const [test, setTest] = useState("Pcr")
  const [datePr, setDatePr] = useState()
  const [type, setType] = useState("Nasopharyng√©")
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
    props.navigation.navigate("Admission1")
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
<ScrollView  >
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Confirmation diagnostique</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >






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
          label: 'S√©rologie',
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
            label: 'Nasopharyng√©',
            color: '#51d1c5',

          },
          {
            label: 'Aspiration trach√©ale',
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
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("HabitudesDeVie1") }} />
          <FormButton title="Suivant" onPress={handleSubmit} />
        </View>
        <FormButton title="Pass" onPress={() => { props.navigation.navigate("Admission1") }} />

      </View>
      </Animatable.View>
      </View>
      </ScrollView>
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
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      marginTop: Platform.OS === 'ios' ? 0 : 39,
      fontSize: 25
  },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
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
export default connect(mapStateToProps, mapActionToProps)(ConfirmationDiag1);
