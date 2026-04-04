import {baseApi} from '../../api/base/base';

import {TDataProducts, TProduct} from './types';

const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<
      TDataProducts,
      {debouncedSearch: string; pageSize: number; skip: number}
    >({
      query: ({debouncedSearch, pageSize, skip}) =>
        `products/search?q=${debouncedSearch.trim()}&limit=${pageSize}&skip=${skip}`,
      providesTags: [{type: 'Product', id: 'list'}],
    }),
    getProductById: builder.query<TProduct, {cardId: number}>({
      query: ({cardId}) => `products/${cardId}`,
      providesTags: (_a, _b, {cardId}) => [{type: 'Product', id: cardId}],
    }),

    getCategoryList: builder.query<string[], void>({
      query: () => 'products/category-list',
      providesTags: [{type: 'Product', id: 'categoryList'}],
    }),
  }),
});
export const {useGetProductsQuery, useGetProductByIdQuery, useGetCategoryListQuery} = productApi;
