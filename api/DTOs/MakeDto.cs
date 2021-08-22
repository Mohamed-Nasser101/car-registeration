using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace api.DTOs
{
    public class MakeDto : KeyValuePairDto
    {
        public MakeDto()
        {
            Models = new Collection<KeyValuePairDto>();
        }
        public ICollection<KeyValuePairDto> Models { get; set; }
    }
}