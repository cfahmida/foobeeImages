import React, {Component} from 'react';
import {
  View, Button, Text, StyleSheet, ScrollView, Alert,
  Image, NativeModules
} from 'react-native';
import * as firebase from 'firebase';

var ImagePicker = NativeModules.ImageCropPicker;

export default class ImagePickerExample extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyATey6H0VnQTyXG197INUCDB98JjTYzUOM",
      authDomain: "foobee-auth.firebaseapp.com",
      databaseURL: "https://foobee-auth.firebaseio.com",
      projectId: "foobee-auth",
      storageBucket: "foobee-auth.appspot.com",
      messagingSenderId: "368695401541"
    };
    firebase.initializeApp(config);
  }

  state = {
     image:[null,null,null,null, null, null],
  };


  pickSingle() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      includeExif: true,
      mediaType: 'photo',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }


  renderImage(image, val) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.image[val]}} />
  }

  renderInstance(val) {
        return (
            <View>
              <Button
                  title="Pick an image from camera roll"
                  onPress={()=>this.pickSingle()}
              />
                {this.state.image[val] ? this.renderImage(this.state.image[val], val) : null}
            </View>
        );
    }


    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={styles.flexStyle}>
                {this.renderInstance(0)}
                {this.renderInstance(1)}
              </View>
              <View style={styles.flexStyle}>
                {this.renderInstance(2)}
                {this.renderInstance(3)}
              </View>
              <View style={styles.flexStyle}>
                {this.renderInstance(4)}
                {this.renderInstance(5)}
              </View>
            </View>
        );
    }
  }

  const styles = StyleSheet.create({
   flexStyle: {
     flex: 1,
     flexDirection: 'row',
     display: 'flex',
     width: '50%',
     height: '35%',
   }
  });
