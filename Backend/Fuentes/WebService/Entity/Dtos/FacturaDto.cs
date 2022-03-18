using System;
using System.Collections.Generic;

namespace Entity.Dtos
{
    public class FacturaDto
    {
        public int FacturaID { get; set; }
        public string Placa { get; set; }
        public string Propietario { get; set; }
        public string TipoIdentificacion { get; set; }
        public string Identificacion { get; set; }
        public int MarcaID { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public decimal Total { get; set; }
        public string Mecanica { get; set; }
        public string Latoneria { get; set; }
        public string Pintura { get; set; }
        public DateTime FechaCreacion { get; set; }
        public List<ServiciosDto> servicios { get; set; }
        public FacturaDto()
        {
            servicios = new List<ServiciosDto>();
        }
    }
}
