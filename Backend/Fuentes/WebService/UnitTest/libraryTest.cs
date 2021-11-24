using Entity.Dtos;
using FluentAssertions;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest
{
    public class libraryTest
    {
        [Fact]
        public async Task getAll()
        {
            var client = new testClientProvider().client;

            var response = await client.GetAsync("api/management/getAeronaves");

            response.EnsureSuccessStatusCode();

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        public async Task TestPost()
        {
            using (var client = new testClientProvider().client)
            {
                var response = await client.PostAsync("api/management/setAeronaves", new StringContent(
                    JsonConvert.SerializeObject(new AeronavesDto() { idLinea = 1, capacidad = 2, descripcion = "Prueba", nombre = "Nombre" } ), Encoding.UTF8, "aplication/json"));

                response.EnsureSuccessStatusCode();

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }
    }
}
