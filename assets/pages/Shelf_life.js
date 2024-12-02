import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Initialize NFC Manager
NfcManager.start();

const Shelf_life = () => {
  const [tagData, setTagData] = useState(null);

  // Start listening for NFC tags
  const readNfcTag = async () => {
    try {
      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag(); // Get the scanned tag
      setTagData(tag);
      Alert.alert("NFC Tag Detected", JSON.stringify(tag));
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Failed to read NFC tag");
    } finally {
      // Clean up after reading
      NfcManager.cancelTechnologyRequest();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      NfcManager.setEventListener(NfcTech.Ndef, null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NFC Reader</Text>
      <Button title="Scan NFC Tag" onPress={readNfcTag} />
      {tagData && (
        <View style={styles.result}>
          <Text style={styles.tagTitle}>Tag Data:</Text>
          <Text>{JSON.stringify(tagData)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tagTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Shelf_life;