using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Dtos
{
    public class ResultDto
    {
        public int Transaccion { get; set; }
        public string Mensaje { get; set; }
        public int Estado { get; set; }
    }
}
