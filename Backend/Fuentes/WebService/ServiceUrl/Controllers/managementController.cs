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
    public class managementController : ControllerBase
    {
        IManagementServices _service;

        public managementController(IManagementServices Service)
        {
            _service = Service;
        }

        // Metodo GET que obtiene todas las aeronaves
        [HttpGet]
        [Authorize]
        [Route("getServicios")]
        public IEnumerable<ServiciosDto> getServicios()
        {
            return _service.getServicios();
        }

        // Metodo GET que obtiene todas las aeronaves
        [HttpGet]
        [Authorize]
        [Route("getMarcas")]
        public IEnumerable<MarcasDto> getMarcas()
        {
            return _service.getMarcas();
        }
        // Metodo GET que obtiene todas las aeronaves
        [HttpPost]
        [Authorize]
        [Route("setServicios")]
        public ResultDto setServicio(ServiciosDto dto)
        {
            return _service.setServicios(dto);
        }
        // Metodo SET que graba una factura
        [HttpPost]
        [Authorize]
        [Route("setFactura")]
        public ResultDto setFactura(FacturaDto dto)
        {
            return _service.setFactura(dto);
        }

        [HttpGet]
        [Authorize]
        [Route("getFactura/{id}")]
        public FacturaDto getFactura(int id)
        {
            return _service.getFactura(id);
        }

        // Metodo GET que obtiene todas las aeronaves
        [HttpGet]
        [Authorize]
        [Route("getAeronaves")]
        public IEnumerable<AeronavesDto> getAeronaves()
        {
            return _service.getAeronaves();
        }

        // Metodo SET que graba una aeronave
        [HttpPost]
        [Authorize]
        [Route("setAeronaves")]
        public ResultDto setAeronaves([FromBody] AeronavesDto dto)
        {
            return _service.setAeronaves(dto);
        }

        // Metodo PUT que actualiza una aeronave
        [HttpPut]
        [Authorize]
        [Route("putAeronaves")]
        public ResultDto putAeronaves([FromBody] AeronavesDto dto, int id)
        {
            return _service.putAeronaves(dto, id);
        }

        // Metodo DELETE que elimina una aeronave
        [HttpDelete]
        [Authorize]
        [Route("deleteAeronaves")]
        public ResultDto deleteAeronaves(int id)
        {
            return _service.deleteAeronaves(id);
        }


        // Metodo GET que obtiene todos los pilotos
        [Authorize]
        [HttpGet]
        [Route("getPilotos")]
        public IEnumerable<PilotosDto> getPilotos()
        {
            return _service.getPilotos();
        }

        // Metodo POST que se encarga de crear un nuevo piloto
        [HttpPost]
        [Authorize]
        [Route("setPilotos")]
        public ResultDto setPilotos([FromBody] PilotosDto dto)
        {
            return _service.setPilotos(dto);
        }

        // Metodo PUT que se encarga de Actualizar un piloto
        [HttpPut]
        [Authorize]
        [Route("putPilotos")]
        public ResultDto putPilotos([FromBody] PilotosDto dto, int id)
        {
            return _service.putPilotos(dto, id);
        }

        // Metodo DELETE que elimina un piloto
        [HttpDelete]
        [Authorize]
        [Route("deletePilotos")]
        public ResultDto deletePilotos(int id)
        {
            return _service.deletePilotos(id);
        }

        // Metodo POST que se encarga de crear una reserva
        [HttpPost]
        [Authorize]
        [Route("setReservas")]
        public ResultDto setReservas([FromBody] ReservasDto dto)
        {
            return _service.setReservas(dto);
        }

        // GET: api/<libraryController>
        [HttpGet]
        public string Get()
        {
            return "El controlador sirve";
        }
    }
}
