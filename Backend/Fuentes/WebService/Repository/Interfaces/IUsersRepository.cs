using Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Repository.Interfaces
{
    public interface IUsersRepository
    {
        ResponseLoginDto Login(string userName, string passWord);
    }
}
