using System.Threading.Tasks;

namespace api.Data.Interfaces
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}