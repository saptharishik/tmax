import {
    View,
    Text,
    StyleSheet,
    Animated,
    Button,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';
  import {Linking} from 'react-native'
  import { Ionicons } from '@expo/vector-icons'; 
  import HorizontalBar from './HorizontalBar';
  const Callout = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(300)).current; // Start off-screen
    const navigation = useNavigation(); // Access navigation object
    //values

    const truck_id = 1;
    const Driver_name = 'Driver_1';
    const Driver_phone = '9874561230';
    const load = 85;
    const speed = 60;
    const fuel = 25;
    // Open animation when the component mounts
    React.useEffect(() => {
      Animated.timing(slide, {
        toValue: 0, // Slide up to visible
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);
  
    const closeCallout = () => {
      Animated.timing(slide, {
        toValue: 300, // Slide down off-screen
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setStatus(false); // Close the callout after animation completes
      });
    };
    const handlePress = () =>{
      closeCallout();
      navigation.navigate('Truck')
    };

    
  
    return (
      <TouchableWithoutFeedback onPress={closeCallout}>
        <View style={styles.backdrop}>
          {/* Prevent propagation of touch events to the backdrop */}
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomsheet,
                { transform: [{ translateY: slide }] },
              ]}
            >
              <View style={{flexDirection:'row'}}> 
                <View>
                  <Image source={require('../images/truck.png')} style={styles.img}/>
                  <Text style={styles.text}>Driver Name : {Driver_name}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>Call Driver : {Driver_phone} </Text>
                    <Ionicons name='call' size={20} onPress={()=>{Linking.openURL('tel:9874563210');}} />
                  </View>
                </View>
                <View style={{ marginTop:5, marginLeft: 10, alignItems: 'flex-start' }}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>Truck id : {truck_id}</Text>
                    
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                    <Text style={[styles.text, { marginRight: 10 }]}>Load:</Text>
                    <View style={{ flex: 1 }}>
                        <HorizontalBar value={load} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.text, { marginRight: 10 }]}>Speed:</Text>
                    <View style={{ flex: 1 }}>
                        <HorizontalBar value={speed} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.text, { marginRight: 10 }]}>Fuel:</Text>
                    <View style={{ flex: 1 }}>
                        <HorizontalBar value={fuel} />
                    </View>
                  </View>
                  
                  
                  <TouchableOpacity onPress={handlePress}>
                    <View style={styles.button}>
                      <Text style={{ color: 'white' }}>View Details</Text>
                      
                    </View>
                  </TouchableOpacity>
                </View>

              
              </View>
            </Animated.View>
            
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default Callout;
  
  const styles = StyleSheet.create({
    backdrop: {
      position: 'absolute',
      flex: 1,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    bottomsheet: {
      width: '100%',
      height: '30%',
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 10,
    
    //   justifyContent:'center',
      // flexDirection:'row',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    img:{
        width:180,
        height:130,
        // resizeMode: 'contain',
    },
    button:{
      backgroundColor:'#007bff',
      width:140,
      height:35,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
      
      

    },
    
    text:{
      fontWeight: 'bold', // Increase the font weight
      fontSize: 16,       
    }
  });
  