declare namespace CustomerForm {
  interface Rules {
    message: string;
    required?: boolean;
    pattern?: RegExp;
    type?: 'error' | 'warning';
    min?: number;
    max?: number;
    whitespace?: boolean;
    validator?: CustomValidator;
    trigger?: 'blur' | 'change';
  }

  interface UploadFile {
    lastModified?: number;
    name?: string;
    percent?: number;
    raw?: File;
    response?: object;
    size?: number;
    status?: 'success' | 'fail' | 'progress' | 'waiting';
    type?: string;
    url?: string;
  }

  type ValueEnum = Array<{ value?: string | number; label: string; disabled?: boolean }>;

  type DisabledKey = 'from' | 'to' | 'before' | 'after';

  /** 输入的属性值, 不完整 */
  interface Attribute {
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';

    filterable?: boolean;
    // eslint-disable-next-line
    filter?: (search: string, option: ValueEnum) => boolean;

    maxlength?: number;
    tips?: string;
    allowInputOverMax?: boolean;
    status?: 'warning' | 'normal' | 'success' | 'error';

    max?: number;
    min?: number;

    mode?: 'year' | 'month' | 'quarter' | 'week';
    enableTimePicker?: boolean;
    disableDate?: Record<DisabledKey, string> | Array<string>;

    // upload start
    draggable?: boolean;
    /** 上传文件接口 */
    action?: string;
    /** 上传前处理 */
    // eslint-disable-next-line
    beforeUpload?: (file: UploadFile | File) => boolean;
    // upload end

    options?: any;
  }

  type InputType =
    | 'input'
    | 'inputNumber'
    | 'radio'
    | 'select'
    | 'switch'
    | 'textarea'
    | 'datepicker'
    | 'rangePicker'
    | 'checkbox'
    | 'upload'
    | 'verify'
    | 'confirmPassword'
    | 'cascader'
    | 'rangeInput'
    | 'btnRangePicker';

  interface FormItemProps {
    /** label */
    label?: string;
    /** 数据字段 */
    dataIndex: string;
    /** 输入类型 */
    valueType: InputType;
    /** key */
    key?: string;
    /** 选择的值 */
    valueEnum?: ValueEnum;
    /** 必填规则 */
    rules?: Array<Rules>;
    /** 组件属性 props */
    attribute?: Attribute;
    /** 默认值 */
    defaultValue?: string | number | boolean | Array<any>;
    /** 目标item的dataField 如：验证码需要关联手机号 则fieldKey为mobile */
    fieldKey?: string;
  }
}
