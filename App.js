import { Switch, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Fragment } from 'react';

function App() {
  return (
 <Fragment>
  <Layout>
   <Routes>
 
   <Route path='/' exact Component={HomePage}/>
      <Route path='/auth' Component={AuthPage}/>
      <Route path='/profile' Component={UserProfile}/>
      
   </Routes>
  </Layout>
  
 </Fragment>
  );
}

export default App;
