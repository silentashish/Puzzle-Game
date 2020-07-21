import React, {Component} from 'react';
import _ from 'lodash';
import SplashScreen from 'react-native-splash-screen'

import MainApp from './navigators/index';
import { Root } from "native-base";


export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <Root>
        <MainApp />
      </Root>
    );
  }
}