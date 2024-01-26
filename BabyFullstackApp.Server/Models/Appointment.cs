using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public enum AppointmentStatus
    {
        Completed,
        Scheduled,
        Cancelled
    }

    public class Appointment 
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("ScheduleID")]
        public int ScheduleID { get; set; }
        
        [ForeignKey("DoctorID")]
        public string DoctorID { get; set; }
        
        [ForeignKey("PatientID")]
        public string PatientID { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public AppointmentStatus Status { get; set; }
        public virtual Doctor? Doctor { get; set; }
        public virtual Patient? Patient { get; set; }
        public virtual Schedule? Schedule { get; set; }
    }
}