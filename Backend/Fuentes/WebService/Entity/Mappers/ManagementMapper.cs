using Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Entity.Mappers
{
    public static class ManagementMapper
    {
        // MAPEAR LISTA DE SERVICIOS
        public static List<ServiciosDto> AsLstServicios(this DataTable table)
        {
            List<ServiciosDto> lst = new List<ServiciosDto>();

            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    lst.Add(new ServiciosDto()
                    {
                        id = Convert.ToInt32(row["id"].ToString()),
                        nombre = row["nombre"].ToString(),
                        valor = Convert.ToDecimal(row["valor"].ToString()),
                        fechaRegistro = Convert.ToDateTime(row["fechaRegistro"].ToString()),
                        estado = Convert.ToBoolean(row["estado"].ToString()),
                    });
                }
            }

            return lst;
        }

        // MAPEAR LISTA DE MARCAS
        public static List<MarcasDto> AsLstMarcas(this DataTable table)
        {
            List<MarcasDto> lst = new List<MarcasDto>();

            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    lst.Add(new MarcasDto()
                    {
                        marcaID = (int)row["marcaID"],
                        marca = row["marca"].ToString(),
                        estado = (bool)row["estado"]
                    });
                }
            }

            return lst;
        }

        // MAPEAR FACTURA
        public static FacturaDto AsFactura(this DataSet data)
        {
            FacturaDto factura = new FacturaDto();

            List<ServiciosDto> lst = new List<ServiciosDto>();
            List<ServiciosDto> lstServicios = new List<ServiciosDto>();

            DataTable header = data.Tables[0];
            DataTable pregunta = data.Tables[1];

            if (pregunta != null)
            {
                foreach (DataRow element in pregunta.Rows)
                {
                    ServiciosDto servicio = new ServiciosDto();
                    lstServicios.Add(servicio);

                    servicio.id = (int)element["servicioID"];
                    // servicio.servicioID = (int)element["servicioID"];
                    servicio.nombre = element["nombre"].ToString();
                    servicio.valor = (decimal)element["valor"];
                }
            }

            if (header != null)
            {
                factura.facturaID = (int)header.AsEnumerable().First()["facturaID"];
                factura.placa = header.AsEnumerable().First()["placa"].ToString();
                factura.propietario = header.AsEnumerable().First()["propietario"].ToString();
                factura.tipoIdentificacion = header.AsEnumerable().First()["tipoIdentificacion"].ToString();
                factura.identificacion = header.AsEnumerable().First()["identificacion"].ToString();
                factura.marcaID = (int)header.AsEnumerable().First()["marcaID"];
                factura.marca = header.AsEnumerable().First()["marca"].ToString();
                factura.modelo = header.AsEnumerable().First()["modelo"].ToString();
                factura.total = (decimal)header.AsEnumerable().First()["total"];
                factura.mecanica = header.AsEnumerable().First()["mecanica"].ToString();
                factura.latoneria = header.AsEnumerable().First()["latoneria"].ToString();
                factura.pintura = header.AsEnumerable().First()["pintura"].ToString();
                factura.servicios = lstServicios;
            }

            return factura;
        }


        // MAPEAR CAMPOS TABLA AERONAVES    
        public static List<AeronavesDto> AsLstAeronaves(this DataTable table)
        {
            List<AeronavesDto> lst = new List<AeronavesDto>();

            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    lst.Add(new AeronavesDto()
                    {
                        id = Convert.ToInt32(row["id"].ToString()),
                        nombre = row["nombre"].ToString(),
                        idLinea = Convert.ToInt32(row["idLinea"].ToString()),
                        linea = row["linea"].ToString(),
                        capacidad = Convert.ToInt32(row["capacidad"].ToString()),
                        descripcion = row["descripcion"].ToString(),
                        estado = Convert.ToBoolean(row["estado"].ToString()),
                        fechaCreacion = Convert.ToDateTime(row["fechaCreacion"].ToString())
                    });
                }
            }

            return lst;
        }

        // MAPEA LOS CAMPOS DE LA TABLA PILOTOS
        public static List<PilotosDto> AsLstPilotos(this DataTable table)
        {
            List<PilotosDto> lst = new List<PilotosDto>();

            if (table != null)
            {
                foreach (DataRow row in table.Rows)
                {
                    lst.Add(new PilotosDto()
                    {
                        id = Convert.ToInt32(row["id"].ToString()),
                        nombres = row["nombres"].ToString(),
                        apellidos = row["apellidos"].ToString(),
                        idAeronave = Convert.ToInt32(row["idAeronave"].ToString()),
                        aeronave = row["aeronave"].ToString(),
                        estado = Convert.ToBoolean(row["estado"].ToString()),
                        fechaCreacion = Convert.ToDateTime(row["fechaCreacion"].ToString())                        
                    });
                }
            }

            return lst;
        }
    }
}
