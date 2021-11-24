using Business.Interfaces;
using Entity.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class usersController : ControllerBase
    {
        IUsersServices _service;
        //TokenJwt responseToken = new TokenJwt();

        public usersController(IUsersServices Service)
        {
            _service = Service;
        }

        [HttpGet]
        public string Get()
        {
            return "El controlador sirve";
        }

        [HttpPost]
        [Route("doLogin")]
        public ResponseLoginDto Login([FromBody] LoginDto dto)
        {
            return _service.Login(dto.userName, dto.passWord);
        }
    }
}
