using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using ServiceUrl;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace UnitTest
{
    public class testClientProvider
    {
        public HttpClient client { get; private set; }
        public testClientProvider()
        {
            var server = new TestServer(new WebHostBuilder().UseStartup<Startup>());

            client = server.CreateClient();
        }
    }
}
