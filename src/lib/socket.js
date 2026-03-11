import { Server } from "socket.io";

export function initSocket(server){

  const io = new Server(server);

  io.on("connection",(socket)=>{

    console.log("User connected");

    socket.on("orderStatusUpdate",(data)=>{

      io.emit("orderUpdate",data);

    });

  });

}