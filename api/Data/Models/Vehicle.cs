using System.Collections.ObjectModel;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace api.Data.Models
{
    public class Vehicle
    {
        public Vehicle(int id, Model model, string contactName, string contactEmail, string contacPhone)
        {
            this.Id = id;
            this.Model = model;
            this.ContactName = contactName;
            this.ContactEmail = contactEmail;
            this.ContacPhone = contacPhone;

        }
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public bool IsRegistered { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }
        [StringLength(255)]
        public string ContactEmail { get; set; }
        [Required]
        [StringLength(255)]
        public string ContacPhone { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<VehicleFeature> Features { get; set; }

        public Vehicle()
        {
            Features = new Collection<VehicleFeature>();
        }
    }
}