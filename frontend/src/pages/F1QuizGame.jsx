import { useState } from "react";

const SYSTEM_PROMPT = `
You are an F1 quizmaster. Ask the user a single multiple-choice question about Formula 1 (teams, drivers, circuits, or races). 
Provide 4 options (A, B, C, D) and indicate the correct answer letter at the end as "Answer: X". 
Do NOT repeat previous questions. 
Example format:
Question: Who won the 2021 F1 World Championship?
A) Lewis Hamilton
B) Max Verstappen
C) Sebastian Vettel
D) Valtteri Bottas
Answer: B
`;

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

async function fetchQuizQuestion(history) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: "Ask me a new F1 quiz question." },
  ];
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Groq API error: " + res.status);
    }
    const data = await res.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Unexpected API response");
    }
    return data.choices[0].message.content;
  } catch (err) {
    return { error: err.message || "Failed to fetch question" };
  }
}

const parseQuestion = (text) => {
  // Uncomment for debugging:
  // console.log("Groq response:", text);

  // Try to match with or without "Question:" and allow for extra whitespace/newlines
  const match = text.match(
    /(?:Question:\s*)?(.+?)\s*\nA\)\s*(.+?)\s*\nB\)\s*(.+?)\s*\nC\)\s*(.+?)\s*\nD\)\s*(.+?)\s*\nAnswer:\s*([A-D])/is
  );
  if (match) {
    return {
      question: match[1].trim(),
      options: [
        { label: "A", text: match[2].trim() },
        { label: "B", text: match[3].trim() },
        { label: "C", text: match[4].trim() },
        { label: "D", text: match[5].trim() },
      ],
      answer: match[6].trim(),
    };
  }

  // Fallback: try to extract options and answer even if format is a bit off
  const fallback = text.match(
    /(.+?)\s*\nA\)\s*(.+?)\s*\nB\)\s*(.+?)\s*\nC\)\s*(.+?)\s*\nD\)\s*(.+?)\s*\nAnswer:\s*([A-D])/is
  );
  if (fallback) {
    return {
      question: fallback[1].trim(),
      options: [
        { label: "A", text: fallback[2].trim() },
        { label: "B", text: fallback[3].trim() },
        { label: "C", text: fallback[4].trim() },
        { label: "D", text: fallback[5].trim() },
      ],
      answer: fallback[6].trim(),
    };
  }

  return null;
};

const MAX_QUESTIONS = 5;

const F1QuizGame = () => {
  const [history, setHistory] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const startQuiz = async () => {
    if (questionCount >= MAX_QUESTIONS) {
      setQuizOver(true);
      setQuiz(null);
      return;
    }
    setLoading(true);
    setSelected("");
    setShowAnswer(false);
    setError("");
    const text = await fetchQuizQuestion(history);
    if (typeof text === "object" && text.error) {
      setError(text.error);
      setLoading(false);
      return;
    }
    const parsed = parseQuestion(text);
    if (parsed) {
      setQuiz(parsed);
      setHistory([...history, { role: "assistant", content: text }]);
      setError("");
    } else {
      setError("Could not parse quiz question. Try again.");
    }
    setLoading(false);
  };

  const handleSelect = (label) => {
    setSelected(label);
    setShowAnswer(true);
    setQuestionCount((prev) => prev + 1);
    if (label === quiz.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setHistory([]);
    setQuiz(null);
    setSelected("");
    setShowAnswer(false);
    setLoading(false);
    setError("");
    setScore(0);
    setQuestionCount(0);
    setQuizOver(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-6 text-[#e10600]">F1 Quiz Game</h1>
      {quizOver ? (
        <div>
          <div className="text-2xl font-semibold mb-4">
            Quiz Over!
            <br />
            Your Score:{" "}
            <span className="text-[#0090d0]">
              {score} / {MAX_QUESTIONS}
            </span>
          </div>
          <button
            onClick={handleRestart}
            className="bg-[#e10600] text-white px-6 py-2 rounded font-semibold"
          >
            Restart Quiz
          </button>
        </div>
      ) : !quiz ? (
        <button
          onClick={startQuiz}
          className="bg-[#0090d0] text-white px-6 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : questionCount === 0
            ? "Start Quiz"
            : "Next Question"}
        </button>
      ) : (
        <>
          <div className="mb-6">
            <div className="mb-2 text-gray-600">
              Question {questionCount + 1} of {MAX_QUESTIONS}
            </div>
            <p className="text-xl font-semibold mb-4">{quiz.question}</p>
            <div className="space-y-2">
              {quiz.options.map((opt) => (
                <button
                  key={opt.label}
                  className={`block w-full text-left px-4 py-2 rounded border ${
                    showAnswer
                      ? opt.label === quiz.answer
                        ? "bg-green-100 border-green-500"
                        : selected === opt.label
                        ? "bg-red-100 border-red-500"
                        : "border-gray-300"
                      : "hover:bg-gray-100 border-gray-300"
                  }`}
                  disabled={showAnswer}
                  onClick={() => handleSelect(opt.label)}
                >
                  <span className="font-bold">{opt.label})</span> {opt.text}
                </button>
              ))}
            </div>
          </div>
          {showAnswer && (
            <div className="mb-4">
              {selected === quiz.answer ? (
                <span className="text-green-600 font-bold">Correct!</span>
              ) : (
                <span className="text-red-600 font-bold">
                  Incorrect. Correct answer: {quiz.answer}
                </span>
              )}
            </div>
          )}
          <button
            onClick={() => {
              if (questionCount >= MAX_QUESTIONS) {
                setQuizOver(true);
                setQuiz(null);
              } else {
                startQuiz();
              }
            }}
            className="bg-[#0090d0] text-white px-6 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : questionCount + 1 >= MAX_QUESTIONS
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </>
      )}
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {questionCount > 0 && !quizOver && (
        <div className="mt-4 text-gray-700">
          Score: <span className="font-bold">{score}</span> / {MAX_QUESTIONS}
        </div>
      )}
    </div>
  );
};

export default F1QuizGame;
