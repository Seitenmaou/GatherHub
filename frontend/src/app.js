import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import SignUp from './users/signup'
import Login from './users/login'
import GatherHub from './hub/gatherhub';
import {CurrentUserProvider} from './contexts/CurrentUser'
import Navigation from './navigation';
import UserProfile from './users/profileEdit';
import PrivateRoute from './privateroute/PrivateRoute'
import ProfileDetail from './users/profileDetail'

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/gatherhub' element={<GatherHub/>}/>
          <Route path='/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
          <Route path='/profile/:id' element={<ProfileDetail/>}/>
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
