using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRouine.Application.Routine.Dtos
{
    public class GetRoutineInput
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
    }
}
