import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setIsloading] =useState(false);
  const Emailref = useRef();
  const Passwordref = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    const emailval = Emailref.current.value;
    const passwordval = Passwordref.current.value;
    setIsloading(true);

    if (isLogin) {
      //...
  }
  else{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjuboFhJgQzFx3hHO6xts-tYjUlptBEv4',{
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
    .then(res => {
      setIsloading(false);
      if(res.ok){
        //...
      }
      else{
        return res.json().then((data) => {
         let errormessage = '';
         if(data && data.error && data.error.message){
          
           errormessage = data.error.message;
           alert(errormessage);
         }
        }); 
      } 
    });
  }
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
