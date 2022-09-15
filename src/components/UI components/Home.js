import { Link } from "react-router-dom";
import {logout, rtdb } from "../../firebase";
import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import "../../css/UI Style/Home.css";
function Home() {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");


  useEffect(() => {
    return onValue(ref(rtdb, "/messages"), (querySnapShot) => {
      let data = querySnapShot.val() || [];
      console.log(
        "data from rt db load is: " + JSON.stringify(data),
        Object.values(data)
      );
      setMessages(Object.values(data));
    });
  }, []);

  const handleChange = (ev) => {
    setBody(ev.target.value)
  }

  const addMsg = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();

    let updatedMsg = {
      id: time,
      username: "user22",
      body: body,
    };

    set(ref(rtdb, "messages/" + updatedMsg.id), updatedMsg);
    setMessages([...messages, updatedMsg]);
  };


  return (
    <div>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div id="chat" className="card card-position">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Chat messages</h5>
                </div>
                <div className="card-body" data-mdb-perfect-scrollbar="true">
                  {messages.map((message) => {
                    return (
                      <div className="message" key={message.id}>
                        <div className="userName">{message.username}</div>
                        <div className="msgID">{message.id}</div>
                        <div>{message.body}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <div className="input-group mb-0">
                    <input
                      onChange={handleChange}
                      value={body}
                      type="text"
                      className="form-control"
                      placeholder="Type message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      onClick={addMsg}
                      className="btn btn-warning"
                      type="button"
                      id="button-addon2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Link to={"/"}>
        <button className="logout__btn btn btn-danger btn-lg" onClick={logout}>
          Logout
        </button>
      </Link>
    </div>
  );
}

export default Home;
