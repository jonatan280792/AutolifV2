using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Repository.Helpers
{
    public class DBContext
    {
        public string ObtenerCadenaDbConexSQL(string urlPath)
        {
            DataSet dst = new DataSet();            
            dst.ReadXml(urlPath);
            DataRow dr = dst.Tables[0].Rows[0];
            return dr["SQL"].ToString();
        }
    }
}
