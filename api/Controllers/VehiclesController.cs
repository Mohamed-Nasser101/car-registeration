using System;
using System.Threading.Tasks;
using api.Data;
using api.Data.Models;
using api.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class VehiclesController : BaseApiController
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public VehiclesController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<VehicleDto>> CreateVehicle([FromBody] VehicleDto vehicleDto)
        {
            var vehicle = _mapper.Map<VehicleDto, Vehicle>(vehicleDto);
            vehicle.LastUpdate = DateTime.Now;
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<Vehicle, VehicleDto>(vehicle));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<VehicleDto>> UpdateVehicle(int id, [FromBody] VehicleDto vehicleDto)
        {
            var vehicleInDb = await _context.Vehicles.Include(v => v.Features)
            .FirstOrDefaultAsync(v => v.Id == id);
            if (vehicleDto == null) return NotFound();
            _mapper.Map<VehicleDto, Vehicle>(vehicleDto, vehicleInDb);
            vehicleInDb.LastUpdate = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<Vehicle, VehicleDto>(vehicleInDb));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return NotFound();

            // _context.Vehicles.Remove(vehicle);
            _context.Remove(vehicle);
            await _context.SaveChangesAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.Include(v => v.Features).FirstOrDefaultAsync(f => f.Id == id);
            if (vehicle == null) return NotFound();

            var vehivleDto = _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return Ok(vehivleDto);
        }
    }
}