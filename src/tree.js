class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}
// 二叉树
class Tree {
  constructor() {
    this.tree = null;
    this.size = 0;
  }
  // 向二叉树中添加一个元素
  // 顺序向树添加节点，通过广度优先遍历寻找左孩子或者右孩子缺失的节点，将新节点添加在这个节点上
  push(item) {
    if (typeof(item) == 'object') {
      item.forEach(element => {
        this.pushItem(element);
      });
    } else {
      this.pushItem(item);
    }
  }
  pushItem(val) {
    let node = new TreeNode(val);
    this.size++;
    if (this.tree == null) {
      this.tree = node;
    } else {
      
      let re = [this.tree];
      let insertNode;
      while(re.length > 0) {
        let length = re.length;
        for(let i=0; i<length; i++) {
          let indexNode = re.shift();
          if(indexNode.left == null || indexNode.right == null) {
            insertNode = indexNode;
            re = [];
            break;
          } else {
            re.push(indexNode.left);
            re.push(indexNode.right);
          }
        }
      }

      if (insertNode != null) {
        if (insertNode.left == null) {
          insertNode.left = node;
          return;
        }
        if (insertNode.right == null) {
          insertNode.right = node;
          return;
        }
      }
    }
  }
  // 搜索树中是否包含某节点
  // 时间复杂度O(N)
  search(val) {
    let re = [this.tree];
      while(re.length > 0) {
        let length = re.length;
        for(let i=0; i<length; i++) {
          let indexNode = re.shift();
          if(indexNode.value == val) {
            return true;
          }
          if (indexNode.left != null) re.push(indexNode.left);
          if (indexNode.right != null) re.push(indexNode.right);
        }
      }
    return false;
  }
// 基于BFS的删除操作
  removeBFS(val) {
    let re = [this.tree];
    while(re.length > 0) {
      let length = re.length;
      for(let i=0; i<length; i++) {
        let indexNode = re.shift();
        if(indexNode.left.value == val) {
          indexNode.left = null;
          this.size--;
          return;
        }
        if(indexNode.right.value == val) {
          indexNode.right = null;
          this.size--;
          return;
        }
        if (indexNode.left != null) re.push(indexNode.left);
        if (indexNode.right != null) re.push(indexNode.right);
      }
    }
  }
// 基于DFS的删除操作
  removeDFS(val) {
      this.removeItem(this.tree, val);
  }

  removeItem(node, val) {
    if(node == null || node.left == null || node.right == null) {
      return;
    }
    if(node.left.value == val) {
      node.left = null;
      this.size--;
      return;
    }

    if(node.right.value == val) {
      node.right = null;
      this.size--;
      return;
    }

    this.removeItem(node.left, val);
    this.removeItem(node.right, val);
  }

  print() {
    let re = [this.tree];
    let printString = '';
    while(re.length > 0) {
      let length = re.length;
      for(let i=0; i<length; i++) {
        let node = re.shift();
        printString = printString + '|' + node?.value;
        if (node.left != null) re.push(node.left);
        if (node.right != null) re.push(node.right);
      }
      printString = printString + '\n';
    }
    console.log(printString);
  }
}


export default Tree;