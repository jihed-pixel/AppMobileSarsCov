import React from 'react';


import tailwind from 'tailwind-rn';
import { } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FormButton from "./FormButton";
import DatePicker from 'react-native-datepicker'


const CaracCls = (props) => {
  return (

    <>

      <DatePicker
        style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
        mode="date"
        placeholder={(props.dateD != undefined && props.dateD) || "Du ?"}
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
        onDateChange={props.setDateD}
      />
      <DatePicker
        style={tailwind("rounded-md text-red-500 border-solid w-3/5 border border-teal-500 m-4")}
        mode="date"
        placeholder={(props.dateF != undefined && props.dateF) || "Au ?"}
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
        onDateChange={props.setDateF}
      />
      <FormButton title="Enregistrer" onPress={props.onSubmit} />

    </>
  );
};




export default CaracCls;