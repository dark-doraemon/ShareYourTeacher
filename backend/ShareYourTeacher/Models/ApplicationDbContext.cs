using System;
using Microsoft.EntityFrameworkCore;

namespace ShareYourTeacher.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }

    DbSet<Message> Message { get; set; }
    DbSet<User> User { get; set; }
    DbSet<RoomMember> RoomMember { get; set; }
    DbSet<Room> Room { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RoomMember>().HasKey(rm => new { rm.UserId, rm.RoomId });

        modelBuilder.Entity<RoomMember>(rm =>
        {
            rm.HasOne(rm => rm.User)
            .WithMany(u => u.RoomMembers)
            .HasForeignKey(rm => rm.UserId);
        });

        modelBuilder.Entity<RoomMember>(rm =>
        {
            rm.HasOne(rm => rm.Room)
            .WithMany(u => u.RoomMembers)
            .HasForeignKey(rm => rm.RoomId);
        });

        modelBuilder.Entity<User>().HasKey(u => u.UserId);
        modelBuilder.Entity<Room>().HasKey(r => r.RoomId);
        modelBuilder.Entity<Message>(m => {
            m.HasKey(m =>m.MessageId);
            m.HasOne(m => m.Room)
            .WithMany(r => r.Messages)
            .HasForeignKey(m => m.RoomId);
        });

    }

}
