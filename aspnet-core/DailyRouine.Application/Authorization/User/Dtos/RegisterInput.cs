using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRouine.Application.Authorization.User.Dtos
{
    public class RegisterInput
    {
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }

    }
}
