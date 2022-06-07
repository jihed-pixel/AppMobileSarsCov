import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../../Form/FormButton";
import FormInput from "../../Form/FormInput";
import FormInput2 from "../../Form/FormInput2";
import FormCheckBox from "../../Form/CheckBox";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import 'localstorage-polyfill';
import { ScrollView } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';
import {LinearGradient} from 'expo-linear-gradient';


const ExamenCliniques = (props) => {

    var handleExamOroChange = (newValue, text) => {
        if (newValue == true) setExamOro(examOro + " " + text)
        else setExamOro(examOro.replace(text + " ", ""))
        if (text === " Autre" && newValue == true) setAutreOro(true)
        if (text === " Autre" && newValue == false) setAutreOro(false)
    }

    var handleExamenOphtaChange = (newValue, text) => {
        if (newValue == true) setExamOphta(examOphta + " " + text)
        else setExamOphta(examOphta.replace(text + " ", ""))
        if (text === "Autre" && newValue == true) setAutreOphta(true)
        if (text === "Autre" && newValue == false) setAutreOphta(false)
    }


    var handleExamPulChange = (newValue, text) => {
        if (newValue == true) setExamPulmo(examPulmo + " " + text)
        else setExamPulmo(examPulmo.replace(text + " ", ""))
        if (text === "Autre" && newValue == true) setAutrePul(true)
        if (text === "Autre" && newValue == false) setAutrePul(false)
    }

    var handleExamCutChange = (newValue, text) => {
        if (newValue == true) setExamCut(examCut + " " + text)
        else setExamCut(examCut.replace(text + " ", ""))
        if (text === "Autre" && newValue == true) setAutreCut(true)
        if (text === "Autre" && newValue == false) setAutreCut(false)
    }

    var handleExamNeuroChange = (newValue, text) => {
        if (newValue == true) setExamNeuro(examNeuro + " " + text)
        else setExamNeuro(examNeuro.replace(text + " ", ""))
        if (text === "Autre" && newValue == true) setAutreNeuro(true)
        if (text === "Autre" && newValue == false) setAutreNeuro(false)
    }
    var handleExamenCarChange = (newValue, text) => {
        if (newValue == true) setExamCardio(examCardio + " " + text)
        else setExamCardio(examCardio.replace(text + " ", ""))
        if (text === "Autre" && newValue == true) setAutreCar(true)
        if (text === "Autre" && newValue == false) setAutreCar(false)
    }


    //component
    const [oro, setOro] = useState(false)
    const [pul, setPul] = useState(false)
    const [oph, setOph] = useState(false)
    const [cut, setCut] = useState(false)
    const [neu, setNeu] = useState(false)
    const [card, setCard] = useState(false)
    const [aut, setAut] = useState(false)
    //values
    const [temperature, setTemperature] = useState()
    const [fr, setFr] = useState()
    const [fc, setFc] = useState()
    const [sao2, setSao2] = useState()
    const [pa_sys, setPa_sys] = useState()
    const [pa_dya, setPa_dya] = useState()

    const [scoreGlas, setScoreGlas] = useState()
    const [scoreGlas1, setScoreGlas1] = useState()
    const [poids, setPoids] = useState()
    const [taille, setTaille] = useState()
    const [examOro, setExamOro] = useState("")
    const [examPulmo, setExamPulmo] = useState("Tirage intercostal")
    const [examOphta, setExamOphta] = useState("hyperhèmie conjonctivale unilatérale")
    const [examCut, setExamCut] = useState("Erruption maculo-papuleuse géneralisée")
    const [examNeuro, setExamNeuro] = useState("Désorientation temporo-spatiale")
    const [examCardio, setExamCardio] = useState("Assourdissement des bruits du coeur")
    const [autre, setAutre] = useState()
    //autre cb values values
    const [autreOro, setAutreOro] = useState(false)
    const [autrePul, setAutrePul] = useState(false)
    const [autreOphta, setAutreOphta] = useState(false)
    const [autreCut, setAutreCut] = useState(false)
    const [autreNeuro, setAutreNeuro] = useState(false)
    const [autreCar, setAutreCar] = useState(false)
    // autre inputVlaues
    const [autreInputOro, setAutreInputOro] = useState(false)
    const [autreInputPul, setAutreInputPul] = useState(false)
    const [autreInputOphta, setAutreInputOphta] = useState(false)
    const [autreInputCut, setAutreInputCut] = useState(false)
    const [autreInputNeuro, setAutreInputNeuro] = useState(false)
    const [autreInputCar, setAutreInputCar] = useState(false)


    // form validation
    const [validation, setValidation] = useState()

    var handleAutreChange = (text) => {
        setAutre(text)
    }
    //autrecb handle change functions
    var handleChangeAutreOro = (text) => {
        setAutreInputOro(text)
    }

    var handleChangeAutrePul = (text) => {
        setAutreInputPul(text)

    }
    var handleChangeAutreOpht = (text) => {
        setAutreInputOphta(text)
    }
    var handleChangeAutreCut = (text) => {
        setAutreInputCut(text)
    }
    var handleChangeAUtreNeu = (text) => {
        setAutreInputNeuro(text)
    }
    var handleChangeAutreCar = (text) => {
        setAutreInputCar(text)
    }
    //submit function
    var handleSubmit = () => {


        if (temperature > 43 || temperature < 30 || temperature === undefined) { setValidation("La temperature doit etre comprise entre 30et 43 °C"); return; }
        if (fr > 250 || fr < 0 || fr === undefined) { setValidation("La valuer du FR doit etre comprise entre 0 et 250 C/min !"); return }
        if (fc > 150 || fc < 0 || fc == undefined) { setValidation("La valeur du FC doit etre comprise entre 0 et 150 bpm"); return }
        if (sao2 > 100 || sao2 < 0 || sao2 === undefined) { setValidation("Le pourcentage de SaO2  doit etre compris entre 0 % et 100 % !"); return }
        if (pa_sys > 200 || pa_sys < 80 || pa_sys === undefined) { setValidation("La pression arterielle systolique doit ete comprise entre 80 et 200 !"); return }
        if (pa_dya > 200 || pa_dya < 80 || pa_dya === undefined) { setValidation("La pression arterielle systolique doit ete comprise entre 40 et 150!"); return }
        if (scoreGlas > 15 || scoreGlas < 0 || scoreGlas === undefined) { setValidation("Le score de Glasgow doit etre entre 0 et 15 !") }
        if (scoreGlas1 > 15 || scoreGlas1 < 0 || scoreGlas1 === undefined) { setValidation("Le score de Glasgow doit etre entre 0 et 15 !") }


        var x = examOro.replace("Autre", "Autre:" + autreInputOro)



        var values = {
            fr: fr,
            fc: fc,
            pa_sys: pa_sys,
            pa_dya: pa_dya,
            sao2: sao2,
            scoreGlas: scoreGlas,
            scoreGlas1: scoreGlas1,
            poids: poids,
            taille: taille,
            examOro: examOro.replace("Autre", "Autre:" + autreInputOro),
            examPulmo: examPulmo.replace("Autre", "Autre:" + autreInputPul),
            examOphta: examOphta.replace("Autre", "Autre:" + autreInputOphta),
            examCut: examCut.replace("Autre", "Autre:" + autreInputCut),
            examNeuro: examNeuro.replace("Autre", "Autre:" + autreInputNeuro),
            examCardio: examCardio.replace("Autre", "Autre:" + autreInputCar),
            autre: autre,
            temperature: temperature,
        }
        //console.log(values)
        props.addExamCli(props.patientList["cin"], values)
        props.navigation.navigate("DiagnosticDetails")
    }



    return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
        <ScrollView>
            <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Examen clinique a l'admission</Text>
            <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
            <View style={tailwind("items-center")}>
                <Text style={tailwind('text-red-500 py-2')}>{validation}</Text>
                <FormInput placeholder="Température en °C" type="decimal-pad" onChangeText={setTemperature} />
                <FormInput placeholder="FR  C/min" type="decimal-pad" onChangeText={setFr} />
                <FormInput placeholder="FC bpm" type="decimal-pad" onChangeText={setFc} />
                <FormInput placeholder="SaO2 %" type="decimal-pad" onChangeText={setSao2} />
                <FormInput2 placeholder1="PA systolique" placeholder2="PA diastolique" onChangeText1={setPa_sys} onChangeText2={setPa_dya} />
                <FormInput2 placeholder1="Score de Glasgow" placeholder2="15" onChangeText1={setScoreGlas} onChangeText2={setScoreGlas1} />
                <FormInput placeholder="Poids kg" type="decimal-pad" maxLength={Number("3")} onChangeText={setPoids} />
                <FormInput placeholder="Taille m" type="number-pad" onChangeText={setTaille}  maxLength={Number("3")}/>
            </View>
            <View style={tailwind("px-8 py-2 ")}>
                <TouchableOpacity onPress={() => setOro(!oro)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen oro-pharyngé
           </Text>
                </TouchableOpacity>
                {
                    oro === true &&
                    <View>
                        <FormCheckBox text='Gorge Rouge' value={false} onPress={handleExamOroChange} />
                        <FormCheckBox text="Hypertrophie des amygdales" value={false} onPress={handleExamOroChange} />
                        <FormCheckBox text="Anosmie" value={false} value={false} onPress={handleExamOroChange} />
                        <FormCheckBox text=" Agueusie" value={false} value={false} onPress={handleExamOroChange} />
                        <FormCheckBox text=" Autre" value={false} value={false} onPress={handleExamOroChange} />


                    </View>


                }
                {autreOro === true && oro === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAutreOro} /></View>}
                <TouchableOpacity onPress={() => setPul(!pul)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen pulmonaire
            </Text>
                </TouchableOpacity>
                {
                    pul === true &&
                    <View>
                        <FormCheckBox text="Tirage intercostal" value={false} onPress={handleExamPulChange} />
                        <FormCheckBox text="Tirage sus-sternal" value={false} onPress={handleExamPulChange} />
                        <FormCheckBox text="Silence auscultoire" value={false} onPress={handleExamPulChange} />
                        <FormCheckBox text="Hyper-sonorité" value={false} onPress={handleExamPulChange} />
                        <FormCheckBox text="Autre" value={false} onPress={handleExamPulChange} />
                    </View>

                }
                {autrePul === true && pul === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAutrePul} /></View>}
                <TouchableOpacity onPress={() => setOph(!oph)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen ophtalmologique
            </Text>
                </TouchableOpacity>
                {
                    oph === true &&
                    <View>
                        <FormCheckBox text="Hyperhèmie conjonctivale unilatérale" value={false} onPress={handleExamenOphtaChange} />
                        <FormCheckBox text="Hyperhèmie conjonctivale bilatérale" value={false} onPress={handleExamenOphtaChange} />
                        <FormCheckBox text="Autre" value={false} onPress={handleExamenOphtaChange} />
                    </View>
                }
                {autreOphta === true && oph === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAutreOpht} /></View>}
                <TouchableOpacity onPress={() => setCut(!cut)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen cutané
           </Text>
                </TouchableOpacity>
                {
                    cut === true && <View>
                        <FormCheckBox text="Erruption maculo-papuleuse géneralisée" value={false} onPress={handleExamCutChange} />
                        <FormCheckBox text="Erruption purpurique" value={false} onPress={handleExamCutChange} />
                        <FormCheckBox text="Engelure" value={false} onPress={handleExamCutChange} />
                        <FormCheckBox text="Autre" value={false} onPress={handleExamCutChange} />
                    </View>
                }
                {autreCut === true && cut === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAutreCut} /></View>}
                <TouchableOpacity onPress={() => setNeu(!neu)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen neurologique
           </Text>
                </TouchableOpacity>
                {
                    neu === true && <View>
                        <FormCheckBox text="Désorientation temporo-spatiale" value={false} onPress={handleExamNeuroChange} />
                        <FormCheckBox text="Agitation" value={false} onPress={handleExamNeuroChange} />
                        <FormCheckBox text="Trouble de comportement" value={false} onPress={handleExamNeuroChange} />
                        <FormCheckBox text="Autre" value={false} onPress={handleExamNeuroChange} />
                    </View>
                }
                {autreNeuro === true && neu === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAUtreNeu} /></View>}
                <TouchableOpacity onPress={() => setCard(!card)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Examen cardiovasculaire
           </Text>
                </TouchableOpacity>
                {
                    card === true &&
                    <View>
                        <FormCheckBox text="Assourdissement des bruits du coeur" value={false} onPress={handleExamenCarChange} />
                        <FormCheckBox text="Rythme cardiaque irrégulier" value={false} onPress={handleExamenCarChange} />
                        <FormCheckBox text="Souffre cardiaque si oui" value={false} onPress={handleExamenCarChange} />
                        <FormCheckBox text="Froideur des extrémités" value={false} onPress={handleExamenCarChange} />
                        <FormCheckBox text="Marbures aux genoux /generalisées" value={false} onPress={handleExamenCarChange} />
                        <FormCheckBox text="Autre" value={false} onPress={handleExamenCarChange} />
                    </View>

                }
                {autreCar === true && card === true && <View style={tailwind("items-center")}><FormInput placeholder="Autre" onChangeText={handleChangeAutreCar} /></View>}
                <TouchableOpacity onPress={() => setAut(!aut)}>
                    <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>
                        Autres éléments de l'examen physique
           </Text>
                </TouchableOpacity>
                {aut && <View style={tailwind("items-center")}><FormInput placeholder="Précisier" onChangeText={handleAutreChange} /></View>}

            </View>
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
    patientList: state.medicalService.patientList,
});
const mapActionToProps = {
    login: actions.login,
    logout: actions.logout,
    addExamCli: actions.addExamCli
};
export default connect(mapStateToProps, mapActionToProps)(ExamenCliniques);
