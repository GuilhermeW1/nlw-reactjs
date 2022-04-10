import { useNavigate  } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { database } from '../services/firebase';


export function Home(){
  const history = useNavigate();
  const { user, signInWithGoolge } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom()
  {
    if(!user){
      await signInWithGoolge();
    }
    history('/rooms/new');
  }

  async function  handleJoinRoom(event: FormEvent)
  {
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    
    const dbRef = ref(database);
    await  get(child(dbRef, `rooms/${roomCode}`)).then((snapshot) => {
    if (!snapshot.exists()) {
        alert('Room does not exist');
        return;
              
    }else if(snapshot.val().endedAt){
      alert('Room already close');
        return;
    }else{ 
        history(`rooms/${roomCode}`);
    }
    }).catch((error) => {
      console.error(error);
    });
    

  }

  

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      
      <main>
        
        <div className="main-content">
          <img src={logoImage} alt="Imagem da logo Letmeask" />
        
        
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIconImg} alt="Logo google" />
          Cire sua sala com o Google
        </button>
        
        <div className="separator">ou entre em uma sala</div>
        
        <form onSubmit={handleJoinRoom}>
          
          <input type="text"
          placeholder="Digite o código da sala" 
          onChange={event => setRoomCode(event.target.value)}
          value={roomCode}
          />
        
          <Button type="submit">
            Entrar na sala
          </Button>

        </form>
        </div>
      </main>
    </div>
  )
}