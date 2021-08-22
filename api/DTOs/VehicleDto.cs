using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using api.Data.Models;

namespace api.DTOs
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public KeyValuePairDto Model { get; set; }
        public KeyValuePairDto Make { get; set; }
        public bool IsRegistered { get; set; }
        public Contact Contact { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<KeyValuePairDto> Features { get; set; }

        public VehicleDto()
        {
            Features = new Collection<KeyValuePairDto>();
        }
    }
}