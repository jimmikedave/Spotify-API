import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Header from './components/Header';


import Tabs from './components/Tabs';
import Display from './components/Display';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();    
    
    this.state = {
      nowPlaying: {
        artist: 'Not Checked',
        name: 'Not Checked',
        image: ''
      },
      top50: {
        name: [],
        artist: []
      }
    }
    // This allows you to access the spotify API
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() { 
    return (
      <div className="App">
        <Header />
        <Tabs />
      </div>
    );
  }
}

export default App;
