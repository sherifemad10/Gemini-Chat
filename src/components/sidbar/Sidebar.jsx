import "./sidebar.css";
import { IoMenu } from "react-icons/io5";
import { FaPlus, FaClockRotateLeft } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import Upgrade from "../../assets/icon.png";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extened, setextened] = useState(false);
  const { changeTheme, theme, PrePrompt, setrecentPrompt, onSent, newChating } =
    useContext(Context);

  const loaddata = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${theme}`}>
      <div className="topSidebar">
        <div className="menuIcon">
          <IoMenu className="menu" onClick={() => setextened(!extened)} />
        </div>

        <div onClick={newChating} className="newChat">
          <FaPlus className="new" />
          {extened ? (
            <div className="addNew">
              <span>New Chat</span>
            </div>
          ) : null}
        </div>

        {extened ? (
          <div className="neChat">
            <p>New Chat</p>
          </div>
        ) : null}

        <div className="recentChat">
          {extened ? (
            <>
              <h3>Recent</h3>
              {PrePrompt.map((item) => {
                return (
                  <>
                    <div onClick={() => loaddata(item)} className="recentEntry">
                      <LuMessageSquare className="recent" />
                      <span>{item.slice(0, 18)}...</span>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

      <div className="bottomSidebar">
        <div className="toggel">
          <IoSunnyOutline className="light" onClick={changeTheme} />
          <FaMoon className="darks" onClick={changeTheme} />

          {extened ? (
            <>
              <span className="lights">Light</span>

              <span className="darkss">Dark</span>
            </>
          ) : null}
        </div>

        <div className="help">
          <IoMdHelpCircleOutline className="helpIcon" />
          {extened ? <span>Help</span> : null}
        </div>

        <div className="help">
          <FaClockRotateLeft className="activityIcon" />
          {extened ? <span>Activity</span> : null}
        </div>

        <div className="help">
          <CiSettings className="helpIcon" />
          {extened ? <span>Settings</span> : null}
        </div>

        {extened ? (
          <div className="upgrade">
            <img src={Upgrade} alt="Upgrade to Pro+ " />
            <span>Upgrade to Gemini Advanced</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
