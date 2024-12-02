import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Button } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const TireCard = ({ position, pressure, temperature, tkph, status }) => {
  const maxPressure = 50; // Assuming 50 psi as max pressure
  const percentage = (pressure / maxPressure) * 100;
  const circleRadius = 40;

  return (
    <View style={styles.tireCard}>
      <Text style={styles.tirePosition}>{position}</Text>
      <Svg height="100" width="100">
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={status === "normal" ? "green" : "red"}
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${2 * Math.PI * circleRadius}`}
          strokeDashoffset={`${
            2 * Math.PI * circleRadius * ((100 - percentage) / 100)
          }`}
        />
        <SvgText
          x="50"
          y="50"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          dy=".3em"
        >
          {pressure} psi
        </SvgText>
      </Svg>
      <Text style={styles.tireTemperature}>{temperature}°C</Text>
      <Text style={styles.tireTkph}>TKPH: {tkph}</Text>
    </View>
  );
};

const Dashboard = () => {
  const tires = [
    {
      position: "Front Left",
      pressure: 31.2,
      temperature: 64,
      tkph: 120,
      status: "normal",
    },
    {
      position: "Front Right",
      pressure: 16.2,
      temperature: 62,
      tkph: 95,
      status: "low",
    },
    {
      position: "Rear Left",
      pressure: 15.8,
      temperature: 61,
      tkph: 90,
      status: "low",
    },
    {
      position: "Rear Right",
      pressure: 32.3,
      temperature: 60,
      tkph: 125,
      status: "normal",
    },
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Truck Id : </Text>
      <View style={styles.dashboard}>
        

        {/* Tire Cards */}
        {tires.map((tire, index) => (
          <TireCard key={index} {...tire} />
        ))}

      </View>
      <Button title='Generate report'/>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
    // justifyContent: "center",
    marginTop:15,


  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dashboard: {
    position: "relative",
    width: "100%",
    height: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  centerContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10,
  },
  carImage: {
    width: 100,
    height: 100,
  },
  tireCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 140,
    margin: 10,
  },
  tirePosition: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 5,
  },
  tireTemperature: {
    color: "#f90",
    fontSize: 14,
    marginTop: 5,
  },
  tireTkph: {
    color: "#1E90FF",
    fontSize: 14,
    marginTop: 5,
  },
});
