using Entity.Dtos;
using System.Data;
using System.Linq;

namespace Entity.Mappers
{
    public static class ResultMapper
    {
        public static ResultDto AsResult(this DataTable table)
        {
            ResultDto result = new ResultDto();

            if (table != null)
            {
                result = new ResultDto()
                {
                    Transaccion = (int)table.AsEnumerable().First()["Transaccion"],
                    Mensaje = table.AsEnumerable().First()["Mensaje"].ToString(),
                    Estado = (int)table.AsEnumerable().First()["Estado"]
                };

            }
            return result;
        }
    }
}
