using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Models
{   
    public class Doctor : Users
    {
        [NotMapped]
        private List<string> Specs{ get; set; } = new List<string>
        {
            new string("Home"),
            new string("ENT"),
            new string("Dermatologist"),
            new string("Opthamologist"),
            new string("Neurologist"),
            new string("Orthopedist"),
            new string("Pediatrician")
        };
        private string _Spec;
        public required string Spec
        {
            get { return _Spec; }
            set { _Spec = (value != null && Specs.Contains(value.ToString())) ? value : throw new ArgumentException("Invalid Specialization!"); }
        }
    }
}