import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom

const Questions = () => {
  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [points, setPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isOptionSelected, setIsOptionSelected] = useState(false); // Track if an option is selected
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await axios.get("/api");
        setQuestion(fetch.data.questions);
        setOptions(fetch.data.questions);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  const handleOptionClick = (selectedOption) => {
    if (isOptionSelected) return; // Prevent further selection if an option is already selected

    setIsOptionSelected(true); // Mark that an option has been selected
    setSelectedAnswer(selectedOption); // Track the selected option
    const result = selectedOption.is_correct;
    console.log(selectedOption.is_correct);

    if (result) {
      setIsCorrect(true);
      console.log("Correct!");
      setPoints((prevPoints) => prevPoints + 4);
    } else {
      setIsCorrect(false);
      setPoints((prevPoints) => prevPoints - 1); // Decrease points by 1 for incorrect answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < question.length - 1) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
      setIsOptionSelected(false); // Reset option selection for the next question
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      // Navigate to the result page
      console.log(points);
      navigate("/result", { state: { points } });
    }
  };

  return (
    <div className="container mx-auto p-8 bg-slate-600 min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center h-screen flex-col">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <div className="text-4xl font-semibold my-4">BEST OF LUCK❤️</div>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center mb-4">
           
          </div>
          <div className="rounded-lg shadow-md p-6 bg-slate-400 my-4 w-full">
          <div className="w-full flex">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 mx-1 rounded ${
                    index < currentQuestion ? "bg-green-800" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 my-4">
              Question {currentQuestion + 1}. {question[currentQuestion].description}
            </h2>
            <div className="flex flex-col gap-4 px-4">
              {question[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`rounded-lg p-4 cursor-pointer transition duration-300 ${
                    selectedAnswer === option ? (option.is_correct ? "bg-green-300" : "bg-red-300") : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <p className="text-lg text-gray-700">{option.description}</p>
                </div>
              ))}
            </div>
            {isOptionSelected && (
              <div className="flex justify-end mt-4">
                {currentQuestion < question.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion} >
                  <Link
                    to={{
                      pathname: "/result",
                      state: { points },
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Result
                  </Link>
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;

