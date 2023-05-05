import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ExampleDateTimePicker = ({ reloadItems, user }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    let dateObj = new Date(currentDate);
    dateObj.setHours(dateObj.getHours() - 6);
    let newDateString = dateObj.toISOString();
    const fecha = new Date(newDateString);
    const fechaYMD = fecha.toISOString().substring(0, 10);
    reloadItems(user,fechaYMD);
    
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Button onPress={showDatepicker} title={date.toLocaleDateString()} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={Platform.OS === "ios" ? "compact" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default ExampleDateTimePicker;
