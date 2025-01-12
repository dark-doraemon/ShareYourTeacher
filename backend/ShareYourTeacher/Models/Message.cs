using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShareYourTeacher.Models;

public class Message
{
    public string MessageId { get; set; }
    public string MessageText { get; set; }
    public DateTime SentDate { get; set; }
    public string RoomId { get; set; }
    public Room Room { get; set; }
}
