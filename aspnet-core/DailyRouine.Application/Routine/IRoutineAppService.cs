using DailyRouine.Application.Routine.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRouine.Application.Routine
{
    public interface IRoutineAppService
    {
        DailyRoutine.Core.Routine.Routine Get(GetRoutineInput input);
        List<DailyRoutine.Core.Routine.Routine> GetList(GetRoutineInput input);
        void Delete(DeleteRoutineInput input);
        DailyRoutine.Core.Routine.Routine Update(UpdateRoutineInput input);
        DailyRoutine.Core.Routine.Routine Create(CreateRoutineInput input);
    }
}
