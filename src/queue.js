class Queue {
  constructor() {
    this.queue = new Array();
    this.size = this.queue.length;
  }
// 向队列中添加一个元素
  enqueue(item) {
    this.queue.push(item);
    this.size++;
  }
// 从队列中取出一个元素
  dequeue() {
    this.queue.shift();
    this.size--;
  }
// 获取队列的大小
  size() {
    return this.size;
  }
// 清空队列
  clear() {
    this.queue = [];
    this.size = 0;
  }
}

export default Queue;