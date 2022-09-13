import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { socket } from "../Chat";
import "./MessagePanel.css";

export default function MessagePanel() {
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState([]);
  const [groupId, setGroupId] = useState();
  const [firstUserId, setFirstUserId] = useState();
  const firstUserName = window.location.pathname.slice(
    window.location.pathname.lastIndexOf("/") + 1
  );

  function sendMessage() {
    if (inputVal.length > 0) {
      const date = new Date();
      socket.emit("send_userName", { userName: firstUserName });
      socket.emit("send_message", {
        message: inputVal,
        sender: firstUserName,
        groupId: groupId,
        messageTime: date,
      });
      setInputVal("");
    }
  }

  function updateScroll() {
    var element = document.getElementById("messageField");
    element.scrollTop = element?.scrollHeight;
  }

  function useEffectArman(func, arrVal) {
    const render = useRef(0);
    useEffect(() => {
      if (render.current) {
        func();
      } else {
        render.current++;
      }
    }, [arrVal]);
  }

  useEffectArman(() => {
    updateScroll();
  }, [message]);

  useEffect(() => {
    socket.on("send_message", (data) => {
      const user = data?.connection.find((el) => {
        return el.id === socket.id;
      });
      if (user?.getMessage) {
        setMessage(data?.messages);
      }
    });
    socket.on("get_messages", (data) => {
      setGroupId(data?.groupId);
      setFirstUserId(data.firstUserId);
      const user = data?.connection.find((el) => {
        return el.id === socket.id;
      });
      if (user?.getMessage) {
        setMessage(data?.messages);
      }
    });
  }, []);

  return message.length > 0 ? (
    <div className="messagePanel">
      <div className="messageField" id="messageField">
        {message.map((el, i, arr) => {
          if (el?.senderid === firstUserId) {
            return (
              <div className="user1" key={i}>
                <h4>{el.message}</h4>
                {firstUserId === el.senderid && el.read ? (
                  <DoneAllIcon sx={{ fontSize: "small" }} />
                ) : (
                  ""
                )}
              </div>
            );
          } else {
            return (
              <div className="user2" key={i}>
                <h4>{el.message}</h4>
                {firstUserId === el.senderid
                  ? el.read && <DoneAllIcon sx={{ fontSize: "small" }} />
                  : ""}
              </div>
            );
          }
        })}
      </div>

      <div className="inputAndBtMessage">
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          value={inputVal}
          maxRows={2}
          sx={{ width: "222%" }}
          onChange={(event) => {
            setInputVal(event.target.value);
          }}
        />
        <Button sx={{ width: "30%" }} variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  ) : (
    ""
  );
}
