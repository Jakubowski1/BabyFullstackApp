using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeekController : ControllerBase
    {
        private readonly ClinicDbContext _context;
        private readonly UserManager<Users> _userManager;

        public WeekController(ClinicDbContext context, UserManager<Users> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Week
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Week>>> GetWeeks()
        {
            return await _context.Weeks.Select(w => new Week{
                Id = w.Id,
                DoctorID = w.DoctorID,
                Start = w.Start,
                Doctor = w.Doctor
            }).ToListAsync();
        }

        // GET: api/Week/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Week>> GetWeek(int id)
        {
            var week = await _context.Weeks.FindAsync(id);

            if (week == null)
            {
                return NotFound();
            }

            return week;
        }

        // PUT: api/Week/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeek(int id, Week week)
        {
            if (id != week.Id)
            {
                return BadRequest();
            }

            _context.Entry(week).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeekExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Week
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Week>> PostWeek(Week week)
        {
            _context.Weeks.Add(week);
            var doc = await _context.Doctors.FindAsync(week.DoctorID);
            if (doc != null)
            {
                week.Doctor = doc;
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWeek), new { id = week.Id }, week);
        }

        // DELETE: api/Week/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeek(int id)
        {
            var week = await _context.Weeks.FindAsync(id);
            if (week == null)
            {
                return NotFound();
            }

            _context.Weeks.Remove(week);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeekExists(int id)
        {
            return _context.Weeks.Any(e => e.Id == id);
        }
    }
}
