using Business.Interfaces;
using Entity.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class managementController : ControllerBase
    {
        IManagementServices _service;

        public managementController(IManagementServices Service)
        {
            _service = Service;
        }

        // Metodo GET que obtiene todas las aeronaves
        [HttpGet]
        [Route("getServicios")]
        public IEnumerable<ServiciosDto> getServicios()
        {
            return _service.getServicios();
        }

        // Metodo GET que obtiene todas las aeronaves
        [HttpGet]
        [Route("getMarcas")]
        public IEnumerable<MarcasDto> getMarcas()
        {
            return _service.getMarcas();
        }
        // Metodo GET que obtiene todas las aeronaves
        [HttpPost]
        [Route("setServicios")]
        public ResultDto setServicio(ServiciosDto dto)
        {
            return _service.setServicios(dto);
        }
        // Metodo SET que graba una factura
        [HttpPost]
        [Route("setFactura")]
        public ResultDto setFactura(FacturaDto dto)
        {
            return _service.setFactura(dto);
        }

        [HttpGet]
        [Route("getFactura/{id}")]
        public FacturaDto getFactura(int id)
        {
            return _service.getFactura(id);
        }

    }
}
