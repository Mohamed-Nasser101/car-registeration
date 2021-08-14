using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class FeaturesController : BaseApiController
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public FeaturesController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeatureDto>>> GetFeatures()
        {
            var features = await _context.Features.ProjectTo<FeatureDto>(_mapper.ConfigurationProvider).ToListAsync();
            return Ok(features);
        }
    }
}