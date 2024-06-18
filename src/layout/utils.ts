export const createdIcon = (iconName: any) => {
  if (iconName) {
    return h(iconName);
  }
};

/** 根据窗口大小对菜单展开收缩 */
export const winSizeChangeExpand = (config: { setStore: any }) => {
  const { setStore } = config;
  const resizeListen = () => {
    if (window.innerWidth > 1200) {
      setStore.sidebar.collapsed = false;
    } else {
      setStore.sidebar.collapsed = true;
    }
  };

  window.addEventListener("resize", resizeListen);

  // 移除监听
  const removeEvent = () => {
    window.removeEventListener("resize", resizeListen);
  };

  onBeforeUnmount(() => {
    removeEvent();
  });
};
