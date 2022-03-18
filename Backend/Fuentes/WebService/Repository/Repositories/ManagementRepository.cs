using Entity.Dtos;
using Microsoft.Extensions.Configuration;
using Repository.Helpers;
using Repository.Interfaces;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Repository.Repositories
{
    public class ManagementRepository : IManagementRepository
    {
        readonly IConfiguration _config;
        DBContext dbContext = new DBContext();
        DataSet dtResult;
        DataTable tblResult;
        DataTable tblPersist = new DataTable();
        SqlConnection con;

        public ManagementRepository(IConfiguration config)
        {
            _config = config;
        }

        public DataTable getServicios()
        {

            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.GET_SERVICIOS, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@status", SqlDbType.Bit).Value = true;
                        cmd.Fill(tblResult);

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
                return tblResult;
            }
        }

        public DataTable getMarcas()
        {
            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.GET_MARCAS, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@status", SqlDbType.Bit).Value = true;
                        cmd.Fill(tblResult);

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
                return tblResult;
            }
        }

        public DataTable setServicios(ServiciosDto dto)
        {
            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.SET_SERVICIOS, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@Servicio", SqlDbType.NVarChar).Value = dto.Servicio;
                        cmd.SelectCommand.Parameters.Add("@Valor", SqlDbType.Money).Value = dto.Valor;
                        cmd.Fill(tblResult);

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
                return tblResult;
            }
        }
        public DataTable setFactura(FacturaDto dto)
        {
            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.SET_FACTURA, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@placa", SqlDbType.NVarChar).Value = dto.Placa;
                        cmd.SelectCommand.Parameters.Add("@propietario", SqlDbType.NVarChar).Value = dto.Propietario;
                        cmd.SelectCommand.Parameters.Add("@tipoIdentificacion", SqlDbType.NVarChar).Value = dto.TipoIdentificacion;
                        cmd.SelectCommand.Parameters.Add("@identificacion", SqlDbType.NVarChar).Value = dto.Identificacion;
                        cmd.SelectCommand.Parameters.Add("@marcaID", SqlDbType.Int).Value = dto.MarcaID;
                        cmd.SelectCommand.Parameters.Add("@modelo", SqlDbType.NVarChar).Value = dto.Modelo;
                        cmd.SelectCommand.Parameters.Add("@mecanica", SqlDbType.NVarChar).Value = dto.Mecanica;
                        cmd.SelectCommand.Parameters.Add("@latoneria", SqlDbType.NVarChar).Value = dto.Latoneria;
                        cmd.SelectCommand.Parameters.Add("@pintura", SqlDbType.NVarChar).Value = dto.Pintura;
                        cmd.Fill(tblResult);

                        tblPersist = tblResult;

                        foreach (ServiciosDto service in dto.servicios)
                        {
                            buildServices(service, (int)tblPersist.AsEnumerable().First()["Estado"]);
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
                return tblPersist;
            }
        }

        private void buildServices(ServiciosDto dto, int facturaID) {
            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    tblResult = new DataTable();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.SET_FACTURA_SERVICIOS, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@FacturaID", SqlDbType.Int).Value = facturaID;
                        cmd.SelectCommand.Parameters.Add("@ServicioID", SqlDbType.Int).Value = dto.ServicioID;
                        cmd.SelectCommand.Parameters.Add("@ValorServicio", SqlDbType.Money).Value = dto.Valor;
                        cmd.Fill(tblResult);

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
            }
        }

        public DataSet getFactura(int FacturaID)
        {

            using (con = new SqlConnection(dbContext.ObtenerCadenaDbConexSQL(_config["config:urlConex"])))
            {
                try
                {
                    dtResult = new DataSet();
                    con.Open();
                    if (con.State == ConnectionState.Open)
                    {
                        SqlDataAdapter cmd = new SqlDataAdapter(STORE_PROCEDURES.GET_FACTURA, con);
                        cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                        cmd.SelectCommand.Parameters.Add("@FacturaID", SqlDbType.Int).Value = FacturaID;
                        cmd.Fill(dtResult);

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
                return dtResult;
            }
        }

    }
}
