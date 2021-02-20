using System;
using System.Collections.Generic;
using System.Text;

namespace DailyRoutine.Core.Authorization.User
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
    }
}
