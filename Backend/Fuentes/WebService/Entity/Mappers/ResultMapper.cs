using Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

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
                    Transaction = Convert.ToInt32(table.AsEnumerable().First()["Transaccion"]),
                    Message = table.AsEnumerable().First()["Mensaje"].ToString(),
                    status = table.AsEnumerable().First()["Estado"].ToString()
                };

            }
            return result;
        }
    }
}
