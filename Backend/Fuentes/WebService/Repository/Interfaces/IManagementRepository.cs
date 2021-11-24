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

        // CRUD Aeronaves
        DataTable getAeronaves();
        DataTable setAeronaves(AeronavesDto dto);
        DataTable putAeronaves(AeronavesDto dto, int id);
        DataTable deleteAeronaves(int id);


        // CRUD Pilotos
        DataTable getPilotos();
        DataTable setPilotos(PilotosDto dto);
        DataTable putPilotos(PilotosDto dto, int id);
        DataTable deletePilotos(int id);


        DataTable setReservas(ReservasDto dto);
    }
}
