using DailyRoutine.Core.Authorization.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRoutine.Core.Routine
{
    public class Routine
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
    }
}

