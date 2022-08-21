import Sentence from "./Sentence";



export default function Prompt({ sentenceShuffled, score, level, upLevel }) {

    return (
        <div>
            <Sentence sentenceShuffled={sentenceShuffled} />
            <p>Guess the sentence! Start typing.</p>
            <p>The yellow blocks are meant for spaces</p>
            <div className="scores">
                <p className='Score'>Score: {score}</p>
                <p className='Score'>Level: {level}</p>
                </div>
            
        </div>
    )
}