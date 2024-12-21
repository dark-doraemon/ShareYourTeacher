using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ShareYourTeacher.Models;

namespace ShareYourTeacher.API.SingalR;

//hud handles client-server communication
public class DrawHub : Hub
{
    
    //client có thể gửi kiểu dữ liệu là DataImage lên nhưng không nên vì dữ liệu của nó khá lớn nên sử lí rất mất thời gian và lag
    // public async Task Draw(DataImage image)
    // {
    //     await Clients.All.SendAsync("ReceiveDrawData", image);
    // }


    //sử dụng base64 để vẽ 
    public async Task Draw(string base64Image)
    {
        await Clients.All.SendAsync("ReceiveDrawData", base64Image);
    }
}