using System;

namespace Entity.Dtos
{
    public class AeronavesDto
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int idLinea { get; set; }
        public string linea { get; set; }
        public int capacidad { get; set; }
        public string descripcion { get; set; }
        public bool estado { get; set; }
        public DateTime fechaCreacion { get; set;}
    }
}
