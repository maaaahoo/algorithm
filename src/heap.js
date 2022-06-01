class Heap {
  constructor() {
    this.heap = [];
  }
  creat(array) {
    for(let i = 0; i < array.length; i++) {
      this.insert(array[i]);
    }
  }

// 交换i,j的数据
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  // 插入一个新元素
  // 堆的上浮操作
  // 先将新元素添加到数组最后
  // 判断新元素与其父元素的大小，如果比父元素大则交换
  offer(item) {
    this.heap.push(item);
    let cur = this.heap.length - 1;
    let pre = Math.floor(cur/2); //父节点
    
    while(pre >= 0 && this.heap[cur] > this.heap[pre]) {
      this.swap(cur, pre);
      cur = pre;
      pre = Math.floor(pre/2);
    }
  }
// 删除最大元素、删除堆顶元素
// 堆的下沉操作
  poll() {
    // 移除堆顶元素，将最后一个元素放到堆顶
    let nIndex = 0;
	  let nValue = this.heap[nIndex];
    let nMaxIndex = this.heap.length-1;

    let nLeaf = this.heap.pop();
    this.heap[nIndex] = nLeaf;

    // 将顶部元素，与其子元素比较，大的元素交换到下面
    while(nIndex < nMaxIndex) {
      let nLeftIndex = 2 * (nIndex + 1) - 1;
      let nRightIndex = 2 * (nIndex + 1);

      let nSelectIndex = nLeftIndex;
      if (nRightIndex < nMaxIndex) {
        nSelectIndex = (this.heap[nLeftIndex] > this.heap[nRightIndex]) ? nLeftIndex : nRightIndex;
      }

      if (nSelectIndex < nMaxIndex && this.heap[nIndex] < this.heap[nSelectIndex] ){
        this.swap(nIndex, nSelectIndex);
      }

      nIndex = nSelectIndex;
    }
    return nValue;
  }
  peek() {
    return this.heap[0];
  }
}

export default Heap;
