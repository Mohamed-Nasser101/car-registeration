using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Data.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(IdentityUser user);
    }
}