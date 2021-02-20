using DailyRoutine.Core.Authorization.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRouine.Application.Routine.Dtos
{
    public class RoutineFullOutPut
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }

    }
}
