using Entity.Dtos;
using System.Collections.Generic;

namespace Business.Interfaces
{
    public interface IManagementServices
    {
        List<ServiciosDto> getServicios();
        List<MarcasDto> getMarcas();
        ResultDto setServicios(ServiciosDto dto);
        ResultDto setFactura(FacturaDto dto);
        FacturaDto getFactura(int facturaID);


        List<AeronavesDto> getAeronaves();
        ResultDto setAeronaves(AeronavesDto dto);
        ResultDto putAeronaves(AeronavesDto dto, int id);
        ResultDto deleteAeronaves(int id);

        List<PilotosDto> getPilotos();
        ResultDto setPilotos(PilotosDto dto);
        ResultDto putPilotos(PilotosDto dto, int id);
        ResultDto deletePilotos(int id);

        ResultDto setReservas(ReservasDto dto);
    }
}
