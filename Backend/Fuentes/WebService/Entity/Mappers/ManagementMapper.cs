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
                        ServicioID = (int)row["ServicioID"],
                        Servicio = row["Servicio"].ToString(),
                        Valor = (decimal)row["Valor"],
                        FechaRegistro = (DateTime)row["FechaRegistro"],
                        Estado = (bool)row["estado"],
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
                        MarcaID = (int)row["MarcaID"],
                        Marca = row["Marca"].ToString(),
                        Estado = (bool)row["Estado"]
                    });
                }
            }

            return lst;
        }

        public static List<FacturaDto> AsLsFactura(this DataTable table)
        {
            List<FacturaDto> lsFactura = new List<FacturaDto>();

            if (table != null)
            {
                foreach (DataRow element in table.Rows)
                {
                    FacturaDto factura = new FacturaDto();
                    lsFactura.Add(factura);

                    factura.FacturaID = (int)element["FacturaID"];
                    factura.Placa = element["Placa"].ToString();
                    factura.Propietario = element["Propietario"].ToString();
                    factura.TipoIdentificacion = element["TipoIdentificacion"].ToString();
                    factura.Identificacion = element["Identificacion"].ToString();
                    factura.MarcaID = (int)element["MarcaID"];
                    factura.Marca = element["Marca"].ToString();
                    factura.Modelo = element["Modelo"].ToString();
                    factura.Total = (decimal)element["Total"];
                    factura.Mecanica = element["Mecanica"].ToString();
                    factura.Latoneria = element["Latoneria"].ToString();
                    factura.Pintura = element["Pintura"].ToString();
                    factura.FechaCreacion = (DateTime)element["FechaCreacion"];
                }
            }

            return lsFactura;
        }

        // MAPEAR FACTURA
        public static FacturaDto AsFactura(this DataSet data)
        {
            FacturaDto factura = new FacturaDto();

            List<ServiciosDto> lst = new List<ServiciosDto>();
            List<ServiciosDto> lstServicios = new List<ServiciosDto>();

            DataTable header = data.Tables[0];
            DataTable servicios = data.Tables.Count > 1 ? data?.Tables[1] : null;

            if (servicios != null)
            {
                foreach (DataRow element in servicios.Rows)
                {
                    ServiciosDto servicio = new ServiciosDto();
                    lstServicios.Add(servicio);

                    servicio.ServicioID = (int)element["ServicioID"];
                    servicio.Servicio = element["Servicio"].ToString();
                    servicio.Valor = (decimal)element["ValorServicio"];
                }
            }

            if (header != null)
            {
                factura.FacturaID = (int)header.AsEnumerable().First()["FacturaID"];
                factura.Placa = header.AsEnumerable().First()["Placa"].ToString();
                factura.Propietario = header.AsEnumerable().First()["Propietario"].ToString();
                factura.TipoIdentificacion = header.AsEnumerable().First()["TipoIdentificacion"].ToString();
                factura.Identificacion = header.AsEnumerable().First()["Identificacion"].ToString();
                factura.MarcaID = (int)header.AsEnumerable().First()["MarcaID"];
                factura.Marca = header.AsEnumerable().First()["Marca"].ToString();
                factura.Modelo = header.AsEnumerable().First()["Modelo"].ToString();
                factura.Total = (decimal)header.AsEnumerable().First()["Total"];
                factura.Mecanica = header.AsEnumerable().First()["Mecanica"].ToString();
                factura.Latoneria = header.AsEnumerable().First()["Latoneria"].ToString();
                factura.Pintura = header.AsEnumerable().First()["Pintura"].ToString();
                factura.FechaCreacion = (DateTime)header.AsEnumerable().First()["FechaCreacion"];
                factura.servicios = lstServicios;
            }

            return factura;
        }


        
    }
}
