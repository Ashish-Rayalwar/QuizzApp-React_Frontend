import { useState, useContext, createContext } from "react";
import axios from "axios";
import SetupForm from "../Form/SetupForm";
import { tab } from "@testing-library/user-event/dist/tab";

const table = {
  Computers: 18,
  Comics: 29,
  Games: 15,
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); //waiting
  const [loading, setLoading] = useState(false); //loading
  const [questions, setQuestions] = useState([]); //questions
  const [index, setIndex] = useState(0); //index
  const [correct, setCorrect] = useState(0); //correct
  const [error, setError] = useState(false); //error
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "Computers",
    difficulty: "easy",
  });
  const [modal, setModal] = useState(false);
  //fetchQuestions

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setLoading(true);
      }
    } else {
      setWaiting(true);
    }
  };
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };
  const prevQuestion = () => {
    setIndex((oldIndex) => {
      console.log(oldIndex);

      const index = oldIndex - 1;
      if (index == 0) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };
  const checkAnswers = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    // let num;
    // if (category === "Science: Computers") {
    //   num = 18;
    // } else if (category === "Entertainment: Comics") {
    //   num = 29;
    // }
    console.log(table[category]);
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    // const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${num}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        modal,
        nextQuestion,
        prevQuestion,
        checkAnswers,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
