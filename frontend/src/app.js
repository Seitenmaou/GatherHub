import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import SignUp from './users/signup'
// import Login from './users/login'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          {/*<Route path="/login" element={<Login/>} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
