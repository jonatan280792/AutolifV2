using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Dtos
{
    public class ReservasDto
    {
        public string ubicacion { get; set; }
        public string llegada { get; set; }
        public string salida { get; set; }
        public int pasajeros { get; set; }
    }
}
