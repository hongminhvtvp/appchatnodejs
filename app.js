var express=require("express");
var app=express();
app.use(express.static("./public"));

app.set("view engine","ejs");
app.set("views","./views");



var server =require("http").Server(app);
var io=require("socket.io")(server);
server.listen(3000);
var allUsers=[];

io.on("connection",function(socket){
    console.log("Co nguoi ket noi :" + socket.id);
    socket.on("client-send-Username",function(data){
       // console.log(data);
       if(allUsers.indexOf(data)>=0){
            //that bai
            socket.emit("server-send-dki-thatbai");

       }else{
            // thanh cong
            allUsers.push(data);
            socket.userName = data;
            socket.emit("server-send-dki-thanhcong",data);
            io.sockets.emit("server-send-danhsach-Users",allUsers);
       }
    })

    socket.on("logout",function(){
        allUsers.splice(
            allUsers.indexOf(socket.userName),1
        )
        socket.broadcast.emit("server-send-danhsach-Users",allUsers);
    })

    socket.on("user-send-mess",function(data){
            io.sockets.emit("server-send-mess",{us:socket.userName,nd:data});
    })

    socket.on("toi-dang-go-chu",function(){
        var s=socket.userName + "dang go chu";
        io.sockets.emit("ai-do-dang-go-chu",s);
    })
    socket.on("stop",function(){
    
        
        io.sockets.emit("ai-do-stop-go-chu");
    })

})


app.get("/",function(req,res){
  
    res.render("trangchu");
})