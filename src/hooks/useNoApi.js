import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {noApi} from "@/lib/axios";

// url: string | (params) => string
function resolveUrl(url, params) {
  return typeof url === "function" ? url(params) : url;
}

export function useNoApiQuery(key, url, { params, options } = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => noApi.get(resolveUrl(url, params)),
    ...(options || {}),
  });
}

export function useNoApiMutation(method, url, { invalidateKeys = [], options } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, params } = {}) => {
      const targetUrl = resolveUrl(url, params);
      switch (method.toUpperCase()) {
        case "POST":
          return await noApi.post(targetUrl, data);
        case "PUT":
          return await noApi.put(targetUrl, data);
        case "PATCH":
          return await noApi.patch(targetUrl, data);
        case "DELETE":
          return await noApi.delete(targetUrl, { data });
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    onSuccess: (res, variables, context) => {
      // 성공 시 지정된 캐시 키 무효화
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
      // 사용자가 추가로 준 onSuccess 실행
      options?.onSuccess?.(res, variables, context);
    },
    onError: options?.onError,
  });
}
