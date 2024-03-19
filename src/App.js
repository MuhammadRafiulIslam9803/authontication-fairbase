import './App.css';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './Firebase/firebase.init';
import { useState } from 'react';

// step -1 get the auth and call the app
const  auth = getAuth(app)

function App() {
  const [user ,setUser] = useState({})
//  step -2 Call the provider and set it
  const googleProvider = new GoogleAuthProvider()
  const githubProvider =new GithubAuthProvider()

  //  google login 
  const handleGoogleLogin = ()=>{
    signInWithPopup(auth ,googleProvider)
    .then(result => {

      const user = result.user
      setUser(user)
      // console.log(user)
    })
    .catch(error =>{
      setUser({})
      console.log('error : ' ,error)
    })
  }
  // git hub login 
  const handelGitHubLogin = () =>{
    signInWithPopup(auth , githubProvider)
    .then(result => {
      const user = result.user
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      setUser({})
      console.log('error : ' ,error)
    })
  }
  // log out Here 
  const handleLogOut=()=>{
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <div className="App"> 
       {user.uid ? 
            <div className='button-style'>
              <button onClick={() => handleLogOut() }>LogOut</button>
            </div>
            :
            <div className='button-style'>
            <button onClick={ () =>handleGoogleLogin()}>Google Login</button>
            <button onClick={ () => handelGitHubLogin()}>Github Login</button>
            </div>
        }
       <div>
        { user.uid && <div>
            <h3> Email : {user.email}</h3>
            <h4> Name : {user.displayName}</h4>
            <img src={user.photoURL} alt="" />
        </div> }
       </div>
    </div>
  );
}

export default App;
