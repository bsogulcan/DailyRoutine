using DailyRouine.Application.Authorization.User.Dtos;
using DailyRoutine.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyRouine.Application.Authorization.User
{
    public class UserAppService : IUserAppService
    {
        public UserAppService()
        {

        }

        public DailyRoutine.Core.Authorization.User.User LogIn(LoginInput input)
        {
            var context = new DailyRoutineDbContext();
            var user = context.Users.Where(x => x.UserName == input.UserName && x.Password == input.Password).FirstOrDefault();
            if (user!=null)
            {
                return user;
            }
            else
            {
                throw new Exception("User Not Found");
            }

        }

        public List<DailyRoutine.Core.Authorization.User.User> SearchUser(LoginInput input)
        {
            var context = new DailyRoutineDbContext();
            var users = context.Users.Where(x => x.UserName.Contains(input.UserName)||x.Name.Contains(input.UserName)||x.Surname.Contains(input.UserName)).ToList();
            return users;
        }

        public DailyRoutine.Core.Authorization.User.User SingUp(RegisterInput input)
        {
            var context = new DailyRoutineDbContext();
            if (context.Users.Where(x => x.UserName == input.UserName).Count() > 0)
            {
                return null;
            }
            else
            {
                var user = new DailyRoutine.Core.Authorization.User.User();
                user.EmailAddress = input.EmailAddress;
                user.UserName = input.UserName;
                user.Password = input.Password;
                user.Name = input.Name;
                user.Surname = input.Surname;
                user.PhoneNumber = input.PhoneNumber;
                var addedUser = context.Users.Add(user);
                context.SaveChanges();
                return addedUser.Entity;
            }
        }
    }
}
