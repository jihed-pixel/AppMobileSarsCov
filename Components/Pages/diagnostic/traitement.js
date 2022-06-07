import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import RadioGroup from 'react-native-radio-buttons-group';
import FormInput from '../../Form/FormInput';
import DatePicker from 'react-native-datepicker'
import FormButton from '../../Form/FormButton';
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import 'localstorage-polyfill';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Traitement = (props) => {
  useEffect(() => {
    props.getTraitment(props.patientList["cin"], {
      trai: trai
    })
   if ( props.traitmentList !=null &&typeof(props.traitmentList)!=="string"&& props.traitmentList["dateD"] !== null &&   props.traitmentList["dateD"] !== undefined &&oper === "M") setDateD(props.traitmentList["dateD"].slice(0, 10))
    //else setDateD()
    //if (typeof(props.traitmentList)!=="string"&& props.traitmentList["dateF"] !== null && oper === "M") setDateF(props.traitmentList["dateF"].slice(0, 10))
    //else setDateF()
  })

  const [oldPactt, setOldPactt] = useState(true)
  const [pactt, setPactt] = props.patientList["traitement"]["pactt"] !== null   && props.patientList["traitement"]["pactt"] !== undefined&& props.patientList["traitement"]["pactt"] !== undefined ? useState(props.patientList["traitement"]["pactt"]) : useState("Bras 1")
  const [type, setType] = useState("M")
  const [trai, setTrai] = useState("Lopinavir/ritonavir")
  const [oper, setOper] = useState("A")
  const [dateD, setDateD] = useState()
  const [dateF, setDateF] = useState()
  const [autreBox, setAutreBox] = useState(trai === "Autre")
  const [dosage, setDosage] =  useState()

  //formValidation
  const [validation, setValidation] = useState()



  var handlePacttChange = (data) => {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].selected) { setPactt(data[i].label) }

    }
  }

  var handleOperChange = (data) => {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].selected) { setOper(data[i].label[0]); setDateF(); setDateD(); }

      if (data[i].label[0]==="M" && typeof(props.traitmentList)!=="string"&& props.traitmentList["dosage"] !== null  && props.traitmentList["dosage"] !== undefined)
       {setDosage(props.traitmentList["dosage"])}

    }
  }
  var handleTypeChange = (data) => {
    /* var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].selected) { setType(data[i].label.charAt(0)) ;  }

    }*/
    if (data[0].selected) {
      setType("M"); setTrai("Lopinavir/ritonavir"); setDateD(); setDateF()
    }
    if (data[1].selected) {
      setType("P"); setTrai("O2"); setDateD(); setDateF()
    }
    if (data[2].selected) {
      setType("A"); setTrai("Amoxicilline/Acide clavunique"); setDateD(); setDateF()
    }
  }

  var handlePacttChange = (data) => {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].selected) { setPactt(data[i].label) }

    }
  }
  var handleTraiChange = (data) => {
    var i;
    for (i = 0; i < data.length; i++) {
      setDateF()
      setDateD()
      if (data[i].selected) {
        setTrai(data[i].label);

        if (data[i].label == "Autre") { setAutreBox(true); setTrai() }
        else setAutreBox(false)
        props.getTraitment(props.patientList["cin"], {
          trai: trai
        })
      }

    }
  }

  //SubmitFunction
  var handleSUbmit = () => {
    var values = {
      dosage: dosage,
      dateD: dateD,
      dateF: dateF,
      trai: trai,
      pactt:pactt
    }
    console.log(values)
     if(trai ===undefined)
     { setValidation("Veuillez choisir un traitment") ;return;}
      if(dosage ===undefined)
      {setValidation("Veuillez precisier un dosage");return}
      if(dateD ===undefined)
     { setValidation("La date de debut de traitement est obligatoire");return}
     setValidation()

    props.addTraitment(props.patientList["cin"], values)
    props.navigation.navigate("DiagnosticDetails")

  }

  return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
    <ScrollView>
      <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Traitement</Text>
      <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
      {validation !== undefined && <Text style={tailwind("text-center font-bold text-red-500")}>{validation}</Text>}
      <Text style={tailwind('text-gray-700 pt-8  pl-4 text-center pb-4')}>Participation au projet PACTT ?</Text>
      {props.patientList["traitement"]["pactt"] !== null && props.patientList["traitement"]["pactt"] !== undefined&& oldPactt === true && <View style={styles.row}>
        <Text style={tailwind("text-gray-700 font-bold")}> {props.patientList["traitement"]["pactt"]}</Text>
        <TouchableOpacity onPress={() => setOldPactt(false)}>
          <Text style={tailwind("text-teal-500 pl-16 ")}>Modifier ?</Text>
        </TouchableOpacity>
      </View>

      }
      {(props.patientList["traitement"]["pactt"] == null && props.patientList["traitement"]["pactt"] == undefined  || oldPactt === false) &&
        <RadioGroup radioButtons={[

          {
            label: "Bras 1",
            color: '#51d1c5',
          },
          {
            label: "Bras 2",
            color: '#51d1c5',
          },
          {
            label: "Non",
            color: '#51d1c5',
          },


        ]}
          flexDirection='row'
          style={tailwind('')}
          onPress={handlePacttChange}
        />}

      <View style={tailwind("py-12")}>
        <Text style={tailwind('text-gray-700  text-center pb-4')}>Modifier ajouter les traitements</Text>
        <RadioGroup radioButtons={[

          {
            label: "Molécules",
            color: '#51d1c5',
          },
          {
            label: "Prise en charge standard",
            color: '#51d1c5',
          },
          {
            label: "Antibiothérapie",
            color: '#51d1c5',
          },


        ]}
          //flexDirection='row'
          onPress={handleTypeChange}
        />
        <Text style={tailwind('text-gray-700  text-center p-4')}> Lequel/Laquelle ?</Text>
        {
          type === "M" && <RadioGroup radioButtons={[

            {
              label: "Lopinavir/ritonavir",
              color: '#51d1c5',
            },
            {
              label: "Chloroquine phosphate",
              color: '#51d1c5',
            },
            {
              label: "Hydroxy-Chloroquine",
              color: '#51d1c5',
            },
            {
              label: "Azithromycine",
              color: '#51d1c5',
            },
            {
              label: "Remdesivir",
              color: '#51d1c5',
            },
            {
              label: "Autre",
              color: '#51d1c5',
            },


          ]}
            //flexDirection='row'
            onPress={handleTraiChange}
          />
        }

        {
          type === "P" && <RadioGroup radioButtons={[

            {
              label: "O2",
              color: '#51d1c5',
            },
            {
              label: "HFNC",
              color: '#51d1c5',
            },
            {
              label: "CPAP",
              color: '#51d1c5',
            },
            {
              label: "VNI",
              color: '#51d1c5',
            },
            {
              label: "VMI",
              color: '#51d1c5',
            },
            {
              label: "Paracétamol",
              color: '#51d1c5',
            },
            {
              label: "Anti coaguant",
              color: '#51d1c5',
            },
            {
              label: "H2O",
              color: '#51d1c5',
            },
            {
              label: "ADO",
              color: '#51d1c5',
            },
            {
              label: "Insulinothérapie",
              color: '#51d1c5',
            },
            {
              label: "Nébulisation corticoides",
              color: '#51d1c5',
            },
            {
              label: "Nébulisation bronchodilateurs",
              color: '#51d1c5',
            },

          ]}
            //flexDirection='row'
            onPress={handleTraiChange}
          />
        }
        {
          type === "A" && <RadioGroup radioButtons={[

            {
              label: "Amoxicilline/Acide clavunique",
              color: '#51d1c5',
            },
            {
              label: "Cefotaxime",
              color: '#51d1c5',
            },
            {
              label: "Ceftriaxone",
              color: '#51d1c5',
            },

            {
              label: "Autre",
              color: '#51d1c5',
            },


          ]}
            //flexDirection='row'
            onPress={handleTraiChange}
          />
        }
        {autreBox === true && <View style={tailwind("items-center")}>
          <FormInput placeholder="Autre traitement ..." onChangeText={setTrai} />
        </View>}
        <Text style={tailwind('text-gray-700  text-center p-4')}> Choisir l'opération ?</Text>
        <RadioGroup radioButtons={[

          {
            label: "Ajouter Autre",
            color: '#51d1c5',
          },

          {
            label: "Modifier date fin",
            color: '#51d1c5',
          },
        ]}
          //flexDirection='row'
          onPress={handleOperChange}
        />
        {
          (oper === "A") && <View style={tailwind("items-center ")}>
            <FormInput placeholder={"Dosage"} onChangeText={setDosage}  />
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={(dateD !== undefined && dateD) || "Date de debut"}
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
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4 ")}
              mode="date"
              placeholder={(dateF !== undefined && dateF) || "Date de fin"}
              format="YYYY-MM-DD"
              minDate="1920-05-01"
              // maxDate={new Date()}
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
          </View>
        }
        {
          oper === "M" && typeof (props.traitmentList) === "string" && <Text style={tailwind("text-center py-4 font-bold  text-red-500")}>{"Aucun traitement " + trai + " trouvé , Veuillez ajouter autre !"}</Text>
        }
        {
          oper === "M" && typeof (props.traitmentList) !== "string" && props.traitmentList !== null && <View style={tailwind("items-center")}>
            <FormInput placeholder={"Doage/Debit:" + props.traitmentList["dosage"]} editable="false" />
            <DatePicker
              style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
              mode="date"
              placeholder={props.traitmentList["dateD"] !== null  && props.traitmentList["dateD"] !== undefined  && props.traitmentList["dateD"].slice(0, 10) || "Date de debut"}
              format="YYYY-MM-DD"
              minDate="1920-05-01"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              disabled="true"
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
              placeholder={dateF!==undefined && dateF ||(props.traitmentList["dateF"] !== null  && props.traitmentList["dateF"] !== undefined&& oper==="M" && props.traitmentList["dateF"].slice(0, 10)) ||  "Date fin"}
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
          </View>
        }
      </View>
      <View style={tailwind("items-center")}>
        <View style={styles.row}>
          <FormButton title="Retour" onPress={() => props.navigation.navigate("DiagnosticDetails")} />
          <FormButton title="Enregistrer" onPress={handleSUbmit} />
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
  traitmentList: state.medicalService.traitmentList
});
const mapActionToProps = {
  getTraitment: actions.getTraitment,
  addTraitment: actions.addTraitment

};
export default connect(mapStateToProps, mapActionToProps)(Traitement);
