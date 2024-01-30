using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class AddScheduleToAppointments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ScheduleID",
                table: "Appointments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_ScheduleID",
                table: "Appointments",
                column: "ScheduleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Schedules_ScheduleID",
                table: "Appointments",
                column: "ScheduleID",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Schedules_ScheduleID",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_ScheduleID",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "ScheduleID",
                table: "Appointments");
        }
    }
}
