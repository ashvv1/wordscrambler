import './App.css';
import { useEffect, useState } from 'react';
import Prompt from './Components/Prompt'
import Inputs from './Components/Inputs';
function App() {

  const [counter, setCounter] = useState(1);
  const [level, setLevel] = useState(0);
  const [sentence, setSentence] = useState('');
  const [sentenceShuffled, setShuffled] = useState('');
  const [fetched, setFetch] = useState(false);
  const [finished, setFinished] = useState(false);
  const [guessed, setGuessed] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScore, setroundScore] = useState(500);
  const [gameTime, setTime] = useState(0);
  const [roundFinished, setroundFinished] = useState(false);
  const [scorePlus, setScorePlus] = useState(0);

  useEffect( () => {
  const timeClock = setTimeout(()=>{
    setTime(gameTime+1);
    setroundScore(roundScore - 2)
  }, 1000);

  return () => clearTimeout(timeClock);

}, [gameTime, roundScore])



 useEffect(()=>{
  const getSentence = async () => {
    await fetch(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then(response => response.json())
      .then(data => {
        setSentence(data.data.sentence.toString());
        setShuffled(data.data.sentence.toString().shuffle());
      })
  }
  if (!fetched) {
    setFetch(true);
    getSentence();
  }

  if (guessed === 0 && !finished && sentence) {
    setTimeout(() => document.getElementById('0').focus(), 250);
    setTimeout(() => document.getElementById('0').disabled = false, 250);
  };
 }, [counter, fetched, finished, guessed, sentence]);

  // eslint-disable-next-line no-extend-native
  String.prototype.shuffle = function () {
    let oldSentence = this;
    let oldArray = oldSentence.split(" ");
    let newArray = [];
    oldArray.forEach(word => {
      let wordArray = word.split("");
      if (wordArray.length > 3) {
        for (let l = wordArray.length - 2; l > 1; l--) {
          let r = Math.floor(Math.random() * (l - 2) + 1);
          let temp = wordArray[l];
          wordArray[l] = wordArray[r];
          wordArray[r] = temp;

        }
        newArray.push(wordArray.join(""));
      }
      else {
        newArray.push(word);
      }
    })
    return (newArray.join(" "))
  };

  const upLevel = () => {
    if (counter === 10) {
      setSentence("")
      setFinished(true)
    } else {
      setSentence("")
      setCounter(counter + 1);
      setFetch(false);
      setLevel(level + 1);
      setGuessed(0);
      setTime(0);
      setroundFinished(false);
    }
  }

  const completeLevel = () => {
    document.getElementById('nextButton').style.display = 'flex';
    setroundFinished(true);
    setTime(0);
    setScore(score+roundScore);
    setScorePlus(roundScore);
    setroundScore(500);
  }

  if (sentence.length > 1 && fetched) {
    return (
      <div className="App">
        <div className="Container">
          <Prompt sentenceShuffled={sentenceShuffled} level={level} score={score} upLevel={upLevel} />
          <p>{roundFinished?(`+${scorePlus} POINTS`):(`Timer: ${gameTime}`)}</p>
          <div className="Letters">
            <Inputs sentence={sentence} completeLevel={completeLevel}></Inputs>
          </div>
          <div>
            <button style={{ display: 'none' }} id='nextButton' onClick={e => upLevel()}>Next</button>
          </div>
        </div>
      </div>
    )
  };

  if (sentence.length >1 && !fetched) {
    return (
      <div>LOADING NEXT ROUND</div>
    )
  }

  if (sentence.length > 1) {
    return (
      <div className="App">
        <div className="Container">
          <Prompt sentenceShuffled={sentenceShuffled} level={level} score={score} upLevel={upLevel} />
          {(<p>Timer: {gameTime}</p>)}
          <div className="Letters">
            <Inputs sentence={sentence} completeLevel={completeLevel}></Inputs>
          </div>
          <div>
            <button style={{ display: 'none' }} id='nextButton' onClick={e => upLevel()}>Next</button>
          </div>
        </div>
      </div>
    )
  };

  if (finished) {
    return (
      <div className="App">
        <div style={{ minHeight: 'auto', padding: 0 }} className="Container">
          <div>{`TOTAL SCORE: ${score}`}</div>
          <p>leaderboard coming soon.</p>
        </div>
      </div>
    )
  }

}

export default App;
