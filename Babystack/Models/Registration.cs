using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models;

[NotMapped]
public class Registration 
{
    public required string Username {get; set;}
    public required string Password {get; set;}
    public required string Name {get; set;}

    [Display(Name = "Date of Birth")]
    [DataType(DataType.Date)]
    public required DateTime DoB { get; set; }

}