using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Data.Models
{
    public class Make
    {
        public Make()
        {
            Models = new Collection<Model>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}