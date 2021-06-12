/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


// Native - App version

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  ImageBackground
} from 'react-native';

import KeepAwake from 'react-native-keep-awake';


import { useState } from 'react';
import 'react-native-sound';
var Sound = require('react-native-sound');

/*
 
*/
import ReconnectingWebSocket from 'reconnecting-websocket';

var client = new ReconnectingWebSocket ('ws://10.101.40.81:4321/'); // FIXME
//var clientBoard = new ReconnectingWebSocket ('ws://10.101.40.81:4324/'); // FIXME
//var wsGyroscope = new ReconnectingWebSocket("ws://10.101.40.81:4323/");// FIXME
//var container = require('rhea');
//container.connect({port: 5672, host: "127.0.0.1"});

import { Connection, Exchange, Queue } from 'react-native-rabbitmq';



Sound.setCategory('Playback');

var SFXone = new Sound('1.mp3', Sound.MAIN_BUNDLE);
var SFXtwo = new Sound('2.mp3', Sound.MAIN_BUNDLE);
var SFXthree = new Sound('3.mp3', Sound.MAIN_BUNDLE);
var SFXfour = new Sound('4.mp3', Sound.MAIN_BUNDLE);
var SFXfive = new Sound('5.mp3', Sound.MAIN_BUNDLE);
var SFXsix = new Sound('6.mp3', Sound.MAIN_BUNDLE);
var SFXseven = new Sound('7.mp3', Sound.MAIN_BUNDLE);
var SFXeight = new Sound('8.mp3', Sound.MAIN_BUNDLE);
var SFXnine = new Sound('9.mp3', Sound.MAIN_BUNDLE);
var SFXten = new Sound('10.mp3', Sound.MAIN_BUNDLE);
var SFXdone = new Sound('done.mp3', Sound.MAIN_BUNDLE);
var SFXfailed = new Sound('failed.mp3', Sound.MAIN_BUNDLE);
var SFXready = new Sound('ready.mp3', Sound.MAIN_BUNDLE);
var SFXstarthang = new Sound('starthang.mp3', Sound.MAIN_BUNDLE);
var SFXstophang = new Sound('stophang.mp3', Sound.MAIN_BUNDLE);



const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  KeepAwake.activate();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {

  };

  const [myText, setMyText] = useState("My Original Text");// FIXME 
  const [myState, setMyState] = useState("");

  const ImageBoard = require("./board.png"); // FIXME 
  const ImageA1 = require("./A1.png");// FIXME 
  const ImageA7 = require("./A7.png");// FIXME 
  
  const [ImageHold1, SetImageHold1] = useState(ImageBoard);
  const [ImageHold2, SetImageHold2] = useState(ImageBoard);
  //var ImageHold2 = ImageBoard;

  const [ImageTest, SetImageTest] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='); // Test image

  //clientBoard.onmessage = function(e) {
  //  SetImageTest('data:image/png;base64,' + e.data);
  //}

  client.onmessage = function(e) {
    if (typeof e.data === 'string') {
      mydata = e.data;
      console.log("Received: '" + e.data + "'");
    }

    var parsed = JSON.parse(e.data);
    var counter = parseFloat(parsed.Counter).toFixed(2); //Counter
    var currentcounter = parseFloat(parsed.CurrentCounter).toFixed(2); // CurrentCounter
    var rest = parseFloat(parsed.Rest);

    setMyState(parsed);
    setMyText("Exercise: " + parsed.Exercise + " for " + parseInt(counter+1) + "(s) and still " + parseInt(rest+1) + "(s) remaining."); 

    if (parsed.Left.includes("A1")) { SetImageHold1 (ImageA1);  } else { SetImageHold1(ImageBoard); }// FIXME 
    if (parsed.Right.includes("A7")) { SetImageHold2 (ImageA7); } else { SetImageHold2(ImageBoard); }

  
    //var array = parsed.HoldsActive; 
    //array.forEach(element => ImageHold1 = element);
    //array.forEach(element => window[element].setAttribute("display","inline") ); // FIXME 


    if (rest == 10.00) { SFXten.play(); } 
    if (rest == 9.00) { SFXnine.play(); } 
    if (rest == 8.00) { SFXeight.play(); } 
    if (rest == 7.00) { SFXseven.play(); } 
    if (rest == 6.00) { SFXsix.play(); } 
    if (rest == 5.00) { SFXfive.play(); } 
    if (rest == 4.00) { SFXfour.play(); } 
    if (rest == 3.00) { SFXthree.play(); } 
    if (rest == 2.00) { SFXtwo.play(); } 
    if (rest == 1.00) { SFXone.play(); } 
    if (rest == 0.00) { SFXdone.play(); } 

  
    

    if (parsed.HangChangeDetected == "Hang") { SFXstarthang.play() ; }
    if (parsed.HangChangeDetected == "NoHang") { SFXstophang.play() ; }
 
  }; 

  const sendStart = () =>
  {
    //console.log("Sending");
    client.send("Start");
  }

  const sendStop = () =>
  {
    //console.log("Sending");
    client.send("Stop");
  }

  
  return (
    
    <SafeAreaView style={backgroundStyle}>
     
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <View
          style={{
          }}>
          <ImageBackground source={require('./board.png')} style={{flex:1, height: 200, width: undefined}} resizeMode="contain"> 
               <ImageBackground source={ImageHold1} style={{flex:1, top:0, height: 200, width: undefined}} resizeMode="contain">
                <ImageBackground source={ImageHold2} style={{flex:1, top:0, height: 200, width: undefined}} resizeMode="contain"/>     
              </ImageBackground>
          </ImageBackground>

          <Section title="Backend Exercise">
            <Text onPress = {() => SFXdone.play()}>
              {myText}
            </Text>
          </Section>
     
          <Section title="Controls">
            <Button title="Start" onPress = {() => sendStart()} />
            <Button title="Stop" onPress = {() => sendStop()} />
          </Section>
          <Section title="Parsed">
            <Text>
              {myState.Duration}
            </Text>
          </Section>

        
        </View>

        <View >
          <Section title="Testing Image Transfer"> 
          </Section>
          <ImageBackground source={{ uri: ImageTest}} style={{flex:1, top:0, height: 200, width: undefined}} resizeMode="contain"/>     
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
