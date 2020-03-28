import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerASync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openShareDialogASync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Uh oh, sharing isn't available on your platform.");
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />

        <TouchableOpacity onPress={openShareDialogASync} style={styles.button}>
          <Text style={styles.buttonText}>Share This Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>COVID-19 Stalker</Text>
      {/* <Image source={logo} style={{ width: 256, height: 256 }}/> */}
      {/* <Text style={{color: "#A00", fontSize: 20, padding: 5}}>To get started, please catch COVID-19!</Text> */}

      <TouchableOpacity
        onPress={openImagePickerASync}
        style={styles.button}>
        <Text style={styles.buttonText}>*c`ough*</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,  
  }
  ,
  buttonText: {
    fontSize: 20,
    color: "#fff",  
  }
  ,
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  heading: {
    textAlign: 'center',
    margin: 5,
    fontSize: 40,
    fontWeight: 'bold'
  },
});
