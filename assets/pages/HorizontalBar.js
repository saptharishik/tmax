import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HorizontalBar = ({ value }) => {
  const percentage = Math.min(Math.max(value, 0), 100); // Clamp value between 0 and 100

  // Determine colors based on percentage
  let colors;
  if (percentage <= 32) {
    colors = ['#FF0000', '#FF0000']; // Red
  } else if (percentage <= 60) {
    colors = ['#FFFF00', '#FFFF00']; // Yellow
  } else if (percentage <= 95) {
    colors = ['#00FF00', '#00FF00']; // Green
  } else {
    colors = ['#FF0000', '#FF0000']; // Red
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.barContainer}>
        {/* Gradient Bar */}
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { width: `${percentage}%` }]}
        >
          {/* Value inside the bar */}
          <Text style={styles.valueText}>{value}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};
export default HorizontalBar;
const styles = StyleSheet.create({
    
    container: {
      marginVertical: 10,
      width: '90%',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    barContainer: {
      width: '100%',
      height: 20,
      backgroundColor: '#E0E0E0', // Light gray background for the bar
      // borderRadius: 10,
      borderWidth:2,
      overflow: 'hidden', // Ensures gradient stays within rounded corners
    },
    gradient: {
      height: '100%',
      // borderRadius: 10,
    },
    valueText: {
        color: 'black', // White text for better contrast
        fontWeight: 'bold',
        fontSize: 12,
        textAlign:'right',
      },
  });