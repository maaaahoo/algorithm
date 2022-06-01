class Stack {
  constructor() {
    this.stack = new Array();
    this.size = this.stack.length;
  }
// 入栈
  push(item) {
    this.stack.unshift(item);
    this.size++;
  }
// 出栈
  pop() {
    this.stack.shift();
    this.size--;
  }
// 查看栈元素个数
  size() {
    return this.size;
  }
// 清空栈
  clear() {
    this.stack = [];
    this.size = 0;
  }
}

export default Stack;
