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
    }
}
