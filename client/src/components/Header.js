import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export default class Header extends Component {
    constructor() {
        super();
        const params = this.getHashParams();    
        
        this.state = {
          loggedIn: params.access_token ? true : false
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
        console.log(window.location)
        return(
            <div className="header">
                <ul className="nav-bar" id="nav-bar">
                    <li><h1>Welcome to the Spotify Check App</h1></li>
                    { this.state.loggedIn ? 
                    <li><a href='http://localhost:3000'><button><h3>Logout of Spotify</h3></button></a></li>
                    :
                    <li><a href='http://localhost:8888'><button><h3>Login with Spotify</h3></button></a></li>
                    }  
                </ul>
            </div>
            
        )
    }
    
}