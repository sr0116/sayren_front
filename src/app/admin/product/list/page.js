// /app/admin/product/page.js
"use client";
import AdminProductList from "@/components/product/AdminProductList";
import AdminProductState from "@/components/product/AdminProductState";
import {useApiQuery} from "@/hooks/useApi";

export default function ProductListPage({ searchParams }) {

  const { data, isLoading, isError } = useApiQuery(
    ["productList"],
    `/api/admin/product`,
    {
      options: {
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    }
  );


    return (
        <div>
            {/*<AdminProductState />*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            <AdminProductList
                products={data}
                searchParams={searchParams}
            />
        </div>
    );
}