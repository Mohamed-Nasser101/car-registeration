using System.Threading.Tasks;
using api.Data.Interfaces;

namespace api.Data.Repositories
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ApplicationDBContext _context;

        public UnitOfWork(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}