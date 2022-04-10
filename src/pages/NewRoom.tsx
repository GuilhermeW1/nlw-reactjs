import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';


import '../styles/auth.scss';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import {  push, ref } from 'firebase/database';
import { useAuth } from '../hooks/useAuth';



export function NewRoom(){
  const { user } = useAuth();
  const history = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) 
  {
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }


    const roomRef = ref(database, 'rooms');
    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    })

    history(`/admin/rooms/${firebaseRoom.key}`)
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
  
        <h2>Criar uma nova Sala</h2>

        <form onSubmit={handleCreateRoom}>
          <input type="text"
          placeholder="Nome da sala" 
          onChange={event => setNewRoom(event.target.value)}
          value={newRoom}
          />
          <Button type="submit">
            Criar sala
          </Button>
        </form>

        <p>
          Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
        </p>
        </div>
      </main>
    </div>
  )
}