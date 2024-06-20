import { message } from "ant-design-vue";

/** 复制 */
export function copyText(text: any) {
  const oInput = document.createElement("textarea");
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  oInput.style.display = "none";
  document.body.removeChild(oInput);
  message.success("复制成功");
}

/** 创建options */
export const createOptionsFromDict = (
  dict: Record<string, any>
): { label: string; value: string }[] =>
  Object.keys(dict).map((key: string) => ({ label: dict[key], value: key }));
