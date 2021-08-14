using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace api.DTOs
{
    public class MakeDto
    {
        public MakeDto()
        {
            Models = new Collection<ModelDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelDto> Models { get; set; }
    }
}