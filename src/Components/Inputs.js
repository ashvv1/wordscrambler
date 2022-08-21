import Input from "./Input";
import { useEffect, useState } from 'react';

export default function Inputs({ sentence, checkKey, completeLevel }) {

    useEffect(()=>{
        document.getElementById('0').focus();
    })

    //number of valid inputs
    const [numValid, setNumValid] = useState(1);
    //index for .focus()
    let letterIndex = -1;

    let myWords = sentence.split(" ");
    
    for (let i = 0; i < myWords.length - 1; i++) {
        myWords[i] = myWords[i] + " ";
    }

    const validUp = () => {
        console.log(numValid);
        console.log(sentence.length)
        setNumValid(numValid+1)
        if (numValid === sentence.length) {
            completeLevel();
            document.getElementById('nextButton').focus();
        }
    }

    const validDown = () => {
        setNumValid(numValid-1)
    }

    return (
        myWords.map((word, w) => {
            return (
                <div key={w} className='row'>
                    {word.split("").map((letter, l) => {
                        letterIndex++
                        if (letter === " ") {
                            return (
                                <div className='input' key={l}>
                                    <Input bgColorOrig="#ffb74d" checkKey={checkKey} l={l} letterIndex={letterIndex} sentence={sentence} validUp={validUp} validDown={validDown} />
                                </div>
                            )
                        } else {
                            return (
                                <div className='input' key={l}>
                                    <Input bgColorOrig="#e1e1e1" checkKey={checkKey} l={l} letterIndex={letterIndex} sentence={sentence} validUp={validUp} validDown={validDown} />
                                </div>
                            )
                        }
                    })}
                </div>
            )
        }
        )
    );
}