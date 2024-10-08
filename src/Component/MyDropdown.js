import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';


const MyDropdown = ({ options, selectedValue, onValueChange, style }) => {
  const [value, setValue] = useState(selectedValue);

  const handleValueChange = (itemValue) => {
    setValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={value}
        onValueChange={handleValueChange}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  picker: {
    height: 40,
  },
});

export default MyDropdown;