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
import * as actions from "../../../Actions/medicalService";
import 'localstorage-polyfill';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';
import FormInput from '../../Form/FormInput';
import DatePicker from 'react-native-datepicker'
import DatePicker1 from'@react-native-community/datetimepicker';
import FormButton from '../../Form/FormButton';
import { medicalService } from '../../../Reducers/medicalService';
import {LinearGradient} from 'expo-linear-gradient';
import { connect } from "react-redux";

const Exposition1 = (props) => {
  const { colors } = useTheme();


  //component test variable
  const [sejour, setSejour] = useState(false)
  const [arivee, setArivee] = useState(false)
  const [parcours, setParcours] = useState(false)
  const [etroit, setEtoit] = useState(false)
  const [autres, setAutres] = useState(false)
  const [quarantine, setQurarantine] = useState(false)
  //checkbox variable
  const [contactC, setContactC] = useState("Oui")
  const [autreBox, setAutreBox] = useState("Oui")
  const [miseQuarantine, setMiseQuarantine] = useState("Oui")

  //values
  //Sejour /Transit component
  const [habite, setHabite] = useState(true)
  const [dateD, setDateD] = useState()
  const [dateF, setDateF] = useState()
  const [villes, setVilles] = useState()
  //arivee en tunisie
  const [dateEnt, setDateEnt] = useState()
  const [lieuEnt, setLieuEnt] = useState()
  const [moyensTran, setMoyensTran] = useState()
  //parcours en Tunise
  const [villesPar, setVillesPar] = useState()
  const [dateV1, setDateV1] = useState()
  const [moyenTranV1, setMoyenTranV1] = useState()
  const [dateV2, setDateV2] = useState()
  const [moyenTranV2, setMoyenTranV2] = useState()
  const [moyenTranQu, setMoyenTranQu] = useState()
  //contact etroit
  const [idTun, setIdTun] = useState(0)
  const [dateDebutC, setDateDebutC] = useState()
  const [dateFinC, setDateFinC] = useState()
  //Autres criteres ayant conduit

  const [details, setDetails] = useState()
  //mise en quarantine
  const [dateDQu, setDateDQu] = useState()
  const [dateFDQu, setDateFQu] = useState()
  const [respect, setRespect] = useState(true)

  //values handleChange functions
  //sejour/transit values
  var habiteHandleChange = (data) => {
    if (data[0].selected)
      setHabite(true)
    if (data[1].selected)
      setHabite(false)
  }
  var handleVillesChange = (text) => {
    setVilles(text)
  }
  //arrivee values
  var handleLieuEnt = (text) => {
    setLieuEnt(text)
  }
  var handletMoyensTran = (text) => {
    setMoyensTran(text)
  }
  //parcours en Tunisie
  var handleVillesPar = (text) => {
    setVillesPar(text)
  }
  var handleMoyenTranV1 = (text) => {
    setMoyenTranV1(text)
  }
  var handleMoyenTranV2 = (text) => {
    setMoyenTranV2(text)
  }
  var handleMoyenTranQu = (text) => {
    setMoyenTranQu(text)
  }
  //contact etroit
  var handleIdTun = (text) => {
    setIdTun(text)
  }
  //AUtres criteres

  var handleDetailsChange = (text) => {
    setDetails(text)
  }
  //Mise en quarantine
  var handleRespectChange = (data) => {
    if (data[0].selected)
      setRespect(true)
    else setRespect(false)
  }

  var handleSejourChange = () => {
    setSejour(!sejour)
  }
  var handleAriveeChange = () => {
    setArivee(!arivee)
  }
  var handleParousChange = () => {
    setParcours(!parcours)
  }
  var handleEtroitChange = () => {
    setEtoit(!etroit)
  }
  var handleAutresChange = () => {
    setAutres(!autres)
  }
  var handleQuarantineChange = () => {
    setQurarantine(!quarantine)
  }
  var handleContactCChange = (data) => {
    if (data[0].selected)
      setContactC("Oui")

    if (data[1].selected)
      setContactC("Non")
    if (data[2].selected)
      setContactC("Ne sait pas")
  }
  var handleAutreBoxChange = (data) => {
    if (data[0].selected)
      setAutreBox("Oui")
    if (data[1].selected)
      setAutreBox("Non")
    if (data[2].selected)
      setAutreBox("NSP")
  }
  var handleMiseQuarantineChange = (data) => {
    if (data[0].selected)
      setMiseQuarantine("Oui")
    else setMiseQuarantine("Non")
  }

  //submit function
  var handleSubmit = (e) => {
    e.preventDefault()
    var values = {
      //Sejour /transit
      habite: habite,
      dateD: dateD,
      dateF: dateF,
      villes: villes,
      // Arivee
      dateEnt: dateEnt,
      lieuEnt: lieuEnt,
      moyensTran: moyensTran,
      // parcours en tunisie
      villesPar: villesPar,
      dateV1: dateV1,
      dateV2: dateV2,
      moyenTranV1: moyenTranV1,
      moyenTranV2: moyenTranV2,
      moyenTranQu: moyenTranQu,

      //contact etroit
      contact: contactC,
      idTun: idTun,
      dateDebutC: dateDebutC,
      dateFinC: dateFinC,

      //autre critere
      autre: autreBox,
      details: details,

      //mise en quarantine
      dateDQu: dateDQu,
      dateFDQu: dateFDQu,
      respect: respect


    }
    console.log(values)

    props.addExposition(props.patientList["cin"], values)
    props.navigation.navigate("AddAntecendentsMedicaux1")
  }
  return (
<ScrollView  >
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Expositions ?? Risque</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >

      <View style={tailwind(' items-center ')} >


        <View style={tailwind('py-8 px-8')}>
          <TouchableOpacity onPress={handleSejourChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>S??jour ou transit dans une zone a risque</Text>
          </TouchableOpacity>
          {sejour == true && <View style={tailwind('items-center ')}>
            <Text style={tailwind('text-gray-700 py-2')}>
              R??side habituellement dans la zone a risque  ?
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
              onPress={habiteHandleChange}
            />
            <Text>S??jour ou transit dans zone risque ?</Text>
            <DatePicker1 style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}  
            mode="date"
            placeholder={(dateD != undefined && dateD) || "Du ?"}
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
            value={new Date()}/>
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateD != undefined && dateD) || "Du ?"}
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
              onDateChange={(date) => { setDateD(date) }}
            />

            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateF != undefined && dateF) || "Au ?"}
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
              onDateChange={(date) => { setDateF(date) }}
            />
            <FormInput
              placeholder="Villes Visit??es"
              onChangeText={handleVillesChange}
            />
          </View>
          }

          <TouchableOpacity onPress={handleAriveeChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Ariv??e sur le territoire tunisien </Text>
          </TouchableOpacity>
          {arivee == true && <View style={tailwind("items-center")}>
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateEnt != undefined && dateEnt) || "Date d'arriv??e en Tunisie?"}
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

            <FormInput placeholder="Lieu d'entr??e" onChangeText={handleLieuEnt} />
            <FormInput placeholder="Moyen de transport" onChangeText={handletMoyensTran} />
          </View>}
          <TouchableOpacity onPress={handleParousChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Parcours en Tunisie</Text>
          </TouchableOpacity>
          {(parcours == true) && <View style={tailwind("items-center")}>
            <FormInput placeholder="Villes visit??s en Tunisie" onChangeText={handleVillesPar} />
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
              mode="date"
              placeholder={(dateV1 != undefined && dateV1) || "Date d'arriv??e ville 1"}
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
              onDateChange={(date) => { setDateV1(date) }}
            />
            <FormInput placeholder="Moyens de transport" onChangeText={handleMoyenTranV1} />

            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 ")}
              mode="date"
              placeholder={(dateV2 != undefined && dateV2) || "Date d'arriv??e ville2"}
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
              onDateChange={(date) => { setDateV2(date) }}
            />
            <FormInput placeholder="Moyens de transport" onChangeText={handleMoyenTranV2} />
            <FormInput placeholder="Moyen de transport quotidien" onChangeText={handleMoyenTranQu} />

          </View>}
          <TouchableOpacity onPress={handleEtroitChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Contact ??troit</Text>
          </TouchableOpacity>
          {
            (etroit == true) && (<View style={tailwind("items-center")}>
              <Text style={tailwind('text-gray-700 py-2')}>
                Contact avec un cas confirm?? ou suspect ?
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
                {
                  label: "Ne sait pas",
                  color: '#51d1c5',
                }
              ]}
                flexDirection='row'
                style={tailwind('')}
                onPress={handleContactCChange}
              />


            </View>
            )}
          {(contactC === "Oui" && etroit == true) && (<View style={tailwind("items-center")}>

            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateDebutC != undefined && dateDebutC) || "Du ?"}
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
              onDateChange={(date) => { setDateDebutC(date) }}
            />

            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateFinC != undefined && dateFinC) || "Au ?"}
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
              onDateChange={(date) => { setDateFinC(date) }}
            />
            <FormInput placeholder="Identifiant en Tunisie" type="number-pad" onChangeText={handleIdTun} />
          </View>)}

          <TouchableOpacity onPress={handleAutresChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Autres crit??res ayant conduit au classement en cas possible</Text>
          </TouchableOpacity>
          {(autres == true) && <View style={tailwind("items-center")}>

            <RadioGroup radioButtons={[
              {
                label: 'Oui',
                color: '#51d1c5',

              },
              {
                label: 'Non',
                color: '#51d1c5',
              },
              {
                label: 'NSP',
                color: '#51d1c5',
              },
            ]}
              flexDirection='row'
              style={tailwind('')}
              onPress={handleAutreBoxChange}
            />
            {autreBox === "Oui" && <FormInput placeholder="Pr??cisier" onChangeText={handleDetailsChange} />}


          </View>}
          <TouchableOpacity onPress={handleQuarantineChange}>
            <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Mise en quarantine</Text>
          </TouchableOpacity>
          {(quarantine == true) && <View style={tailwind("items-center")}>

            <Text style={tailwind('text-gray-700 py-2')}>
              Mise en quarantine ?
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
              onPress={handleMiseQuarantineChange}
            />

          </View>}
          {(quarantine == true && miseQuarantine === "Oui") && <View style={tailwind('items-center')}>
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 my-4 ")}
              mode="date"
              placeholder={(dateDQu != undefined && dateDQu) || "Du ?"}
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
              onDateChange={(date) => { setDateDQu(date) }}
            />

            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 my-4")}
              mode="date"
              placeholder={(dateFDQu != undefined && dateFDQu) || "Au ?"}
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
              onDateChange={(date) => { setDateFQu(date) }}
            />

            <Text style={tailwind('text-gray-700 py-2')}>
              Respect de la quarantine ?
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
              onPress={handleRespectChange}
            />

          </View>}
        </View>
      </View>
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => { props.navigation.navigate("AddPatient") }} />
          <FormButton title="Suivant" onPress={handleSubmit} />
        </View>
        <FormButton title="Pass" onPress={() => { props.navigation.navigate("AddAntecendentsMedicaux1") }} />

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
  //loggedUser: state.medicalService.loggedUser,
  patientList: state.medicalService.patientList
});
const mapActionToProps = {
  //login: actions.login,
  addExposition: actions.addExposition
};
export default connect(mapStateToProps, mapActionToProps)(Exposition1);
