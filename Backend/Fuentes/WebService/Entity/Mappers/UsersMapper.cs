using Entity.Dtos;
using System;
using System.Data;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Security.Services;

namespace Entity.Mappers
{
    public static class UsersMapper
    {
        static readonly IConfiguration _config;
        static TokenServices _tokenService = new TokenServices();
        

        public static ResponseLoginDto AsUsuario(this DataTable table)
        {
            ResponseLoginDto result = new ResponseLoginDto();

            if (table != null)
            {
                if (table.AsEnumerable().First()["codigo"].ToString() == "Ok")
                {
                    Usuario usuarioDto = new Usuario()
                    {
                        id = Convert.ToInt32(table.AsEnumerable().First()["id"]),
                        usuario = table.AsEnumerable().First()["usuario"].ToString(),
                        tipo = table.AsEnumerable().First()["tipo"].ToString(),
                        token = _tokenService.generateTokenJwt(_config, table.AsEnumerable().First()["usuario"].ToString())
                    };

                    result = new ResponseLoginDto()
                    {

                        codigo = table.AsEnumerable().First()["codigo"].ToString(),
                        usuario = usuarioDto
                    };
                } else
                {
                    result.codigo = "Error";
                }
            }
            return result;
        }
    }
}
