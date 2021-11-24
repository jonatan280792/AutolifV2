using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Dtos
{
    public class ServiciosDto
    {
        public int id { get; set; }
        public int servicioID { get; set; }
        public string nombre { get; set; }
        public decimal valor { get; set; }
        public DateTime fechaRegistro { get; set; }
        public bool estado { get; set; }
    }
}
