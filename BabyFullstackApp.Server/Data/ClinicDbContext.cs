using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TodoApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Humanizer;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TodoApi.Data
{
    public class ClinicDbContext : IdentityDbContext<Users>
    {
        public ClinicDbContext(DbContextOptions<ClinicDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Doctor> Doctors { get; set; } = null!;
        public DbSet<Manager> Managers { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;
        public DbSet<Schedule> Schedules { get; set; } = null!;
        public DbSet<Week> Weeks { get; set; } = null!;

                protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<SelectListGroup>().HasNoKey();
            modelBuilder.Entity<Patient>().ToTable("Patients");
            modelBuilder.Entity<Doctor>().ToTable("Doctor");
            modelBuilder.Entity<Manager>().ToTable("Managers");
            modelBuilder.Entity<Appointment>().ToTable("Appointments");
            modelBuilder.Entity<Schedule>().ToTable("Schedules");
            modelBuilder.Entity<Week>().ToTable("Week");

             //Seeding a 'Administrator' role to AspNetRoles table
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole {Id = "MANAGER", Name = "Manager", NormalizedName = "MANAGER".ToUpper() });
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole {Id = "PATIENT", Name = "Patient", NormalizedName = "PATIENT".ToUpper() });
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole {Id = "DOCTOR", Name = "Doctor", NormalizedName = "DOCTOR".ToUpper() });
        }
    }
}
