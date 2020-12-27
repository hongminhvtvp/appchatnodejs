
var socket=io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
        alert("Username da ton tai!");
})
socket.on("server-send-dki-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
 
})

socket.on("server-send-danhsach-Users",function(data){
    $("#boxContent").html("");    
    data.forEach(i => {
        $("#boxContent").append("<div class='user'>"+ i + "</div>")
    });
})

socket.on("server-send-mess",function(data){
        $("#listMess").append("<div class='ms'>"+ data.us+":"+data.nd+"</div>")
})

socket.on("ai-do-dang-go-chu",function(data){
    $("#thongbao").html("<img width='20px' src='dangchat.gif' />" + data);
})

socket.on("ai-do-stop-go-chu",function(){
    $("#thongbao").html("");
})

$(document).ready(function(){

    // alert(1);
    $("#chatForm").hide();
    $("#loginForm").show();
   $("#btnRegister").click(function(){
       socket.emit("client-send-Username",$("#txtusername").val())
   })

   $("#btnLogout").click(function(){
       socket.emit("logout");
       $("#chatForm").hide(2000);
       $("#loginForm").show(1000);

   })

   $("#btnSendMess").click(function(){
       socket.emit("user-send-mess",$("#txtMess").val());
   })

    $("#txtMess").focusin(function(){
        socket.emit("toi-dang-go-chu");
    })       
    
    $("#txtMess").focusout(function(){
        socket.emit("stop");
    })       


})
//client-send-Username
//server-send-dki-thatbai
//server-send-dki-thanhcong
//server-send-danhsach-Users
//logout
//co-nguoi-logout
//user-send-mess
//server-send-mess
