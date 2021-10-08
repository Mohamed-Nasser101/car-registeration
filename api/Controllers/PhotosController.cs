using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using api.Data.Interfaces;
using api.Data.Models;
using api.DTOs;
using api.helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace api.Controllers
{
    [Route("api/vehicles/{vehicleId}/photos")]
    [Authorize]
    public class PhotosController : BaseApiController
    {
        private readonly IWebHostEnvironment _host;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PhotoSetting _photoSetting;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork,
            IMapper mapper, IOptionsSnapshot<PhotoSetting> photoConfig)
        {
            _host = host;
            _vehicleRepository = vehicleRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoSetting = photoConfig.Value;
        }

        [HttpPost]
        public async Task<ActionResult> AddPhotos(int vehicleId, IFormFile file)
        {
            var vehicle = await _vehicleRepository.GetVehicle(vehicleId, false);

            if (vehicle == null) return NotFound();
            if (file == null) return BadRequest("Didn't send a file");
            if (file.Length == 0) return BadRequest("Invalid file");
            if (file.Length > _photoSetting.MaxSize) return BadRequest("max size exceeded");
            if (!_photoSetting.IsSupported(file.FileName.ToLower())) return BadRequest("Invalid Extension");

            var uploads = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploads, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //create thumbnail using system.drawing

            var photo = new Photo {Name = fileName};
            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<Photo, PhotoDto>(photo));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhotos(int vehicleId)
        {
            var photos = await _vehicleRepository.GetPhotos(vehicleId);
            return Ok(photos);
        }
    }
}