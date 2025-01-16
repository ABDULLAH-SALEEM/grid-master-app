import { useState, useEffect } from 'react';

const usePagination = (fetchData, initialParams = {}) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [querryParams, setQuerryParams] = useState(initialParams);
  const [data, setData] = useState({ rows: [], rowCount: 0 });

  const customEncodeURIComponent = (str) => {
    return encodeURIComponent(str).replace(/%2F/g, '/');
  };
  const getQueryString = (params) => {
    return Object.keys(params)
      .map((key) => {
        if (Array.isArray(params[key])) {
          return params[key]
            .map((value) => `${customEncodeURIComponent(key)}=${customEncodeURIComponent(value)}`)
            .join('&');
        }
        return `${customEncodeURIComponent(key)}=${customEncodeURIComponent(params[key])}`;
      })
      .join('&');
  };

  const getData = async (append = false) => {
    setLoading(true);
    try {
      const params = {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        ...querryParams,
      };
      const queryString = getQueryString(params);
      const { data: responseData } = await fetchData(queryString);

      setData((prevData) => {
        return append
          ? {
              rows: [...prevData.rows, ...responseData.rows],
              rowCount: responseData.rowCount,
            }
          : responseData;
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getData(false);
    // eslint-disable-next-line
  }, [paginationModel, fetchData, querryParams]);

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    getData(false);
  };

  const loadMore = () => {
    setPaginationModel((prev) => ({ ...prev, page: prev.page + 1 }));
    getData(true);
  };

  return {
    paginationModel,
    setPaginationModel,
    loading,
    data,
    setData,
    refresh,
    setQuerryParams,
    querryParams,
    loadMore,
  };
};

export default usePagination;
