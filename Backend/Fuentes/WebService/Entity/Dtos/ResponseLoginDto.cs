namespace Entity.Dtos
{
    public class ResponseLoginDto
    {
        public string Codigo { get; set; }
        public UsuarioDto Usuario { get; set; }
    }

    public class UsuarioDto {
        public int UsuarioID { get; set; }
        public string Usuario { get; set; }
        public string Tipo { get; set; }
        public string Token { get; set; }
    }
}
