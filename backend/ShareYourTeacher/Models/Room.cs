namespace ShareYourTeacher.Models
{

    //conversation
    public class Room
    {
        public string RoomId { get; set; }
        public string RoomName {  get; set; }
        public string Quantity { get; set; }
        public string QR {  get; set; }

        public IList<RoomMember> RoomMembers{ get; set; }
        public IList<Message> Messages{ get; set; }
    }
}
