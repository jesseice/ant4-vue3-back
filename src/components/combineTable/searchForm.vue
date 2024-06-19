<script lang="tsx">
import { Form, FormItem } from "ant-design-vue";
export default defineComponent({
  props: {
    /** 配置 */
    columns: Array as PropType<CustomerForm.FormItemProps[]>,
  },
  setup: (props, { attrs }) => {
    const createEle = (column: CustomerForm.FormItemProps) => {
      // switch(column.valueType) {
      //   case 'input' :
      //   return 
      // }
    };

    const createFormItem = (column: CustomerForm.FormItemProps) => {
      return <FormItem>{() => createEle(column)}</FormItem>;
    };

    return () => (
      <Form {...attrs}>
        {props.columns?.map((column) => createFormItem(column))}
      </Form>
    );
  },
});
</script>
