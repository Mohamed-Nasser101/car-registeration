using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data.Models;

namespace api.Data.Interfaces
{
    public interface IVehicleRepository
    {
        void AddVehicle(Vehicle vehicle);
        void RemoveVehicle(Vehicle vehicle);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<IEnumerable<Vehicle>> GetVehicles(int makeId);
    }
}