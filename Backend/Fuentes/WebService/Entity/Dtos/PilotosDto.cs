using System;

namespace Entity.Dtos
{
    public class PilotosDto
    {
        public int id { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public int? idAeronave { get; set; }
        public string aeronave { get; set; }
        public bool estado { get; set; }
        public DateTime fechaCreacion { get; set; }
    }
}
