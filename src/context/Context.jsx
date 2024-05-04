import { createContext, useState } from "react";
import runChat from "../gemini/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [Input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [PrePrompt, setPrePrompt] = useState([]);
  const [ShowResult, setShowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState(false);
  const [theme, setTheme] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 70 * index);
  };

  const newChating = () => {
    setloading(false);
    setShowResult(false);
  };

  const changeTheme = () => {
    theme === "" ? setTheme("dark") : setTheme("");
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setShowResult(true);
    setInput("");
    let Respones;
    if (prompt !== undefined) {
      Respones = await runChat(prompt);
      setrecentPrompt(prompt);
    } else {
      setPrePrompt((prev) => [...prev, Input]);
      setrecentPrompt(Input);
      Respones = await runChat(Input);
    }

    const response = await runChat(Input);
    let responseArray = response.split("**");
    let newRespones = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRespones += responseArray[i];
      } else {
        newRespones += responseArray[i];
      }
    }

    let newRespones2 = newRespones.split("*").join("   ");
    let newResponesArray = newRespones2.split(" ");
    for (let i = 0; i < newResponesArray.length; i++) {
      const nextWord = newResponesArray[i];
      delayPara(i, nextWord + " ");
    }
    setresultData(newRespones2);
    setloading(false);
  };

  // onSent()

  const contextValue = {
    PrePrompt,
    setPrePrompt,
    onSent,
    recentPrompt,
    setrecentPrompt,
    ShowResult,
    setShowResult,
    loading,
    resultData,
    Input,
    setInput,
    theme,
    setTheme,
    changeTheme,
    newChating,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
