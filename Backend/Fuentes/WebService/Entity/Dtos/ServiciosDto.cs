using System;

namespace Entity.Dtos
{
    public class ServiciosDto
    {
        public int ServicioID { get; set; }
        public string Servicio { get; set; }
        public decimal Valor { get; set; }
        public DateTime FechaRegistro { get; set; }
        public bool Estado { get; set; }
    }
}
