using Entity.Dtos;
using System.Data;

namespace Repository.Interfaces
{
    public interface IManagementRepository
    {
        //Listado servicios
        DataTable getServicios();
        DataTable getMarcas();
        DataTable setServicios(ServiciosDto dto);
        DataTable setFactura(FacturaDto dto);
        DataSet getFactura(int facturaID);
        DataTable get_Facturas_Detalle();
    }
}
