using DailyRouine.Application.Authorization.User;
using DailyRouine.Application.Authorization.User.Dtos;
using DailyRoutine.Core.Authorization.User;
using DailyRoutine.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DailyRoutine.Web.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {

        [HttpGet]
        [Route("/UserList")]
        public ActionResult UserList()
        {
            var context = new DailyRoutineDbContext();
            return new JsonResult(context.Users.ToList());
        } 

        [HttpPost]
        [Route("/LogIn")]
        public ActionResult LogIn(LoginInput input)
        {
            try
            {
                var userAppService = new UserAppService();
                var loginUser = userAppService.LogIn(input);
                return new JsonResult(loginUser);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }
        [HttpPost]
        [Route("/SingUp")]
        public ActionResult SingUp(RegisterInput input)
        {
            var userAppService = new UserAppService();
            var user = userAppService.SingUp(input);
            return new JsonResult(user);
        }
        
        [HttpPost]
        [Route("/SearchUser")]
        public ActionResult SearchUser(LoginInput input)
        {
            var userAppService = new UserAppService();
            var user = userAppService.SearchUser(input);
            return new JsonResult(user);
        }



    }
}
