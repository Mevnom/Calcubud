// EquationQuizGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './EquationGenerator.css';

const EquationQuizGame = () => {
  const modes = {
    basic: { timePerQ: 20, count: 30 },
    medium: { timePerQ: 40, count: 35 },
    expert: { timePerQ: 60, count: 40 },
    pro: { timePerQ: 80, count: 45 },
  };

  const [mode, setMode] = useState('basic');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [start, setStart] = useState(false);
  const [schwifty, setSchwifty] = useState(false);
  const [summary, setSummary] = useState(false);
  const [score, setScore] = useState(0);


  const intervalRef = useRef(null);
  const schwiftyTimeout = useRef(null);
  const schwiftyAudioRef = useRef(null);


  const generateEquations = (mode) => {
    const count = modes[mode].count;
    let qArr = [];
    for (let i = 0; i < count; i++) {
      let eq = '', ans = 0;

      if (mode === 'basic') {
        const a = Math.floor(Math.random() * 50);
        const b = Math.floor(Math.random() * 50);
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        eq = `${a} ${op} ${b}`;
        ans = eval(eq);
      } else if (mode === 'medium') {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        eq = `${a}/${b}`;
        ans = (a / b).toFixed(2);
      } else if (mode === 'expert') {
        const x = Math.floor(Math.random() * 10) + 1;
        const result = Math.floor(Math.random() * 20) + 1;
        const a = Math.floor(Math.random() * 10) + 1;
        const b = result - a * x;
        eq = `${a}x + ${b} = ${result}`;
        ans = x;
      } else if (mode === 'pro') {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10);
        const x = Math.floor(Math.random() * 10) + 1;
        const result = a * x * x + b * x + c;
        eq = `${a}x² + ${b}x + ${c} = ${result}`;
        ans = x;
      }

      qArr.push({ eq, ans });
    }
    setQuestions(qArr);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    generateEquations(newMode);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setTimeLeft(modes[newMode].timePerQ * modes[newMode].count);
    setStart(true);
    setSummary(false);
  };

  useEffect(() => {
    if (start && !schwifty && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [start, schwifty]);

  useEffect(() => {
    if (timeLeft <= 0 && start) {
      calculateScore();
      setSummary(true);
      setStart(false);
    }
  }, [timeLeft, start]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleAnswer = (e) => {
    const val = e.target.value;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = val;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateScore = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (
        userAnswers[i] !== undefined &&
        String(q.ans).trim() === String(userAnswers[i]).trim()
      ) {
        s += 1;
      }
    });
    setScore(s);
  };


  const finishGame = () => {
    const confirmFinish = window.confirm("Are you sure you want to finish the game?");
    if (confirmFinish) {
      clearInterval(intervalRef.current);
      calculateScore();
      setSummary(true);
      setStart(false);
    }
  };

  const toggleSchwifty = () => {
    setSchwifty(true);
    clearInterval(intervalRef.current);
    document.body.classList.add('schwifty');

    // Play audio
    if (schwiftyAudioRef.current) {
      schwiftyAudioRef.current.currentTime = 0;
      schwiftyAudioRef.current.play().catch((err) => console.error('Audio error:', err));
    }

    schwiftyTimeout.current = setTimeout(() => {
      setSchwifty(false);
      document.body.classList.remove('schwifty');
    }, 60000);
    /*  console.log('Get Schwiftyy activated! 👽🔥');
     alert('Get Schwiftyy activated! 👽🔥, you have 1 minute to get schwifty after which the game resumes'); */
  };


  const renderSummary = () => (
    <div className="summary">
      <h2>-Summary-</h2>
      <p>You answered {userAnswers.filter((a) => a !== undefined).length} out of {questions.length} questions.</p>
      <p><strong>Cumulative Score: {score}</strong> ✅</p>
      <ol>
        {questions.map((q, i) => (
          <li key={i}>
            Question: ( {q.eq} ) <br /><br /> Correct Answer: {q.ans} <br /><br /> Your Answer: {userAnswers[i] || 'null, Olodo.'} <br /><div>
              <br />
            </div>
          </li>
        ))}
      </ol>
      <span>
        <button>
          <a href="https://mevnom.github.io/calcubud/" className='rt'> Restart Game</a>
        </button>
      </span>
    </div>
  );

  return (
    <div className={`equation-generator ${summary ? 'summary-active' : ''}`}>
      <div className='Timer-div'> <p>Timer: {formatTime(timeLeft)}</p>
      </div><br />
      {!start && !summary && (
        <div className='mode-spandiv' >
          <span className='mode-span'>
            <button onClick={(e) => handleModeChange(e.target.value)} value={'basic'}>Basic Mode</button>
            <button onClick={(e) => handleModeChange(e.target.value)} value={'medium'}>Medium Mode</button>
            <button onClick={(e) => handleModeChange(e.target.value)} value={'expert'}>Expert Mode</button>
            <button onClick={(e) => handleModeChange(e.target.value)} value={'pro'}>Pro Mode🔥</button>
          </span>
          <span className='mode-spandeux'>
            <h2>
              Welcome to <span style={{
                color: "#FF8F00",
              }}>Calcubud!</span> Choose a mode to start playing.
            </h2>
            <br />
            <span><br />
            </span>
            <div className='note'>-read <Link to={"/about"}><span > game description </span> </Link>for full understanding- </div>
          </span>

        </div>
      )}

      {start && !summary && (
        <>
          <div className="question-section">
            <h3>{questions[currentQuestion]?.eq}</h3>
            <input
              type="number"
              value={userAnswers[currentQuestion] || ''}
              onChange={handleAnswer}
            />
            <span className='next-finish'>
              <button onClick={finishGame} style={{
                backgroundColor: 'red',
                color: 'white',
              }}>Finish</button>
              <button onClick={nextQuestion}>Next</button>
            </span>
            <button onClick={toggleSchwifty}> Get Schwiftyy 👽🔥</button>
          </div>
          <br />
          <div className="progress">
            <p>
              Progress: {userAnswers.filter((a) => a !== undefined).length}/{questions.length}
            </p>
          </div>
        </>
      )}

      {summary && renderSummary()}

      <audio
        ref={schwiftyAudioRef}
        src={`${import.meta.env.BASE_URL}get-schwifty.mp3`}
        type="audio/mpeg"
      />

    </div>
  );
};

export default EquationQuizGame;
