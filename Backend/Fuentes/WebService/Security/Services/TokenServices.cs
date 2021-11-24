using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Security.Services
{
    public class TokenServices
    {

        public string generateTokenJwt(IConfiguration config, string userName)
        {
            var secutiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["config:keyToken"]));
            var credentials = new SigningCredentials(secutiryKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName)
            };

            var token = new JwtSecurityToken(
                issuer: config["config:issuer"],
                audience: config["config:issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );

            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodeToken;
        }
    }
}
