import "./main.css";
import User from "../../assets/sherif.jpg";
import Gemini from "../../assets/icon.png";
import { FaRegLightbulb, FaReact } from "react-icons/fa";
import { AiOutlineCompass } from "react-icons/ai";
import { MdPhoto } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    ShowResult,
    loading,
    resultData,
    setInput,
    Input,
    theme,
  } = useContext(Context);

  return (
    <div className={`main ${theme}`}>
      <div className="nav">
        <h3>Gemini</h3>
        <img className="user" src={User} alt="Profile" />
      </div>

      <div className="mainContant">
        {!ShowResult ? (
          <>
            <div className="welcome">
              <p>
                <span>Hello, Sherif</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>What are tips to improve public speaking skills?</p>
                <FaRegLightbulb className="cardIcon" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <FaRegLightbulb className="cardIcon" />
              </div>

              <div className="card">
                <p>
                  Recommend new types of water sports, including pros & cons
                </p>
                <AiOutlineCompass className="cardIcon" />
              </div>

              <div className="card">
                <p>What is react</p>
                <FaReact className="cardIcon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resultTitle">
              <img src={User} alt="user-icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="resultData">
              <img src={Gemini} alt="Gemini-image" />
              {loading ? (
                <div className="loading">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultData}</p>
              )}
            </div>
          </div>
        )}

        <div className="mainBottom">
          <div className="inputField">
            <input
              onChange={(ele) => setInput(ele.target.value)}
              value={Input}
              type="text"
              placeholder="Enter a prompt here"
            />

            <div className="inputButton">
              <label htmlFor="upload" className="Upload">
                <MdPhoto className="inputIcons icons2" />
              </label>
              <input type="file" id="upload" />

              <BsFillMicFill className="inputIcons icons2" />
              {Input ? (
                <IoMdSend onClick={() => onSent()} className="inputIcons" />
              ) : null}
            </div>
          </div>

          <p className="bottomInfo">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
            <a
              href="https://support.google.com/gemini?p=privacy_notice"
              target="blank"
            >
              Your privacy & Gemini Apps
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
