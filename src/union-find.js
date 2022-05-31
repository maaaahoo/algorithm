/**
 * 并查集
 * 主要是解决图论中「动态连通性」问题
 * 即：两个点是否连通
 */
class UnionFind {
  constructor(n) {
    // 一开始互不连通
    this.count = n;
    // 父节点指针初始指向自己
    this.parent = new Array(n).fill(0).map((_, index) => index);
    // 最初每棵树只有一个节点
    // 重量应该初始化 1
    this.weights = new Array(n).fill(1);
  }

  // 连接p、q两点
  union(p, q) {
    const rootP = this.findRoot(p);
    const rootQ = this.findRoot(q);
    if (rootP === rootQ) return;
    // 将两棵树合并为一棵
    // 小树接到大树下面，较平衡
    const weights = this.weights;
    if (weights[rootP] > weights[rootQ]) {
      this.parent[rootQ] = rootP;
      weights[rootQ]++;
    } else {
      this.parent[rootP] = rootQ;
      weights[rootP]++;
    }
    this.count--; // 两个分量合二为一
  }

  // 返回某个节点 x 的根节点
  findRoot(x) {
    const parent = this.parent;
    while (parent[x] !== x) {
      // 进行路径压缩
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  // 判断p、q是否相等
  connected(p, q) {
    const rootP = this.findRoot(p);
    const rootQ = this.findRoot(q);
    return rootP === rootQ;
  }

  // 返回当前连通量
  count() {
    return this.count;
  }
};

export default UnionFind;