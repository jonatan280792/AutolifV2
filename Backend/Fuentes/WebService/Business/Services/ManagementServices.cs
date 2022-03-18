using Business.Interfaces;
using Entity.Dtos;
using Entity.Mappers;
using Repository.Interfaces;
using System.Collections.Generic;

namespace Business.Services
{
    public class ManagementServices : IManagementServices
    {
        IManagementRepository _repository;
        public ManagementServices(IManagementRepository repository)
        {
            _repository = repository;
        }

        // Listado de servicios
        public List<ServiciosDto> getServicios() => _repository.getServicios().AsLstServicios();
        public List<MarcasDto> getMarcas() => _repository.getMarcas().AsLstMarcas();
        // Agregar nuevo servicio
        public ResultDto setServicios(ServiciosDto dto) => _repository.setServicios(dto).AsResult();
        public ResultDto setFactura(FacturaDto dto) => _repository.setFactura(dto).AsResult();
        public FacturaDto getFactura(int facturaID) => _repository.getFactura(facturaID).AsFactura();

        
    }
}
