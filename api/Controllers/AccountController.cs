using System.Threading.Tasks;
using api.Data.Interfaces;
using api.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(string username, string email, string password)
        {
            var user = new IdentityUser
            {
                UserName = username,
                Email = email
            };
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            
            var token = await _tokenService.CreateToken(user);
            var userDto = new UserDto
            {
                Username = user.UserName,
                Token = token
            };
            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();
            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!result.Succeeded) return Unauthorized();
            var token = await _tokenService.CreateToken(user);
            var userDto = new UserDto
            {
                Username = user.UserName,
                Token = token
            };
            return Ok(userDto);
        }
    }
}