import { BrowserRouter, Route, Routes} from 'react-router-dom';

import { NewRoom } from "./pages/NewRoom";
import {Home} from "./pages/Home";

import {AuthContextProvider} from '../src/contexts/AuthContext';
import { Room } from './pages/Room';
import { AdiminRoom } from './pages/AdminRoom';



function App() {
  
  return ( 
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:id"  element={<Room />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/admin/rooms/:id" element={<AdiminRoom/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>  
    
  );
}

export default App;



/*
duvidas que tive em relacao ao roteamento e versao do react

https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type
https://www.youtube.com/watch?v=k2Zk5cbiZhg      *******
*/