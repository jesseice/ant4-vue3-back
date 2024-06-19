declare namespace Combine {
  interface columnProps extends CustomerForm.FormItemProps {
    // 自定区
    /** 输入类型 */
    valueType?: CustomerForm.InputType;
    /** 在查询表单中隐藏 */
    hideInSearch?: boolean;
    /** 在表格中隐藏 */
    hideInTable?: boolean;
    /** 是否是日期 */
    hasDate?: boolean;

    // 组件库
    /** 列标识 */
    dataIndex: string;
    /** 名字 */
    title: string;
    /** 对齐 */
    align?: "left" | "right" | "center";
    /** 自定义渲染 */
    customRender?: TNode<BaseTableRenderParams<T>>;
    /** 固定 */
    fixed?: "left" | "right" | boolean;
    /** 宽度 */
    width?: string | number;
    [key: string]: any;
  }
  // eslint-disable-next-line
  type Request = <T, P>(params: T) => Promise<IResponse<P> | any>;
}
