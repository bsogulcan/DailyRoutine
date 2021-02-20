using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRoutine.Core.Authorization.User
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x=>x.Name).HasMaxLength(50);
            builder.Property(x=>x.Surname).HasMaxLength(50);
            builder.Property(x=>x.UserName).HasMaxLength(50);
            builder.Property(x=>x.EmailAddress).HasMaxLength(75);
            builder.Property(x=>x.Password).HasMaxLength(50);
            builder.Property(x=>x.PhoneNumber).HasMaxLength(20);
        }
    }
}
