import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import RadioGroup from 'react-native-radio-buttons-group';
import FormInput from '../../Form/FormInput';
import DatePicker from 'react-native-datepicker'
import FormButton from '../../Form/FormButton';
import CaracCls from "../../Form/CaracCls";
import * as actions from "../../../Actions/medicalService";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
//import 'localstorage-polyfill';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';


const CaracCliniques = (props) => {

    const [sym, setSym] = useState(true)
    const [dateD, setDateD] = useState()
    const [dateF, setDateF] = useState()
    const [temperature, setTemperature] = useState()
    const [typeT, settypeT] = useState("Séche")
    const [selle, setSelle] = useState()
    const [autre, setAutre] = useState()
    const [nbEpisodes, setNbEpisodes] = useState()

    //carac
    const [fievre, setFievre] = useState(false)
    const [toux, setToux] = useState(false)
    const [cepah, setCeph] = useState(false)
    const [asth, setAsth] = useState(false)
    const [mya, setMya] = useState(false)
    const [ody, setOdy] = useState(false)
    const [rhi, setRhi] = useState(false)
    const [ano, setAno] = useState(false)
    const [agu, setAgu] = useState(false)
    const [dia, setDia] = useState(false)
    const [nau, setNau] = useState(false)
    const [eru, setEru] = useState(false)
    const [eng, setEng] = useState(false)
    const [dou, setDou] = useState(false)
    const [gen, setGen] = useState(false)
    const [ess, setEss] = useState(false)
    const [aut, setAut] = useState(false)


    const [test, setTest] = useState(false)

    var handleTemperatureChange = (text) => {
        if (text < 32 || text > 43)
            setTest(false)
        else setTest(true)
        setTemperature(text)
    }
    var handletypeT = (data) => {
        if (data[0].selected)
            settypeT(data[0].label)
        if (data[1].selected)
            settypeT(data[1].label)
    }
    var handleSelle = (text) => {
        setSelle(text)
    }
    var handleAutre = (text) => {
        setAutre(text)
    }
    var handleNbEpisodes = (text) => {
        setNbEpisodes(text)
    }

    var handleSymChange = (data) => {
        if (data[0].selected)
            setSym(true)
        else setSym(false)
    }
    var handleSubmitCarac = (item) => {
        if (test == false && item === "Fievre")
            return;
        var values = {
            type: item,
            typeT: typeT,
            temperature: temperature,
            selle: selle,
            nbEpisodes: nbEpisodes,
            autre: autre,
            dateD: dateD,
            dateF: dateF,
            sym: sym

        }
        console.log(values)
        props.addCaracCliniques(props.patientList["cin"], values)

    }



    //functions




    return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
        <ScrollView>



            <Text style={tailwind('text-gray-700 font-bold py-2 text-xl text-center')}>Caractéristiques cliniques du cas</Text>
            <Text style={tailwind('text-gray-700 font-bold py-2  text-center')}>Patient:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>
            <Text style={tailwind('text-gray-700 py-4 text-center')}>
                Symptomatique ?
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
                onPress={handleSymChange}
            />
            {
                sym === true &&
                <View style={tailwind("px-8 py-2")}>
                    <TouchableOpacity onPress={() => setFievre(!fievre)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Fièvre</Text>
                    </TouchableOpacity>
                    {
                        fievre == true && <View style={tailwind("items-center")}>
                            <Text style={tailwind("text-red-500")}>{test == false && "La temperature doit etre entre 36 et 43 °C"}</Text>
                            <FormInput placeholder="Si mesuré" type="decimal-pad" onChangeText={handleTemperatureChange} />
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Fievre"); setFievre(!fievre) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setToux(!toux)} >
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Toux</Text>
                    </TouchableOpacity>
                    {
                        toux === true && <View style={tailwind("items-center")}>

                            <RadioGroup radioButtons={[
                                {
                                    label: 'Séche',
                                    color: '#51d1c5',

                                },
                                {
                                    label: 'Productive',
                                    color: '#51d1c5',
                                },
                            ]}
                                flexDirection='row'
                                style={tailwind('')}
                                onPress={handletypeT}
                            />
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Toux"); setToux(!toux) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setCeph(!cepah)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Cépahlées</Text>
                    </TouchableOpacity>
                    {
                        cepah === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Cephalees"); setCeph(!cepah) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setAsth(!asth)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Asthénie/fatigue</Text>
                    </TouchableOpacity>
                    {
                        asth === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("AshthFat"); setAsth(!asth) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setMya(!mya)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Myalgies/courabatures</Text>
                    </TouchableOpacity>
                    {
                        mya === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("MyalCourba"); setMya(!mya) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setOdy(!ody)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Odynophagie</Text>
                    </TouchableOpacity>
                    {
                        ody === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Odynophagie"); setOdy(!ody) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setRhi(!rhi)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Rhinorrhée/Congestion nasale</Text>
                    </TouchableOpacity>
                    {
                        rhi === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("RhinoCongNas"); setRhi(!rhi) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setAno(!ano)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Anosmie</Text>
                    </TouchableOpacity>
                    {
                        ano === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Anosmie"); setAno(!ano) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setAgu(!agu)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Agueusie</Text>
                    </TouchableOpacity>
                    {
                        agu === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Agueusie"); setAgu(!agu) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setDia(!dia)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Diarrhée</Text>
                    </TouchableOpacity>
                    {
                        dia === true && <View style={tailwind("items-center")}>
                            <FormInput placeholder="Nb selles/jour" onChangeText={handleSelle} maxLength={Number("2")} type="number-pad" />
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Diarrhee"); setDia(!dia) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setNau(!nau)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Nausée/voumissement</Text>
                    </TouchableOpacity>
                    {
                        nau === true && <View style={tailwind("items-center")}>
                            <FormInput placeholder="Nb episodes/jour" onChangeText={handleNbEpisodes}  maxLength={Number("2")} type="number-pad"/>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("NauVoumi"); setNau(!nau) }} />
                        </View>
                    }

                    <TouchableOpacity onPress={() => setEru(!eru)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>ERuption cutanée</Text>
                    </TouchableOpacity>
                    {
                        eru === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("ErruptionCu"); setEru(!eru) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setEng(!eng)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Engelure</Text>
                    </TouchableOpacity>
                    {
                        eng === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Engelure"); setEng(!eng) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setDou(!dou)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Douleur thoracique</Text>
                    </TouchableOpacity>
                    {
                        dou === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("DouleurThora"); setDou(!dou) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setGen(!gen)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Génie respiratoire</Text>
                    </TouchableOpacity>
                    {
                        gen === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("GeneRespi"); setGen(!gen) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setEss(!ess)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Essoufflement</Text>
                    </TouchableOpacity>
                    {
                        ess === true && <View style={tailwind("items-center")}>
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Essouflement"); setEss(!ess) }} />
                        </View>
                    }
                    <TouchableOpacity onPress={() => setAut(!aut)}>
                        <Text style={tailwind('text-teal-500 font-bold text-base py-3 border border-solid border-teal-500 rounded-lg px-3 mt-4 mb-4')}>Autres signes cliniques</Text>
                    </TouchableOpacity>
                    {
                        aut === true && <View style={tailwind("items-center")}>
                            <FormInput placeholder="Préciser" onChangeText={handleAutre} />
                            <CaracCls dateD={dateD} dateF={dateF} setDateD={setDateD} setDateF={setDateF} onSubmit={() => { handleSubmitCarac("Autre"); setAut(!aut) }} />
                        </View>
                    }
                </View>

            }
            <View style={tailwind("items-center pb-8")}>
                <View style={styles.row}>
                    <FormButton title="Retour" onPress={() => { props.navigation.navigate("DiagnosticDetails") }} />
                    {sym === false && <FormButton title="Enregistrer" onPress={() => { handleSubmitCarac(""); props.navigation.navigate("DiagnosticDetails") }} />}
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
    login: actions.login,
    logout: actions.logout,
    addCaracCliniques: actions.addCaracCliniques
};
export default connect(mapStateToProps, mapActionToProps)(CaracCliniques);
