using Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Interfaces
{
    public interface IUsersServices
    {
        ResponseLoginDto Login(string userName, string passWord);
    }
}
