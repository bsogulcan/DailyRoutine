using DailyRoutine.Core.Authorization.User;
using DailyRoutine.Core.Routine;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRoutine.EntityFrameworkCore
{
    public class DailyRoutineDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost; Database=DailyRoutine; Trusted_Connection=True;");
            optionsBuilder.UseLazyLoadingProxies();

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .ApplyConfiguration(new UserConfiguration())
                .ApplyConfiguration(new RoutineConfiguration());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Routine> Routines { get; set; }
    }
}
