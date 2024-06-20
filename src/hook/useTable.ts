import { isArray, isObject } from "@/utils/is";
import { PaginationProps } from "ant-design-vue/es/pagination";
import dayjs from "dayjs";

interface State {
  dataSource: any[];
  loading: boolean;
  searchParams: Record<string, any>;
  pagination: PaginationProps;
}

interface UseSearchParams {
  request: Combine.Request;
  pagination?: PaginationProps;
  extraParams?: Record<string, string | number | boolean>;
}
const initPageSizeOptions = ["20", "30", "50", "100"];

export default (params: UseSearchParams) => {
  const { request, pagination = {}, extraParams } = params;

  const state = reactive<State>({
    dataSource: [],
    loading: false,
    searchParams: {},
    pagination: {
      current: 1,
      pageSize: Number(initPageSizeOptions[0]),
      total: 0,
      showQuickJumper: true,
      pageSizeOptions: initPageSizeOptions,
      showTotal: (total) => `共 ${total} 条`,
      onChange: (...args) => pageChange(...args),
      ...pagination,
    },
  });
  // 清除空格
  const clearSpace = (obj: Record<string, any>) => {
    const resultObj: Record<string, string> = {};
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        resultObj[key] = obj[key].replace(/^\s*|\s*$/g, "");
      } else {
        resultObj[key] = obj[key];
      }
    }
    return resultObj;
  };

  // 删除空值 获取非空
  const getNonEmpty = (obj: Record<string, any>) => {
    const resultObj: Record<string, string> = {};
    Object.keys(obj).forEach((key) => {
      const item = obj[key];
      if (item === 0 || !!item) resultObj[key] = item;
    });
    return resultObj;
  };

  // 处理日期
  const processDate = (params: Record<string, any>) => {
    const resultObj: Record<string, string | number> = {};
    if (!isObject(params)) return params;
    for (const key in params) {
      if (!isArray(params[key])) {
        resultObj[key] = params[key];
      } else if (params[key].length !== 0) {
        const listVal = params[key][0];
        const hasDate = dayjs(listVal).isValid();
        if (hasDate) {
          const [start, end] = params[key];
          resultObj[`${key}Start`] = dayjs(start).startOf("day").valueOf();
          resultObj[`${key}End`] = dayjs(end).endOf("day").valueOf();
        }
      }
    }
    return resultObj;
  };
  /**
   * 请求数据
   */
  const requestData = async () => {
    try {
      state.loading = true;
      // 处理请求参数
      const parseParams = JSON.parse(JSON.stringify(state.searchParams));
      const searchParams = clearSpace(processDate(getNonEmpty(parseParams)));
      console.log("[searchParams] ---> ", searchParams);
      // 发送请求 TODO 根据接口修改
      const response = await request({
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
        ...searchParams,
        ...extraParams,
      });
      console.log("[response] ---> ", response);
      if (response) {
        // TODO 根据接口修改
        const { list, page } = response;
        state.dataSource = list;
        state.pagination.total = page?.total || 0;
      }
    } catch (error) {
      console.error("[error] ------> ", error);
    } finally {
      state.loading = false;
    }
  };

  /** pagination变化时触发 */
  const pageChange = async (current: number, pageSize: number) => {
    state.pagination.current = current;
    state.pagination.pageSize = pageSize;
    await requestData();
  };

  /** 根据条件搜索时触发 */
  const initSearch = async (
    formData?: Record<string, string | Array<string>>
  ) => {
    state.searchParams = formData ? formData : {};
    state.pagination.current = 1;
    await requestData();
  };

  /** 重置搜索条件时触发 */
  const resetSearch = async () => {
    state.searchParams = {};
    state.pagination.current = 1;
    state.pagination.pageSize = Number(initPageSizeOptions[0]);
    await requestData();
  };

  return {
    searchState: state,
    requestData,
    resetSearch,
    initSearch,
  };
};
