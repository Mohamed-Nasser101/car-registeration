namespace api.Data.Interfaces
{
    public interface ISortQuery
    {
        public string SortType { get; set; }
        public bool IsAscending { get; set; }
    }
}