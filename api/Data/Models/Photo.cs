using System.ComponentModel.DataAnnotations;

namespace api.Data.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        [Required] [StringLength(50)] public string Name { get; set; }
    }
}