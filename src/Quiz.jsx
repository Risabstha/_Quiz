import React, { useState } from 'react';
import { Questions } from "./Questionbank.jsx"
import "./Quiz.css"

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(Questions[0]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [finished, setFinished] = useState(false);        //  all the questions are finished if so then true else false
    const [score, setScore] = useState(0);      //  how many correct answers.

    function handleOption(clickedOption) {
        if (selectedOption) return;         //return: This statement causes the function to exit immediately
        if (clickedOption.id === currentQuestion.AnswerId) {
            setScore(s => s + 1);   // updater function
        }
        setSelectedOption(clickedOption);
    }
    function handleNext() {
        if (!selectedOption) return;        //return: This statement causes the function to exit immediately
        if (currentQuestion.Qid === Questions[Questions.length - 1].Qid) {
            setFinished(true);
        }
        else {
            const indexOfCurrentQuestion = Questions.findIndex((Qn) => Qn.Qid === currentQuestion.Qid);
            setCurrentQuestion(Questions[indexOfCurrentQuestion + 1]);
            setSelectedOption(null);
        }

    }
    function retry_btn() {
        setCurrentQuestion(Questions[0]);
        setSelectedOption(null);
        setFinished(null);
        setScore(0);
    }
    return (
        <> 

            <div className='quiz'>
                {finished ?
                    (<div className='end-screen'>
                        <p className='finished'>Congratulations</p>
                        <p>Your score is {((score / Questions.length) * 100).toFixed(2)}% correct result</p>
                        <button className='retry'
                            onClick={retry_btn}>
                            Retry
                        </button>
                    </div>) :
                    <>
                        <div className='info'>
                            <p className='question_count'>
                                Question {currentQuestion.Qid}
                                <span className='total_count'>/{Questions.length}</span>
                            </p>
                            <p className='question'>{currentQuestion.Question}</p>
                        </div>

                        <div className='options'>
                            {currentQuestion.Options.map((option, index) =>
                                <button key={index}
                                    onClick={() => handleOption(option)}
                                    disabled={selectedOption !== null}
                                    className={`option ${(selectedOption && option.id === selectedOption.id)
                                        ? (option.id === currentQuestion.AnswerId ? "correct" : "incorrect")
                                        : ""}`
                                    }>
                                    {option.text}
                                </button>)}
                            <button onClick={handleNext}
                                disabled={!selectedOption}
                                className='next'
                            >
                                {(currentQuestion.Qid === Questions[Questions.length - 1].Qid) ? "Finish" : "Next"}
                            </button>

                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Quiz;

// line 63 : option is a class
/* line 64 :
selectedOption && option.Qid === selectedOption.Qid: First, ensure that selectedOption is not null and that the current option matches the selected one.

(selectedOption.Qid === currentQuestion.AnswerId ? "correct" : "incorrect"): 
Then, check if the selected option is the correct answer (AnswerId), and apply the "correct" class if so, or "incorrect" if not.

The "" (empty string) is returned if no option is selected, ensuring no additional class is applied.
*/