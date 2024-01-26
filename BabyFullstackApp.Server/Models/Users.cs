using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Identity;
using NuGet.Protocol;
using NuGet.Protocol.Plugins;

namespace TodoApi.Models
{
    public class Users : IdentityUser
    {
        private readonly UserManager<Users> _userManager;
        [PersonalData]
        public required string Name { get; set; }
        [PersonalData]
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public required DateTime DoB { get; set; }
    }
}