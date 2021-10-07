using System.IO;
using System.Linq;

namespace api.helpers
{
    public class PhotoSetting
    {
        public int MaxSize { get; set; }
        public string[] AcceptedTypes { get; set; }

        public bool IsSupported(string fileName)
        {
            return AcceptedTypes.Any(t => t == Path.GetExtension(fileName).ToLower());
        }
    }
}