using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.helpers
{
    public class PagedList<T> : List<T>
    {
        private PagedList(IEnumerable<T> source, int totalCount, int currentPage, int itemsPerPage, int pageItemCount)
        {
            TotalCount = totalCount;
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            PageItemCount = pageItemCount;
            // var z = (double)totalCount / itemsPerPage;
            PageCount = (int)Math.Ceiling((double)totalCount / itemsPerPage);
            AddRange(source);
        }

        public int TotalCount { get; }
        public int CurrentPage { get; }
        public int ItemsPerPage { get; }
        public int PageItemCount { get; }
        public int PageCount { get; }

        public static async Task<PagedList<T>> PaginateAsync(IQueryable<T> source, int currentPage, int itemsPerPage)
        {
            var totalCount = source.Count();
            var items = await source.Skip((currentPage - 1) * itemsPerPage).Take(itemsPerPage).ToListAsync();
            var pageItemCount = items.Count;
            return new PagedList<T>(items, totalCount, currentPage, itemsPerPage, pageItemCount);
        }
    }
}