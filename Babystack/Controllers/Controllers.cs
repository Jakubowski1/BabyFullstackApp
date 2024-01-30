using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

namespace TodoApi.Controllers;
class Controllers : Controller
{
    private readonly ClinicDbContext _context;

    public Controllers(ClinicDbContext context)
    {
        _context = context;
    }
}
