using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Security.Helpers
{
    public class Config
    {
        readonly IConfiguration _config;

        public Config(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration returnConfig()
        {
            return _config;
        }
    }
}
