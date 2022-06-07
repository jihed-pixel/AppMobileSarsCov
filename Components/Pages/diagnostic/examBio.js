import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import * as DocumentPicker from 'expo-document-picker'
import FormInput from '../../Form/FormInput';
import apiMedicalService from "../../../Actions/apiMedicalService";
import {LinearGradient} from 'expo-linear-gradient';



const ExamBio = (props) => {
  const [type, setType] = useState("NFS")
  const [datePr, setDatePr] = useState();
  //NFS
  const [gb, setGb] = useState()
  const [lym, setLym] = useState()
  const [pla, setPla] = useState()
  const [hb, setHb] = useState()
  const [ht, setHt] = useState()
  //BIlan renal
  const [creat, setCreat] = useState()
  const [clairCreat, setClairCreat] = useState()
  const [uree, setUree] = useState()

  //Bilan hepatique
  const [biliru, setBiliru] = useState()
  const [biliru1, setBiliru1] = useState()
  const [alat, setAlat] = useState()
  const [asat, setAsat] = useState()
  const [tp, setTp] = useState()
  const [facteurV, setFacteurV] = useState()
  const [fibrinogene, setFibrinogene] = useState()
  const [cpk_mb, setCpk_mb] = useState()
  const [troponine, setTroponine] = useState()
  const [pro_bnp, setPro_bnp] = useState()
  const [albumi, setAlbumi] = useState()
  const [d_dimère, setD_dimère] = useState()
  const [ldh, setLdh] = useState()
  const [crp, setCrp] = useState()
  const [procal, setProcal] = useState()
  const [ferri, setFerri] = useState()
  //GDSA
  const [ph, setPh] = useState()
  const [pao2, setPao2] = useState()
  const [paco2, setPaco2] = useState()
  const [hco3_, setHco3_] = useState()
  const [sao2, setSao2] = useState()

  //ionogramme
  const [nak, setNak] = useState()
  const [nak1, setNak1] = useState()
  const [nakUr, setNakUr] = useState()
  const [nakUr1, setNakUr1] = useState()
  //Autre
  const [fileName, setFileName] = useState()
  const [file, setFile] = useState()
  // controle de saisie
  const [test, setTest] = useState()

  var handleFileUpload = async () => {
  	    let res = await DocumentPicker.getDocumentAsync({});
  		  alert(res.uri);
        console.log(res);
        setFileName(res.name)
        setFile(res)
  	}


  var handleSubmit = () => {
    var values = {
      datePr: datePr,
      type: type,
      gb: gb,
      lym: lym,
      pla: pla,
      hb: hb,
      ht: ht,
      creat: creat,
      clairCreat: clairCreat,
      uree: uree,
      ph: ph,
      paco2: paco2,
      pao2: pao2,
      hco3_: hco3_,
      sao2: sao2,
      nak: nak,
      nak1: nak1,
      nakUr: nakUr,
      nakUr1: nakUr1,
      biliru: biliru,
      biliru1: biliru1,
      alat: alat,
      asat: asat,
      tp: tp,
      facteurV: facteurV,
      fibrinogene: fibrinogene,
      cpk_mb: cpk_mb,
      troponine: troponine,
      pro_bnp: pro_bnp,
      albumi: albumi,
      d_dimère: d_dimère,
      ldh: ldh,
      crp: crp,
      procal: procal,
      ferri: ferri


    }
    //console.log(values)
    props.addExamBio(props.patientList["cin"], values)
    props.navigation.navigate("DiagnosticDetails")

  }

  var handleSUbmitAutre = () => {
    if (file === undefined) { setTest("Veuillez selectionner un fichier"); return }
    const uri = file.uri
    const name = file.name
    const type = file.type
    const uploadFile = {
      uri,
      name,
      type
    }
    console.log(uploadFile)
    const formData = new FormData();
    formData.append("file", uploadFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    apiMedicalService.medicalService().uploadFileExamBio(props.patientList["cin"], formData).then((res) => { props.navigation.navigate("DiagnosticDetails") }).catch(err => console.log(err))

  }

  var handleTypeChange = (data) => {
    if (data[0].selected)
      setType("NFS")
    if (data[1].selected)
      setType("BilanRenal")
    if (data[2].selected)
      setType("BilanHepa")
    if (data[3].selected)
      setType("GDSA")
    if (data[4].selected)
      setType("Ionogra")
    if (data[5].selected)
      setType("Autre")
    setDatePr()

  }

  return (

<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>

      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Examens Biologiques</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
      <View style={tailwind("items-center")}>
        <RadioGroup radioButtons={[

          {
            label: "NFS",
            color: '#51d1c5',
          },
          {
            label: "Bilan renal",
            color: '#51d1c5',
          },
          {
            label: "Bilan hepatique",
            color: '#51d1c5',
          },
          {
            label: "GDSA",
            color: '#51d1c5',
          },
          {
            label: "Ionogramme",
            color: '#51d1c5',
          },
          {
            label: "Autres",
            color: '#51d1c5',
          },

        ]}
          //flexDirection='row'
          style={tailwind('')}
          onPress={handleTypeChange}
        />
      </View>

      <Text style={tailwind("text-center text-red-500 py-4")}>{test !== undefined && test}</Text>


      {
        type === "NFS" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormInput placeholder="GB" onChangeText={setGb} type="decimal-pad" />
          <FormInput placeholder="Lymphocyte" onChangeText={setLym} type="decimal-pad" />
          <FormInput placeholder="Plaquette" onChangeText={setPla} type="decimal-pad" />
          <FormInput placeholder="Hb" onChangeText={setHb} type="decimal-pad" />
          <FormInput placeholder="Ht" onChangeText={setHt} type="decimal-pad" />
          <FormButton title="Enregitrer" onPress={handleSubmit} type="decimal-pad" />

        </View>
      }
      {
        type === "BilanRenal" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormInput placeholder="Creat" onChangeText={setCreat} type="decimal-pad" />
          <FormInput placeholder="Clairance de la creat" onChangeText={setClairCreat} type="decimal-pad" />
          <FormInput placeholder="Urée" onChangeText={setUree} type="decimal-pad" />
          <FormButton title="Enregitrer" onPress={handleSubmit} />
        </View>
      }
      {
        type === "GDSA" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormInput placeholder="pH" onChangeText={setPh} type="decimal-pad" />
          <FormInput placeholder="PaO2" onChangeText={setPao2} type="decimal-pad" />
          <FormInput placeholder="PaCO2" onChangeText={setPaco2} type="decimal-pad" />
          <FormInput placeholder="HCO3-" onChangeText={setHco3_} type="decimal-pad" />
          <FormInput placeholder="SaO2" onChangeText={setSao2} type="decimal-pad" />
          <FormButton title="Enregitrer" onPress={handleSubmit} />

        </View>
      }
      {
        type === "BilanHepa" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormInput placeholder="Bilirubine (T)" onChangeText={setBiliru} type="decimal-pad" />
          <FormInput placeholder="Bilirubine (D)" onChangeText={setBiliru1} type="decimal-pad" />
          <FormInput placeholder="ALAT" onChangeText={setAlat} type="decimal-pad" />
          <FormInput placeholder="ASAT" onChangeText={setAsat} type="decimal-pad" />
          <FormInput placeholder="TP" onChangeText={setTp} type="decimal-pad" />
          <FormInput placeholder="Facteur V" onChangeText={setFacteurV} type="decimal-pad" />
          <FormInput placeholder="Fibrinogene" onChangeText={setFibrinogene} type="decimal-pad" />
          <FormInput placeholder="CPK-MB" onChangeText={setCpk_mb} type="decimal-pad" />
          <FormInput placeholder="Troponine" onChangeText={setTroponine} type="decimal-pad" />
          <FormInput placeholder="Pro BNP" onChangeText={setPro_bnp} type="decimal-pad" />
          <FormInput placeholder="ALbuminémie" onChangeText={setAlbumi} type="decimal-pad" />
          <FormInput placeholder="D-Dimère" onChangeText={setD_dimère} type="decimal-pad" />
          <FormInput placeholder="LDH" onChangeText={setLdh} type="decimal-pad" />
          <FormInput placeholder="CRP" onChangeText={setCrp} type="decimal-pad" />
          <FormInput placeholder="Procalcitonine" onChangeText={setProcal} type="decimal-pad" />
          <FormInput placeholder="FErritinemie" onChangeText={setFerri} type="decimal-pad" />
          <FormButton title="Enregitrer" onPress={handleSubmit} />


        </View>
      }
      {
        type === "Ionogra" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormInput placeholder="Na+" onChangeText={setNak} type="decimal-pad" />
          <FormInput placeholder="K+" onChangeText={setNak1} type="decimal-pad" />
          <FormInput placeholder="Na+ urinaire" onChangeText={setNakUr} type="decimal-pad" />
          <FormInput placeholder="K+ urinaire" onChangeText={setNakUr1} type="decimal-pad" />
          <FormButton title="Enregitrer" onPress={handleSubmit} />

        </View>
      }
      {
        type === "Autre" && <View style={tailwind("items-center py-12")}>
          <DatePicker
            style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500  ")}
            mode="date"
            placeholder={(datePr != undefined && datePr) || "Date de prise de l'examen"}
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
          <FormButton title={fileName !== undefined && fileName.substr(0, 120) || "UPload file"} onPress={handleFileUpload} />
          <FormButton title="Enregistrer" onPress={handleSUbmitAutre} />
        </View>
      }
      <View style={tailwind("items-center py-12")}>
        <FormButton title="Retour" onPress={() => props.navigation.navigate("DiagnosticDetails")} />

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
  addExamBio: actions.addExamBio
};
export default connect(mapStateToProps, mapActionToProps)(ExamBio);
