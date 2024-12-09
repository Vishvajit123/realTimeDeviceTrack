const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const socketio = require("socket.io");
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());


const server = http.createServer(app);
const io = socketio(server);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id , ...data});
    });
    console.log("A user connected");
    
    socket.on("disconnect", function(){
io.emit("user-disconnect", socket.id);
    })
});

// Render the main page
app.get("/", function(req, res){
    res.render("index");
});

// Start the server
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
