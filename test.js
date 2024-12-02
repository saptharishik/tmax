import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'; // Network connectivity

// map
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

// bottom sheet
import Callout from './assets/pages/Callout';
import BottomSheet from '@gorhom/bottom-sheet';
import TruckDetails from './assets/pages/TruckDetails';
import Calculator from './assets/pages/Calculator';

export default function App() {
  const [user, setUser] = useState(true); // false by default

  return (
    <>
      {!user ? <Login setUser={setUser} /> : <Home setUser={setUser} />}
    </>
  );
}

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const authenticate = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      setUser(true);
    } catch (error) {
      Alert.alert('Error', 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('./assets/images/Loginpage.png')}
        />
        <View style={styles.loginBox}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Log in</Text>
          </View>

          <View>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button title="Login" color="#2d51a5" onPress={authenticate} />
            )}
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const Drawer = createDrawerNavigator();

function Home({ setUser }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#DDDDD1',
            width: 240,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="TKPH calculator" component={CalculatorScreen} />
        <Drawer.Screen name="Truck" component={TruckDetails} />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            drawerLabelStyle: { color: '#2d51a5' },
          }}
          listeners={({ navigation }) => ({
            focus: () => {
              setUser(false);
            },
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function LogoutScreen() {
  return null;
}

function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required for this feature.');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        Alert.alert('Fetch Failed', 'Could not retrieve location. Try again.', [
          { text: 'Retry', onPress: fetchLocation },
        ]);
      }
    };

    fetchLocation();

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 16 }}>No Internet Connection</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.16,
        }}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: location.latitude + 0.05,
            longitude: location.longitude - 0.05,
          }}
          onPress={() => {
            setStatus(true);
          }}
        >
          <Image
            source={require('./assets/images/truck.png')}
            style={styles.markerImage}
          />
        </Marker>
      </MapView>
      {status && <Callout setStatus={setStatus} />}
      <BottomSheet />
    </View>
  );
}

function CalculatorScreen() {
  return <Calculator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDD1',
    alignItems: 'center',
  },
  tinyLogo: {
    height: 300,
  },
  loginBox: {
    borderWidth: 2.5,
    width: 325,
    height: 300,
    borderColor: '#999493',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'rgba(255,250,250,0.7)',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 25,
    margin: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
