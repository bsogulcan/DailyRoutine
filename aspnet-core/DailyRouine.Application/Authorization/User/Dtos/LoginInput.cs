using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRouine.Application.Authorization.User.Dtos
{
    public class LoginInput
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
