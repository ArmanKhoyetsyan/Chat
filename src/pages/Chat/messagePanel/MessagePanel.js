import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from '@mui/icons-material/Done';
import { socket } from "../Chat";
import "./MessagePanel.css";

export default function MessagePanel() {
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState([]);
  const [groupId, setGroupId] = useState();
  const [firstUserId, setFirstUserId] = useState();
  const [secondUser, setSecondUser] = useState()
  const [end, setEnd] = useState(false);
  const allMessage = useRef(false)
  const firstUserName = window.location.pathname.slice(
    window.location.pathname.lastIndexOf("/") + 1
  );

  function sendMessage() {
    if (inputVal.length > 0) {
      const date = new Date();
      socket.emit("send_userName", { userName: firstUserName });
      socket.emit('get_last_messages', { secondUser: secondUser, firstUser: firstUserName })
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
    //if (message.length === 20) {
    element.scrollTop = element.scrollHeight;
    // } else if (inputVal) {
    //   element.scrollTop = element.scrollHeight
    // }
    // else {
    //   element.scrollTop = 250
    // }
  }

  function useEffectArman(func, arrVal) {
    const render = useRef(0);
    useEffect(() => {
      if (render.current > 2) {
        func();
      } else {
        render.current++;
      }
      // eslint-disable-next-line
    }, [arrVal]);
  }

  useEffect(() => {
    socket.on("send_message", (data) => {
      const user = data?.connection.find((el) => {
        return el.id === socket.id;
      });
      if (user?.secondGetMessage) {
        setMessage(data?.messages);
        socket.emit('get_groupe', { userName: firstUserName })
      }
    });

    socket.on('get_my_messages', (data) => {
      setGroupId(data?.groupId);
      setFirstUserId(data.firstUserId);
      setSecondUser(data.secondUser)
      const user = data?.connection.find((el) => {
        return el.id === socket.id;
      });
      if (user?.secondGetMessage) {
        setMessage(data?.messages);
        socket.emit('get_groupe', { userName: firstUserName })
      }
    })

    socket.on("get_messages", (data) => {
      setGroupId(data?.groupId);
      setFirstUserId(data.firstUserId);
      setSecondUser(data.secondUser)
      const user = data?.connection.find((el) => {
        return el.id === socket.id;
      });
      if (user?.secondGetMessage) {
        setMessage(data?.messages);
        socket.emit('get_groupe', { userName: firstUserName })
      }
    });
    socket.on("get_former_messages", ({ messages, allMessages }) => {
      setMessage(messages)
      if (allMessages) {
        allMessage.current = true
        setEnd(true)
      }
    });
    socket.on('update_message', (data) => {
      socket.emit('get_my_messages', {
        userSecondGetMessage: data?.userSecondGetMessage,
        groupId: data?.groupId,
        firstUserId: data?.firstUserId,
        secondUser: data?.secondUser,
        firstUser: data?.firstUser
      })
    }
    )
    // eslint-disable-next-line
  }, []);

  useEffectArman(() => {
    updateScroll();
  }, []);


  useEffect(() => {
    document.getElementById("messageField")?.addEventListener('scroll', (event) => {
      if (!allMessage.current && event.target.scrollTop === 0) {
        socket.emit('get_former_messages', {
          groupId: groupId
        })
      }
    })
  })


  return message.length > 0 ? (
    <div className="messagePanel">
      <div className="messageField" id="messageField">
        {end && <h4 style={{ textAlign: 'center', fontSize: 'larger' }}>--------------------END--------------------</h4>}
        {message.map((el, i, arr) => {
          if (el?.senderid === firstUserId) {
            return (
              <div className="user1" key={i}>
                <h4>{el.message}</h4>
                {firstUserId === el.senderid && el.read ? (
                  <DoneAllIcon sx={{ fontSize: "small" }} />
                ) : (
                  <DoneIcon sx={{ fontSize: "small" }} />

                )}
              </div>
            );
          } else {
            return (
              <div className="user2" key={i}>
                <h4>{el.message}</h4>
                {firstUserId === el.senderid
                  ? el.read && <DoneAllIcon sx={{ fontSize: "small" }} />
                  : ''}
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
          onKeyDown={e => {
            if (e.keyCode === 13 && e.ctrlKey) {
              e.preventDefault()
              setInputVal(e.target.value + '\n');
              return
            }
            if (e.key === "Enter") {
              e.preventDefault()
              sendMessage()
              return
            }

          }}
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
