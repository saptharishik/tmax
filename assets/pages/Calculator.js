import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const Calculator = () => {
  const [LoadPerTyreOnEmpty, setLoadPerTyreOnEmpty] = useState("");
  const [LoadPerTyreOnLoad, setLoadPerTyreOnLoad] = useState("");
  const [cycles, setCycles] = useState("");
  const [distance, setDistance] = useState("");
  const [rotation, setRotation] = useState("");
  const [TKPH, setTKPH] = useState(null);

  const handlePress = () => {
    const emptyLoad = parseFloat(LoadPerTyreOnEmpty) || 0;
    const loadedLoad = parseFloat(LoadPerTyreOnLoad) || 0;
    const numCycles = parseFloat(cycles) || 0;
    const cycleDistance = parseFloat(distance) || 0;
    const rotationHours = parseFloat(rotation) || 0;
    const meanTyreLoad = (emptyLoad + loadedLoad) / 2;
    const AWSS = (numCycles * cycleDistance) / rotationHours;
    const tkph = meanTyreLoad * AWSS;

    setTKPH(tkph.toFixed(2));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Enter Details: </Text>
        <TextInput
          value={LoadPerTyreOnEmpty}
          style={styles.input}
          placeholder="Load per tyre on empty vehicle"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setLoadPerTyreOnEmpty(text)}
        />
        <TextInput
          value={LoadPerTyreOnLoad}
          style={styles.input}
          placeholder="Load per tyre on loaded vehicle"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setLoadPerTyreOnLoad(text)}
        />
        <TextInput
          value={cycles}
          style={styles.input}
          placeholder="Number of cycles per day"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setCycles(text)}
        />
        <TextInput
          value={distance}
          style={styles.input}
          placeholder="Distance per cycle"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setDistance(text)}
        />
        <TextInput
          value={rotation}
          style={styles.input}
          placeholder="Rotation hour per cycle"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setRotation(text)}
        />
        <View style={styles.button}>
          <Button title="Generate TKPH" onPress={handlePress} />
        </View>
        {TKPH !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>TKPH: {TKPH}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    padding: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 4,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  button: {
    marginTop: 20,
  },
});
