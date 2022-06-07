import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormButton from "../Form/FormButton";
import * as actions from "../../Actions/medicalService";
import RadioGroup from 'react-native-radio-buttons-group';
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import 'localstorage-polyfill';
import FormInput from '../Form/FormInput';
import {LinearGradient} from 'expo-linear-gradient';


const HabitudesDeVie = (props) => {
    useEffect(() => {
    })
    const [tabagisme, setTabagisme] = useState(false)
    const [nbCigarettes, setNbCigarettes] = useState(0)
    const [freqChicha, setFreqChicha] = useState(0)
    const [drogue, setDrogue] = useState(false)
    const [alcool, setAlcool] = useState(false)
    const [gs, setGs] = useState(0)
    const [poids, setPoids] = useState(0)
    const [taille, setTaille] = useState(0)


    var handleAlcoolChange = (data) => {
        if (data[0].selected)
            setAlcool(false)
        if (data[1].selected)
            setAlcool(true)
    }
    var handleDrogueChange = (data) => {
        if (data[0].selected)
            setDrogue(false)
        if (data[1].selected)
            setDrogue(true)
    }
    var handleTabagismeChange = (data) => {
        if (data[0].selected)
            setTabagisme(false)
        if (data[1].selected)
            setTabagisme(true)
    }
    var handleNbCigarettesChange = (data) => {
        setNbCigarettes(data)
    }
    var handleFreqChichaChange = (data) => {
        setFreqChicha(data)
    }
    var handleGsChange = (data) => {
        setGs(data)
    }
    var handlePoidsChange = (data) => {
        setPoids(data)
    }
    var handleTailleChange = (data) => {
        setTaille(data)
    }
    var handleSubmit = (e) => {
        var values = {
            poids: poids,
            taille: taille,
            gs: gs,
            alcool: alcool,
            drogue: drogue,
            nbCigarettes: nbCigarettes,
            freqChicha: freqChicha
        }
        console.log(values)
        e.preventDefault();
        props.habitudesDeViePatient(props.patientList["cin"], values)
        props.navigation.navigate("PatientDetails")
    }

    return (
<LinearGradient colors={['#d7dbdd', '#abebc6','#d7dbdd']} style={styles.body}>
        <ScrollView>


            <View style={tailwind(' items-center ')} >
                <Text style={tailwind('text-gray-700 font-bold py-2 text-xl')}>Habitudes de vie:{props.patientList["generalInformation"]["nom"] + " " + props.patientList["generalInformation"]["prenom"]}</Text>

                <View style={styles.row}>

                    <Text style={tailwind('text-gray-700 py-2')}>
                        Tabagisme ?
                   </Text>
                    <RadioGroup radioButtons={[
                        {
                            label: 'Non',
                            color: '#51d1c5',

                        },
                        {
                            label: 'Oui',
                            color: '#51d1c5',
                        },
                    ]}
                        flexDirection='row'
                        style={tailwind('')}
                        onPress={handleTabagismeChange}
                    />


                </View>

                <View>
                    {tabagisme == true && (
                        <View style={tailwind("items-center")}>

                            <FormInput placeholder="Nombre de cigarettes/jour"
                                type="number-pad"
                                onChangeText={handleNbCigarettesChange}
                            />


                            <FormInput placeholder="Frequence de Chicha/semaine"
                                type="number-pad"
                                onChangeText={handleFreqChichaChange}
                            />
                        </View>

                    )}

                </View>
                <View style={styles.row}>

                    <Text style={tailwind('text-gray-700 py-2')}>
                        Drogues/cannabis ?
                    </Text>
                    <RadioGroup radioButtons={[
                        {
                            label: 'Non',
                            color: '#51d1c5',

                        },
                        {
                            label: 'Oui',
                            color: '#51d1c5',
                        },
                    ]}
                        flexDirection='row'
                        style={tailwind('')}
                        onPress={handleDrogueChange}
                    />


                </View>
                <View style={styles.row}>

                    <Text style={tailwind('text-gray-700 py-2')}>
                        Alcool ?
                    </Text>
                    <RadioGroup radioButtons={[
                        {
                            label: 'Non',
                            color: '#51d1c5',

                        },
                        {
                            label: 'Oui',
                            color: '#51d1c5',
                        },
                    ]}
                        flexDirection='row'
                        style={tailwind('')}
                        onPress={handleAlcoolChange}
                    />


                </View>
                <FormInput placeholder="Poids"
                    onChangeText={handlePoidsChange} />
                <FormInput placeholder="Taille"
                    onChangeText={handleTailleChange} />
                <FormInput placeholder="GS"
                    onChangeText={handleGsChange} />
                <View style={styles.row}>
                    <FormButton title="Enregister" onPress={handleSubmit} />
                    <FormButton title="Annuler" onPress={() => { props.navigation.navigate("PatientDetails") }} />
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
    patientList: state.medicalService.patientList
});
const mapActionToProps = {
    habitudesDeViePatient: actions.habitudesDeViePatient

};

export default connect(mapStateToProps, mapActionToProps)(HabitudesDeVie);
