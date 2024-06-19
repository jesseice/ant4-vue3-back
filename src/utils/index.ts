import { message } from "ant-design-vue";

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
