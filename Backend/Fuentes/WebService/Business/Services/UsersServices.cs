using Business.Interfaces;
using Entity.Dtos;
using Entity.Mappers;
using Repository.Interfaces;
namespace Business.Services
{
    public class UsersServices : IUsersServices
    {
        // ResponseLoginDto tokenJwt = new ResponseLoginDto();
        IUsersRepository _repository;
        public UsersServices(IUsersRepository repository)
        {
            _repository = repository;
        }

        public ResponseLoginDto Login(string userName, string passWord)
        {
            return _repository.Login(userName, passWord);
        }
    }
}
