import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const Emailref = useRef();
  const Passwordref = useRef();
  const Authctx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    const emailval = Emailref.current.value;
    const passwordval = Passwordref.current.value;
    setIsloading(true);
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjuboFhJgQzFx3hHO6xts-tYjUlptBEv4';
  
  }
  else{
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjuboFhJgQzFx3hHO6xts-tYjUlptBEv4';
  }
  fetch(url,{
    method: 'POST',
    body : JSON.stringify({
      email: emailval,
      password: passwordval,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    setIsloading(false);
    if(res.ok){
      return res.json();
    }
    else{
      return res.json().then((data) => {
       let errormessage = 'Authentication fails!';
      throw new Error(errormessage);
      }); 
    } 
  })
 .then ((data)=> {
  Authctx.login(data.idToken);
 })
 .catch((err) => {
  alert(err.message);
 });
};

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandeler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={Emailref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={Passwordref}
          />
        </div>
        <div className={classes.actions}>
          {!isloading && <button >{isLogin ? 'Login' : 'Create Account'}</button>}
          {isloading && <p>Sending request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
