<script lang="tsx">
import useTable from "@/hook/useTable";
import { Table, Card, FormProps } from "ant-design-vue";
import { type PaginationProps } from "ant-design-vue";
import { PropType, defineComponent } from "vue";
import SearchForm from "./searchForm.vue";

export default defineComponent({
  props: {
    /** 列头配置 */
    columns: { type: Array as PropType<Combine.columnProps[]>, required: true },
    /** 请求方法 */
    request: { type: Function as PropType<Combine.Request>, required: true },
    /** 额外固定参数 */
    extraParams: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    /** paginantion额外配置覆盖默认 */
    pagination: {
      type: Object as PropType<PaginationProps>,
      default: () => ({}),
    },
    /** form表单配置 */
    formProps: {
      type: Object as PropType<FormProps | { isRow: boolean }>,
      default: () => ({}),
    },
    /** isRow 不需要紧凑查询表单 */
    isRow: Boolean,
  },
  setup: (props, { emit, slots, attrs }) => {
    const { columns, request, extraParams, pagination } = props;
    const { formProps, isRow } = props;
    const { searchState, initSearch, resetSearch } = useTable({
      extraParams,
      request,
      pagination,
    });

    const tableColumns = columns.filter((val) => !val.hideInTable);
    const searchFormColumns = columns
      .map((val) => ({
        ...val,
        label: val.title,
      }))
      .filter((val) => !val.hideInSearch);

    onBeforeMount(() => {
      initSearch();
    });

    console.log("[slots] ---> ", slots);

    return () => (
      <>
        <Card>
          <SearchForm
            {...formProps}
            columns={searchFormColumns}
            isRow={isRow}
            onSearch={initSearch}
            onReset={resetSearch}
          >
            {{ ...slots }}
          </SearchForm>
        </Card>
        <Table
          columns={tableColumns}
          dataSource={searchState.dataSource}
          pagination={searchState.pagination}
          {...attrs}
        >
          {{ ...slots }}
        </Table>
      </>
    );
  },
});
</script>
