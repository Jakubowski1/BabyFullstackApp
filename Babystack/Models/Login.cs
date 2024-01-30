using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models;

[NotMapped]
public class LoginModel
{
    public required string Username {get; set;}
    public required string Password {get; set;}
}