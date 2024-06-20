<script lang="tsx">
import { DownOutlined } from "@ant-design/icons-vue";
import { UpOutlined } from "@ant-design/icons-vue";
import {
  Button,
  Col,
  Form,
  FormInstance,
  FormItem,
  Input,
  InputNumber,
  RangePicker,
  Row,
  Select,
} from "ant-design-vue";
import { renderSlot } from "vue";
export default defineComponent({
  props: {
    /** 配置 */
    columns: Array as PropType<CustomerForm.FormItemProps[]>,
    /** 是否按列排布 */
    isRow: Boolean,
    /** span */
    span: {
      type: Number,
      default: 8,
    },
  },
  emits: ["search", "reset"],
  setup: (props, { attrs, emit, slots }) => {
    const { columns, isRow, span } = props;
    const searchForm = ref<Record<string, any>>({});

    const formRef = ref<FormInstance>();
    const expand = ref(false);

    const initData = () => {
      columns?.forEach((val) => {
        if (val.defaultValue) {
          searchForm.value[val.dataIndex] = val.defaultValue;
        } else {
          searchForm.value[val.dataIndex] = undefined;
        }
      });
    };
    onBeforeMount(() => {
      // 初始化
      initData();
    });

    const createEle = (column: CustomerForm.FormItemProps) => {
      const { valueType, dataIndex, label, valueEnum, attribute } = column;

      const commonProps = {
        placeholder: `请填写${label}`,
        allowClear: true,
        ...attribute,
      };

      const matchElement: any = {
        input: () => (
          <Input v-model:value={searchForm.value[dataIndex]} {...commonProps} />
        ),
        select: () => (
          <Select
            v-model:value={searchForm.value[dataIndex]}
            options={valueEnum}
            {...commonProps}
          />
        ),
        inputNumber: () => (
          <InputNumber
            v-model:value={searchForm.value[dataIndex]}
            {...commonProps}
            style="width: 100%"
          />
        ),
        rangePicker: () => (
          <RangePicker
            v-model:value={searchForm.value[dataIndex]}
            {...attribute}
            style="width: 100%"
          />
        ),
        // ***补充组件
      };

      return matchElement[valueType]?.();
    };

    const createFormItem = (column: CustomerForm.FormItemProps) => {
      return (
        <FormItem label={column.label} name={column.dataIndex}>
          {createEle(column)}
        </FormItem>
      );
    };

    const createButton = () => (
      <>
        {renderSlot(slots, "btnLeft")}
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button onClick={reset} style="margin-left: 10px">
          重置
        </Button>
        {renderSlot(slots, "btnRight")}
        {isRow && (
          <Button type="link" onClick={() => (expand.value = !expand.value)}>
            {expand.value ? <UpOutlined /> : <DownOutlined />}
            {expand.value ? "收起" : "展开"}
          </Button>
        )}
      </>
    );

    const submit = () => {
      emit("search", searchForm.value);
    };

    const reset = () => {
      formRef.value?.resetFields();
      emit("reset", searchForm.value);
    };

    return () =>
      isRow ? (
        <Form
          ref={formRef}
          model={searchForm.value}
          {...attrs}
          onFinish={submit}
        >
          <Row gutter={24}>
            {columns
              ?.slice(0, expand.value ? columns?.length : 6)
              ?.map((column) => (
                <Col span={span}>{createFormItem(column)}</Col>
              ))}
          </Row>
          <Row>
            <Col span={24} style="text-align: right">
              {createButton()}
            </Col>
          </Row>
        </Form>
      ) : (
        <Form
          ref={formRef}
          model={searchForm.value}
          layout="inline"
          style="row-gap: 10px"
          {...attrs}
          onFinish={submit}
        >
          {props.columns?.map((column) => createFormItem(column))}
          {createButton()}
        </Form>
      );
  },
});
</script>
