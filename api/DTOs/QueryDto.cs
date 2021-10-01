using api.Data.Interfaces;

namespace api.DTOs
{
    public class QueryDto : ISortQuery
    {
        public int MakeId { get; set; }
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public string SortType { get; set; }
        public bool IsAscending { get; set; }
    }
}