/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { SearchFilterType } from '@constants/searchByMap';
import { getFavoriteList } from '@remote/api/requests/favorite/favorite.get.api';
import { ProductListInfoType } from '@remote/api/types/home';

const PAGE_SIZE = 10;

function useFavoriteList(sortType: SearchFilterType = 'recent-order') {
  const router = useRouter();
  const {
    data, isLoading, fetchNextPage, isFetching, hasNextPage = false,
  } = useInfiniteQuery<ProductListInfoType>({
    queryKey: ['FavoriteProductList', sortType],
    queryFn: ({ pageParam = 0 }) => {
      return getFavoriteList(
        Number(pageParam),
        PAGE_SIZE,
        sortType,
      );
    },
    getNextPageParam: (lastPage) => {
      return (
        lastPage.value.last
          ? undefined
          : lastPage.value.pageable.pageNumber + 1
      );
    },
    onError: (error: any) => {
      if (error.response.status === 400 || error.response.status === 401) {
        router.push('/login');
      }
    },
    suspense: true,
  });

  const favoriteList = data?.pages.flatMap((page) => { return page.value.content; }) || [];

  const loadMore = useCallback(async () => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  return {
    favoriteList, isLoading, loadMore, isFetching, hasNextPage,
  };
}

export default useFavoriteList;
