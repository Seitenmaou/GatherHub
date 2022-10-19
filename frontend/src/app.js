//all routes and what not

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
import MessageBoard from './messageBoard/messageBoard';
import MessageBoardDetail from './messageBoard/messageDetail';
import MessageBoardNew from './messageBoard/messageBoardNew';
import Error404 from './error404';

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/gatherhub' element={<PrivateRoute><GatherHub/></PrivateRoute>}/>
          <Route path='/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
          <Route path='/profile/:id' element={<PrivateRoute><ProfileDetail/></PrivateRoute>}/>
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/messageboard/' element={<PrivateRoute><MessageBoard/></PrivateRoute>}/>
          <Route path='/messageboard/new' element={<PrivateRoute><MessageBoardNew/></PrivateRoute>}/>
          <Route path='/messageboard/:id' element={<PrivateRoute><MessageBoardDetail/></PrivateRoute>}/>
          <Route path='*' element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
