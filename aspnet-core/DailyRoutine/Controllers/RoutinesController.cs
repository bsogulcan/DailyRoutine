using DailyRouine.Application.Routine;
using DailyRouine.Application.Routine.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyRoutine.Web.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoutinesController : Controller
    {
        [HttpPost]
        [Route("/CreateRoutine")]
        public ActionResult CreateRoutine(CreateRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            var routine=routineAppService.Create(input);
            return new JsonResult(routine);
        }

        [HttpPost]
        [Route("/UpdateRoutine")]
        public ActionResult UpdateRoutine(UpdateRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            var routine=routineAppService.Update(input);
            return new JsonResult(routine);
        }

        [HttpPost]
        [Route("/GetMyRoutines")]
        public ActionResult GetMyRoutines(GetRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            var routines=routineAppService.GetList(input);
            return new JsonResult(routines);
        }

        [HttpPost]
        [Route("/DeleteRoutine")]
        public ActionResult DeleteRoutine(DeleteRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            routineAppService.Delete(input);
            return new JsonResult("Success");
        }
        
        [HttpPost]
        [Route("/GetRoutine")]
        public ActionResult GetRoutine(GetRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            var routine= routineAppService.Get(input);
            return new JsonResult(routine);
        }

        [HttpPost]
        [Route("/CopyRoutine")]
        public ActionResult CopyRoutine(CreateRoutineInput input)
        {
            var routineAppService = new RoutineAppService();
            var routine= routineAppService.Create(input);
            return new JsonResult(routine);
        }

    }
}
