using System;

namespace ShareYourTeacher.Models;

public class RoomMember
{
    public string UserId { get; set; }
    public string RoomId { get; set; }
    public User User { get; set; }
    public Room Room { get; set; }

    public DateTime JoinedDate { get; set; }
    public DateTime LeftDate { get; set; }
}
