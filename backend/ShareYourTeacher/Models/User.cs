using System;

namespace ShareYourTeacher.Models;

public class User
{
    public string UserId { get; set; }  

    public string Name { get; set;}
    public IList<RoomMember> RoomMembers{ get; set; } 
}
