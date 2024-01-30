using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly ClinicDbContext _context;
        private readonly UserManager<Users> _userManager;

        public UserRolesController(ClinicDbContext context, UserManager<Users> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityUserRole<string>>>> GetUsers()
        {
            return await _context.UserRoles.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers(string id)
        {
            var UinRole = await _userManager.GetUsersInRoleAsync(id);

            if (UinRole == null)
            {
                return NotFound();
            }

            return Ok(UinRole);
        }
    }
}
