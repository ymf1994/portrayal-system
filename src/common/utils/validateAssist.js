// 异步校验表单辅助方法
export function asyncCallbackAssist() {
  return new Promise(resolve => {
    setTimeout(resolve, 10);
  });
}
