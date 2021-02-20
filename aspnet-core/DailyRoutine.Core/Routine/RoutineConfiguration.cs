using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRoutine.Core.Routine
{
    public class RoutineConfiguration : IEntityTypeConfiguration<Routine>
    {
        public void Configure(EntityTypeBuilder<Routine> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Summary).HasMaxLength(50);
            builder.Property(x => x.Description).HasMaxLength(255);
        }
    }
}
