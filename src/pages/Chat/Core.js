import './Chat.css'
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import {useSelector} from "react-redux"

const socket = io.connect("http://localhost:3001");

function Core() {

  const driver = useSelector(state => state.driver.user);
  const username = driver.name;
  const room = driver.mobileNo;
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      
    }
  };
  joinRoom();

  return (
    <div className="Core">
      
        <Chat socket={socket} username={username} room={room} />
      
    </div>
  );
}

export default Core;
