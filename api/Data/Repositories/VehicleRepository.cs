using System.Threading.Tasks;
using api.Data.Interfaces;
using api.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{


    public class VehicleRepository : IVehicleRepository
    {
        private readonly ApplicationDBContext _context;
        public VehicleRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated) return await _context.Vehicles.FindAsync(id);
            
            return await _context.Vehicles
                            .Include(v => v.Features)
                            .ThenInclude(vf => vf.Feature)
                            .Include(v => v.Model)
                            .ThenInclude(m => m.Make)
                            .FirstOrDefaultAsync(f => f.Id == id);
        }

        public void AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }
        public void RemoveVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }
    }
}