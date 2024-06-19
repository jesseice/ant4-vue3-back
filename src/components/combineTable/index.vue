<script lang="tsx">
import useTable from "@/hook/useTable";
import { Table } from "ant-design-vue";
import { type PaginationProps } from "ant-design-vue";
import { PropType, defineComponent } from "vue";
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
  },
  setup: (props, { emit, slots, attrs }) => {
    const { request, extraParams, pagination } = props;
    const { searchState, initSearch } = useTable({
      extraParams,
      request,
      pagination,
    });

    onBeforeMount(() => {
      initSearch();
    });

    console.log("[slots] ---> ", slots);
    return () => (
      <>
        <Table
          columns={props.columns}
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
