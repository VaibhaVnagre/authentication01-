 import React,{useState} from 'react';

 const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {}
 });

 export const AuthContextProvider = (props) => {

   const [token, setToken] = useState(null);

   const userIsLoggedIn = !!token;

   const loginHandeler = (token) => {
      setToken(token);
   };

   const logoutHandeler = () => {
      setToken(null);
   };

   const contextValue = {
      token : token,
      isLoggedIn : userIsLoggedIn,
      login : loginHandeler,
      logout : logoutHandeler
   };

   return (
      <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
   )
 };

 export default AuthContext;