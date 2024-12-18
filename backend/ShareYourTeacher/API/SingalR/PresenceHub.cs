using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ShareYourTeacher.Models;

namespace ShareYourTeacher.API.SingalR;

//hud handles client-server communication
public class PresenceHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        //gọi hàm UserIsOnline ở client và tham số muốn truyền
        await Clients.All.SendAsync("UserIsOnline", Context.ConnectionId);
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Clients.All.SendAsync("UserIsOffline", Context.ConnectionId);

        await base.OnDisconnectedAsync(exception);
    }

    public async Task Draw(DataImage image)
    {
        await Clients.All.SendAsync("ReceiveDrawData", image);
    }
}