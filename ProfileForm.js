import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const newPassRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandeler = (event) => {
      event.preventDefault();
      const validpass = newPassRef.current.value;
      //validation *** optional
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBjuboFhJgQzFx3hHO6xts-tYjUlptBEv4',{
        method : 'POST',
        body : JSON.stringify({
          idToken : authCtx.token,
          password : validpass,
          returnSecureToken : true
        }),
        headers : {
          "Content-type" : 'application/json'
        }
      }).then(res => {
        //assumption : Always succeds;

        navigate('/');
      }); 
     
  }
  return (
    <form className={classes.form} onSubmit={submitHandeler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength= "6" ref={newPassRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
