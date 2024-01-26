using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace TodoApi.Models
{
    [Index(nameof(Start), IsUnique = true)]
    public class Schedule
    {
        [Key]
        public int Id {get; set;}
        public DateTime Start { get; set; }
        [ForeignKey("WeekID")]
        public int WeekID {get; set;}
        public DateTime End { get; set; }
        public virtual Week? Week { get; set; }
    }

    [Index(nameof(Start), IsUnique = true)]
    public class Week
    {
        public int Id {get; set;}
        [DataType(DataType.Date)]
        public DateTime Start {get; set;}
        [ForeignKey("DoctorID")]
        public string DoctorID { get; set; }
        [DataType(DataType.Date)]
        public DateTime End => Start.AddDays(6);
        
        public virtual Doctor? Doctor { get; set; }
    }
}