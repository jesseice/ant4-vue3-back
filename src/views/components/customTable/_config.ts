import { createOptionsFromDict } from "@/utils";

const platform: any = {
  TAOBAO: "淘宝",
  DOUYIN: "抖音",
  iOS: "苹果",
  AnDroid: "安卓",
};
export const columns: Combine.columnProps[] = [
  { title: "Name", dataIndex: "name", align: "center", valueType: "input" },
  {
    title: "Platform",
    dataIndex: "platform",
    align: "center",
    valueType: "select",
    valueEnum: createOptionsFromDict(platform),
    customRender: ({ text }: any) => platform[text],
  },
  {
    title: "Version",
    dataIndex: "version",
    align: "center",
    valueType: "input",
  },
  {
    title: "Upgraded",
    dataIndex: "upgradeNum",
    align: "center",
    valueType: "inputNumber",
  },
  {
    title: "Edadgh",
    dataIndex: "versidadaon",
    align: "center",
    valueType: "input",
  },
  {
    title: "Edadgh",
    dataIndex: "upgradeNum",
    align: "center",
    valueType: "input",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    align: "center",
    valueType: "select",
    valueEnum: createOptionsFromDict({ creator: "creator", editor: "editor" }),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    align: "center",
    valueType: "rangePicker",
  },
  {
    title: "Action",
    dataIndex: "operation",
    align: "center",
    hideInSearch: true,
  },
];
