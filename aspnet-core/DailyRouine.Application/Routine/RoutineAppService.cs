using DailyRouine.Application.Routine.Dtos;
using DailyRoutine.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DailyRouine.Application.Routine
{
    public class RoutineAppService : IRoutineAppService
    {
        public DailyRoutine.Core.Routine.Routine Create(CreateRoutineInput input)
        {
            var context = new DailyRoutineDbContext();

            var routine = new DailyRoutine.Core.Routine.Routine
            {
                Summary = input.Summary,
                Description = input.Description,
                Hour = input.Hour,
                Minute = input.Minute,
                UserId = input.UserId
            };

            routine = context.Routines.Add(routine).Entity;
            context.SaveChanges();
            return routine;
        }

        public void Delete(DeleteRoutineInput input)
        {
            var context = new DailyRoutineDbContext();
            var routine = context.Routines.Where(x => x.Id == input.Id).FirstOrDefault();
            context.Routines.Remove(routine);
            context.SaveChanges();
        }

        public DailyRoutine.Core.Routine.Routine Get(GetRoutineInput input)
        {
            var context = new DailyRoutineDbContext();
            var routine = context.Routines.Where(x => x.Id == input.Id).FirstOrDefault();
            return routine;
        }

        public List<DailyRoutine.Core.Routine.Routine> GetList(GetRoutineInput input)
        {
            var context = new DailyRoutineDbContext();
            var routines = context.Routines.Where(x => x.UserId == input.UserId).ToList();
            return routines;
        }

        public DailyRoutine.Core.Routine.Routine Update(UpdateRoutineInput input)
        {
            var context = new DailyRoutineDbContext();
            var routine = context.Routines.Where(x => x.Id == input.Id).FirstOrDefault();

            routine.Summary = input.Summary;
            routine.Description = input.Description;
            routine.Hour = input.Hour;
            routine.Minute = input.Minute;

            context.Routines.Update(routine);
            context.SaveChanges();
            return routine;
        }
    }
}
