using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace api.Extensions
{
    public static class HttpExenstion
    {
        public static void AddPagination(this HttpResponse response, int totalCount, int itemsPerPage, int pageCount, int currentPage, int pageItemCount)
        {
            var pag = new PaginationHeader(totalCount, itemsPerPage, pageCount, currentPage, pageItemCount);
            var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(pag, option));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }

    public class PaginationHeader
    {

        public PaginationHeader(int totalCount, int itemsPerPage, int pageCount, int currentPage, int pageItemCount)
        {
            this.TotalCount = totalCount;
            this.ItemsPerPage = itemsPerPage;
            this.PageCount = pageCount;
            this.CurrentPage = currentPage;
            this.PageItemCount = pageItemCount;
        }
        public int TotalCount { get; }
        public int CurrentPage { get; }
        public int ItemsPerPage { get; }
        public int PageItemCount { get; }
        public int PageCount { get; }
    }
}