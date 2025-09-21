import React from 'react';
import Timer from './Timer';
import '../styles/Timer.css';

const QuestionDisplay = ({ question }) => {
  return (
    <div className="question-container">
      <h2>題目 {question.id}</h2>
      <p className="points">分數: {question.points}</p>
      
      <div className="question-content">
        <p>{question.question}</p>
        
        {Array.isArray(question.options) && question.options[0] !== "請簡答" ? (
          <div className="options-list">
            {question.options.map((option, index) => (
              <div key={index} className="option">
                {option}
              </div>
            ))}
          </div>
        ) : (
          <div className="free-answer">
            <p>請作答</p>
          </div>
        )}
      </div>

      {question.timeLimit && (
        <div className="timer-section">
          <Timer initialTime={question.timeLimit} />
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay; 