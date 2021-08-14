using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.Data.Models;
using api.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class MakesController : BaseApiController
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public MakesController(ApplicationDBContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MakeDto>>> GetMakes()
        {
            var makes = await _context.Makes.Include(m => m.Models)
            .ProjectTo<MakeDto>(_mapper.ConfigurationProvider).ToListAsync();
            return Ok(makes);
        }
    }
}