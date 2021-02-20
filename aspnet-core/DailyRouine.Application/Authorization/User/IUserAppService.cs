using DailyRouine.Application.Authorization.User.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DailyRouine.Application.Authorization.User
{
    public interface IUserAppService
    {
        DailyRoutine.Core.Authorization.User.User LogIn(LoginInput input);
        DailyRoutine.Core.Authorization.User.User SingUp(RegisterInput input);
        List<DailyRoutine.Core.Authorization.User.User> SearchUser(LoginInput input);
    }
}
