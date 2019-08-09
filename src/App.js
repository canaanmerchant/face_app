import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '5ff7ba5564ef409a9b27501af8a61482'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',

      }
      }
    }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,

      }})
    }
    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
    }

    displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box});
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

  /* Where is the missing curly brace????

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image'), {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        .catch(err => console.log(err));
      } */



   onButtonSubmit = () => {
          this.setState({imageUrl: this.state.input});
          app.models
            .predict(
              Clarifai.FACE_DETECT_MODEL,
              this.state.input)
            .then(response => {
              if (response) {
                fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
                })
                .then(response => response.json())
                .then(count => {
                  this.setState(Object.assign(this.state.user, {entries: count}))
                })
            }
              this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
        }


    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }

render() {
  const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Particles className="particles"
      params={particlesOptions} />
      <Navigation  isSignedIn={isSignedIn}
                  onRouteChange={this.onRouteChange} />

      { route === 'home'

        ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}/>
            </div>
              : (
                    route === 'signin'
                  ?  <SignIn
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}/>
                  :  <Register
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}/>
              )
            }
        </div>
    );
  }
}
export default App;
