using System.Linq;
using api.Data.Models;
using api.DTOs;
using AutoMapper;

namespace api.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Make, MakeDto>();
            CreateMap<Make, KeyValuePairDto>();
            CreateMap<Model, KeyValuePairDto>();
            CreateMap<Feature, KeyValuePairDto>();

            CreateMap<SaveVehicleDto, Vehicle>()
                .ForMember(d => d.Id, opt => opt.Ignore())
                .ForMember(d => d.ContacPhone, opt => opt.MapFrom(v => v.Contact.Phone))
                .ForMember(d => d.ContactName, opt => opt.MapFrom(v => v.Contact.Name))
                .ForMember(d => d.ContactEmail, opt => opt.MapFrom(v => v.Contact.Email))
                // .ForMember(d => d.Features,
                //  opt => opt.MapFrom(v => v.Features.Select(id => new VehicleFeature { FeatureId = id })));
                .ForMember(d => d.Features, opt => opt.Ignore())
                .AfterMap((vd, v) =>
                {
                    var removed = v.Features.Where(f => !vd.Features.Contains(f.FeatureId));
                    foreach (var item in removed) v.Features.Remove(item);

                    var added = vd.Features.Where(id => !v.Features.Select(v => v.FeatureId).Contains(id));
                    foreach (var item in added) v.Features.Add(new VehicleFeature {FeatureId = item});
                });

            CreateMap<Vehicle, SaveVehicleDto>()
                .ForMember(v => v.Contact,
                    opt => opt.MapFrom(v => new Contact
                        {Name = v.ContactName, Phone = v.ContacPhone, Email = v.ContactEmail}))
                .ForMember(v => v.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));
            CreateMap<Vehicle, VehicleDto>().ForMember(v => v.Contact,
                    opt => opt.MapFrom(v => new Contact
                        {Name = v.ContactName, Phone = v.ContacPhone, Email = v.ContactEmail}))
                .ForMember(v => v.Features,
                    opt => opt.MapFrom(v =>
                        v.Features.Select(f => new KeyValuePairDto {Id = f.Feature.Id, Name = f.Feature.Name})))
                .ForMember(d => d.Make, opt => opt.MapFrom(v => v.Model.Make));
        }
    }
}