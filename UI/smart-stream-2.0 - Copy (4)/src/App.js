import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/login';
import Signup from './Pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './Context/UserProvider';
import PlaylistPage from './Pages/PlaylistPage';
import FocusRoomPage from './Pages/FocusRoomPage';
import StudyStreamPage from './Pages/StudyStreamPage';
import ClassroomPage from './Pages/ClassroomPage';
import ClassroomDetailsPage from './component/ClassroomDetailsPage';
import DocumentPage from './Pages/DocumentPage';
import DocumentDetailPage from './component/DocumentDetailPage';
import Meet from './Pages/Meet';
import RoomPage from './Pages/room/RoomPage';
import JoinMeetPage from './Pages/JoinMeetPage';
import Live from './Pages/Live';
import Room from './Pages/Room';
import Viewer from './Pages/Viewer';
import DoAnything from './Pages/DoAnything';

function App() {
  return (
   <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classroom/:classCode" element={<ClassroomDetailsPage />} />

      <Route path="/class" element={<ClassroomPage />} />
      <Route path="/login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
      <Route path="about" element={<StudyStreamPage />} />
      <Route path="/documents" element={<DocumentPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />


      <Route path="focus" element={<FocusRoomPage />} />
      <Route path="stream" element={<PlaylistPage />} />
      <Route path='/focusroom2' element={<Meet />} />
      <Route path="/room/:roomId" element={<RoomPage/>}/>
      <Route path='/join-meet' element={<JoinMeetPage />} />
      <Route path='/live'  element={<Live />}/>
        <Route path='/liveroom/:roomId'  element={<Room />}/>
        <Route path='/viewerroom/:roomId'  element={<Viewer />}/>
        <Route path='/doanything' element={<DoAnything />} />

    </Routes>
    </BrowserRouter>
    </UserProvider> 
    
  );
}

export default App;
