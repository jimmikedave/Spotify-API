import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();    
    
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
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

  // Retrieve the current song playing.
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {

      console.log(response)

      if(response === '') {
        this.setState({
          nowPlaying: {
            name: "No song is playing. :("
          }
        })
      } else {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      }

    })
  }

  // Retrieve an array of the user's top 50 tracks.
  getMyTopTracks() {
    spotifyWebApi.getMyTopTracks({limit: 50})
    .then((response) => {      
      var i;
      let top50List = [];
      let top50Artist = [];

      if(this.state.top50.name.length === 0) {
        for(i = 0; i < response.items.length; i++) {
          top50List.push(response.items[i].name)
          top50Artist.push(response.items[i].artists[0].name)
        }
  
        if(top50List.length === 50 && top50Artist.length === 50) {
          this.setState({
            top50: {
              name: top50List,
              artist: top50Artist
            }
          })
          for(i = 0; i < this.state.top50.name.length; i++) {
            this.createListItem(this.state.top50.name[i], this.state.top50.artist[i])
          }
        }
      }
    })
  }

  // Turns the top 50 array into an ordered list.  
  createListItem(song, artist) {
    const orderedList = document.getElementById("top50");
    const listItem = document.createElement("li");

    listItem.textContent = song + " by " + artist;

    orderedList.appendChild(listItem)
  }

  render() { 
    
    return (
      <div className="App">
        <div class="nav-bar" id="nav-bar">
        { this.state.loggedIn ? 
          <a href='http://localhost:3000'><button>Logout of Spotify</button></a>
          :
          <a href='http://localhost:8888'><button>Login with Spotify</button></a>
        }  
        </div>
          <div>
            <h1>Now Playing: {this.state.nowPlaying.name}</h1>
          </div>
          <div id="display-container">
            <img src={this.state.nowPlaying.image} style={{width: 400}}/>
          </div>
          <button onClick={() => {
            this.getNowPlaying()
            }}>
            Check Now Playing
          </button>
          <button onClick={() => {
            this.getMyTopTracks()
            }}>
            Show Top 50 Songs
          </button>
          <div>
            <ol id="top50" style={{fontSize: 30}}></ol>
          </div>
      </div>
    );
  }
}

export default App;
