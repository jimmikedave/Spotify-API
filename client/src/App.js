import React, {Component} from 'react';
import './App.css';
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
        list: []
      }
    }
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

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      })
    })
  }

  getMyTopTracks() {
    spotifyWebApi.getMyTopTracks({limit: 50})
    .then((response) => {
      
      var i;

      let top50List = [];

      for(i = 0; i < response.items.length; i++) {
        top50List.push(response.items[i].name)
      }

      if(top50List.length === 50) {
        this.setState({
          top50: {
            list: top50List
          }
        })
        
        for(i = 0; i < this.state.top50.list.length; i++) {
          this.createListItem(this.state.top50.list[i])
        }
      }
    })
  }

  createListItem(song) {
    const orderedList = document.getElementById("top50");
    const listItem = document.createElement("li");

    listItem.textContent = song;

    orderedList.appendChild(listItem)
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'><button>Login with Spotify</button></a>
        <div>
          <h1>Now Playing: {this.state.nowPlaying.name}</h1>
        </div>
        <div>
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
            <ol id="top50"></ol>
          </div>
      </div>
    );
  }
}

export default App;
