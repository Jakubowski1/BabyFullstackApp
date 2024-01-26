using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserStore<Users> _userStore;

        private readonly ClinicDbContext _context;

        public RegistrationController(SignInManager<Users> signInManager, UserManager<Users> userManager, RoleManager<IdentityRole> roleManager, IUserStore<Users> userStore, ClinicDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _userStore = userStore;
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Patient>> PostRegistration(Registration usr)
        {
            var user = new Patient{
                Name = usr.Name,
                DoB = usr.DoB
            };
            await _userStore.SetUserNameAsync(user, usr.Username, CancellationToken.None);
            var result = await _userManager.CreateAsync(user, usr.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "PATIENT");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(user);
            }
            return NotFound();
        }

    }
}