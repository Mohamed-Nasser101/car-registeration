using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using api.Data.Interfaces;
using api.Data.Models;
using api.DTOs;

namespace api.Extensions
{
    public static class QueryableExtension
    {
        public static IQueryable<T> AddOrdering<T>(this IQueryable<T> items, ISortQuery query,Dictionary<string, Expression<Func<T, object>>> map)
        {
            return query.IsAscending
                ? items.OrderBy(map[query.SortType])
                : items.OrderByDescending(map[query.SortType]);
        }
    }
}