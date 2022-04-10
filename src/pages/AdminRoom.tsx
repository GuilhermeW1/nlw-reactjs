//import { push, ref } from 'firebase/database';
import deleteImg from '../assets/images/delete.svg';
import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
//import { database } from '../services/firebase';
import '../styles/room.scss';
import { ref, remove, update } from 'firebase/database';
import { database } from '../services/firebase';


type RoomParams = {
  id: string;
}


export function AdiminRoom(){
  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id !== undefined ? params.id : '';
  const { title, questions} = useRoom(roomId);
  const history = useNavigate();

  async function handleEndRoom(){
    const questionRef = ref(database, (`rooms/${roomId}`));
      
    await update(questionRef, {endedAt: new Date()});
    history('/');
  }

  async function handleDeleteQuestion(questionId:string)
  {
    if(window.confirm('Voce quer excluir')){
      const questionRef = ref(database, (`rooms/${roomId}/questions/${questionId}`));
      await remove(questionRef);
    }
  }

  async function handleCheckQuestionAsAnswered(questionId:string)
  {
    const questionRef = ref(database, (`rooms/${roomId}/questions/${questionId}`));
      await update(questionRef, {
        isAnswered: true,
      });
  }

  async function handleHilightQuestion(questionId:string)
  {
    const questionRef = ref(database, (`rooms/${roomId}/questions/${questionId}`));
      await update(questionRef, {
        isHighlighted: true,
      });
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom} >Encerrar Sala</Button>
          </div> 
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        
        
        <div className="questions-list">
          {questions.map(question =>{
            return (
              <Question 
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>

                  <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar Pergunta como respondida" />
                </button>
                
                  <button
                    type="button"
                    onClick={() => handleHilightQuestion(question.id)}
                  >
                  <img src={answerImg} alt="Destaque a pergunta" />
                  </button>
                  
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
          )
          })}
        </div>
        
      </main>
    </div>
  );
} 