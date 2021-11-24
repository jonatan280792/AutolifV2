using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Dtos
{
    public class FacturaDto
    {
        public int facturaID { get; set; }
        public string placa { get; set; }
        public string propietario { get; set; }
        public string tipoIdentificacion { get; set; }
        public string identificacion { get; set; }
        public int marcaID { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public decimal total { get; set; }
        public string mecanica { get; set; }
        public string latoneria { get; set; }
        public string pintura { get; set; }
        public List<ServiciosDto> servicios { get; set; }
        public FacturaDto()
        {
            servicios = new List<ServiciosDto>();
        }
    }
}
