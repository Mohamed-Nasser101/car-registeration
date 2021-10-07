using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class RemovePhotoUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Photos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Photos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
