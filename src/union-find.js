/**
 * 并查集
 * 主要是解决图论中「动态连通性」问题
 * 即：两个点是否连通
 * 其中
 * count: 表示当前共有几个连通量 1代表所有点都连在一起
 * parent: 数组中的每个值表示与其连接在一起的点，<例> 1->2->3->4时 parent等于[1,2,3,3] 整体类似树状结构，连接点的路径可能会很长
 * weights: ?
 * compression(): 压缩路径，所有点指向最终指向的点 <例> 1->2->3->4时 返回 [3,3,3,3]
 */

// 例题：
// https://leetcode.cn/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/

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

  // 扁平化，代表一个点的最终指向 
  compression() {
    const parent = Array.from(this.parent);
    for(let i = 0; i<parent.length; i++) {
      const finalPoint = this.findRoot(parent[i]);
      parent[i] = finalPoint
    }
    return parent;
  }

  // 返回当前连通量
  count() {
    return this.count;
  }
};

export default UnionFind;