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
                if (table.AsEnumerable().First()["Codigo"].ToString() == "Ok")
                {
                    UsuarioDto usuarioDto = new UsuarioDto()
                    {
                        UsuarioID = (int)table.AsEnumerable().First()["UsuarioID"],
                        Usuario = table.AsEnumerable().First()["Usuario"].ToString(),
                        Tipo = table.AsEnumerable().First()["Tipo"].ToString(),
                        Token = _tokenService.generateTokenJwt(_config, table.AsEnumerable().First()["Usuario"].ToString())
                    };

                    result = new ResponseLoginDto()
                    {

                        Codigo = table.AsEnumerable().First()["Codigo"].ToString(),
                        Usuario = usuarioDto
                    };
                } else
                {
                    result.Codigo = "Error";
                }
            }
            return result;
        }
    }
}
