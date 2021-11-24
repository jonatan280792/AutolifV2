namespace Entity.Dtos
{
    public class ResponseLoginDto
    {
        public string codigo { get; set; }
        public Usuario usuario { get; set; }
    }

    public class Usuario {
        public int id { get; set; }
        public string usuario { get; set; }
        public string tipo { get; set; }
        public string token { get; set; }
    }
}
