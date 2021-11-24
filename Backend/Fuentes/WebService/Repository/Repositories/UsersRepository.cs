using Entity.Dtos;
using Microsoft.Extensions.Configuration;
using Repository.Helpers;
using Repository.Interfaces;
using Security.Services;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Repository.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        TokenServices _tokenService = new TokenServices();
        readonly IConfiguration _config;
        DBContext dbContext = new DBContext();
        ResponseLoginDto resultUsuario = new ResponseLoginDto();
        
        DataTable tblResult;
        SqlConnection con;

        public UsersRepository(IConfiguration config)
        {
            _config = config;
        }

        public ResponseLoginDto Login(string userName, string passWord)
        {

            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.GET_LOGIN, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@userName", SqlDbType.VarChar).Value = userName;
                        cmd.SelectCommand.Parameters.Add("@passWord", SqlDbType.VarChar).Value = passWord;
                        cmd.SelectCommand.Parameters.Add("@status", SqlDbType.Bit).Value = true;
                        cmd.Fill(tblResult);

                        if (tblResult.AsEnumerable().First()["codigo"].ToString() == "Ok")
                        {
                            Usuario usuarioDto = new Usuario()
                            {
                                id = Convert.ToInt32(tblResult.AsEnumerable().First()["id"]),
                                usuario = tblResult.AsEnumerable().First()["usuario"].ToString(),
                                tipo = tblResult.AsEnumerable().First()["tipo"].ToString(),
                                token = _tokenService.generateTokenJwt(_config, userName)
                            };
                            resultUsuario.codigo = tblResult.AsEnumerable().First()["codigo"].ToString();
                            resultUsuario.usuario = usuarioDto;
                        } else
                        {
                            resultUsuario.codigo = "Error";
                        }

                        cmd.Dispose();
                    }
                }
                catch (SqlException ex)
                {
                    con.Close();
                    throw new InvalidOperationException("TAG: " + ex.Message + ex.ErrorCode + ex.Data, ex.InnerException);
                }
                catch (Exception)
                {
                    throw new Exception();
                }
                con.Close();
                return resultUsuario;
            }
        }

    }
}
