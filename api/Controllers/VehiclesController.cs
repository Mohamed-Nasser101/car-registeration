using api.Data.Interfaces;
using api.Data.Models;
using api.DTOs;
using api.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Authorize]
    public class VehiclesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<SaveVehicleDto>> CreateVehicle([FromBody] SaveVehicleDto saveVehicleDto)
        {
            var vehicle = _mapper.Map<SaveVehicleDto, Vehicle>(saveVehicleDto);
            vehicle.LastUpdate = DateTime.Now;
            _vehicleRepository.AddVehicle(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);

            return Ok(_mapper.Map<Vehicle, VehicleDto>(vehicle));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SaveVehicleDto>> UpdateVehicle(int id, [FromBody] SaveVehicleDto saveVehicleDto)
        {
            var vehicleInDb = await _vehicleRepository.GetVehicle(id);

            if (saveVehicleDto == null) return NotFound();
            _mapper.Map<SaveVehicleDto, Vehicle>(saveVehicleDto, vehicleInDb);
            vehicleInDb.LastUpdate = DateTime.Now;
            await _unitOfWork.CompleteAsync();

            vehicleInDb = await _vehicleRepository.GetVehicle(vehicleInDb.Id);
            return Ok(_mapper.Map<Vehicle, VehicleDto>(vehicleInDb));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id, includeRelated: false);
            if (vehicle == null) return NotFound();

            // _context.Vehicles.Remove(vehicle);
            _vehicleRepository.RemoveVehicle(vehicle);
            await _unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id);
            if (vehicle == null) return NotFound();

            var vehicleDto = _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return Ok(vehicleDto);
        }
        
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetVehicles([FromQuery] QueryDto query)
        {
            var vehicles = await _vehicleRepository.GetVehicles(query);
            Response.AddPagination(vehicles.TotalCount, vehicles.ItemsPerPage, vehicles.PageCount, vehicles.CurrentPage,
                vehicles.PageItemCount);
            return Ok(_mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDto>>(vehicles));
        }
    }
}