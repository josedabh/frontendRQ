import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddChallengeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [points, setPoints] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    const formattedData = {
      title,
      description,
      difficulty,
      startDate: startDate.toISOString().slice(0, 16),
      endDate: endDate.toISOString().slice(0, 19),
      points: parseInt(points),
    };

    console.log('Challenge data:', formattedData);
    // Aquí puedes enviar los datos a tu backend o manejarlos como quieras
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título del Reto</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Añadir Reto"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción del reto"
      />

      <Text style={styles.label}>Dificultad</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Fácil" value="easy" />
        <Picker.Item label="Media" value="medium" />
        <Picker.Item label="Difícil" value="hard" />
      </Picker>

      <Text style={styles.label}>Puntos</Text>
      <TextInput
        style={styles.input}
        value={points}
        onChangeText={setPoints}
        placeholder="1"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fecha de inicio</Text>
      <Button title={startDate.toDateString()} onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            if (date) setStartDate(date);
            setShowStartPicker(false);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de fin</Text>
      <Button title={endDate.toDateString()} onPress={() => setShowEndPicker(true)} />
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            if (date) setEndDate(date);
            setShowEndPicker(false);
          }}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Guardar Challenge" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  picker: {
    marginTop: 4,
    height: 40,
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
