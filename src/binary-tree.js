class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

// 二叉查找树
class BinaryTree {
  constructor() {
    this.tree = null;
    this.size = 0;
  }
  // 向查找树中添加元素
  push(val) {
    let newNode = new TreeNode(val);
    this.size++;
    
    if(this.tree == null) {
      return this.tree = newNode; 
    }
    let currentNode = this.tree;
    let parentNode;
    while(true) {
      parentNode = currentNode;
      if(currentNode.value >= val) {
        currentNode = currentNode.left;
        if(currentNode == null) {
          parentNode.left = newNode;
          break;
        }
      } else {
        currentNode = currentNode.right;
        if(currentNode == null) {
          parentNode.right = newNode;
          break;
        }
      }
    }
  }
  // 中序遍历
  inOrder() {
    let result = [];
    const dfs = (node) => {
      if(node == null) return;
      dfs(node.left);
      result.push(node.value);
      dfs(node.right);
    }
    dfs(this.tree);
    return result;
  }
  // 查找节点
  // 时间复杂度O(logN)
  search(val) {
    let currentNode = this.tree;
    while(currentNode != null) {
      if(currentNode.value == val) {
        return currentNode;
      }
      if(currentNode.value >= val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(val) {
    const getMax = (node) => {
      if(node.right == null) {
        return node;
      } else {
        return getMax(node.right);
      }
    }
    // 删除节点
    // 删除一个节点之后，仍需要保证二叉搜索树的特性，删除操作包含两个过程，先是寻找到要删除的节点
    // 找到节点之后，这个位置就空下来了，为了保证最小限度的操作树，需要在余下的节点中，寻找到一个
    // 与删除节点最接近的一个节点（要么是左子树的最大值，要么是右子树的最小值）只需要将这两个值的其
    // 中一个，放到删除后的位置中，就能保证剩下的节点不动，从而完成了删除操作
    const removeItem = (node, val) => {
      if(node == null) return;
      if(node.value == val) {
        // 左右都没有节点
        if(node.left == null && node.right == null) {
          return null;
        }
        // 右节点为空，需要将左子树“提拔"上来
        if(node.right == null) {
          return node.left;
        }
        //  左节点为空，需要将右子树“提拔"上来
        if(node.left == null) {
          return node.right;
        }
        // 左右两边都有节点 
        let tempNode = getMax(node.left); // 找到左子树的最大值
        node.value = tempNode.value; // 将左子树的最大值，换到要删除的节点里
        node.left = removeItem(node.left, tempNode.value); // 把左子树中原来的最大值删除
        return node;
      } else if(node.value >= val) {
        // 在左边寻找
        node.left = removeItem(node.left, val);
        return node;
      } else {
        // 在右边寻找
        node.right = removeItem(node.right, val);
        return node;
      }
    }

    this.size--;
    removeItem(this.tree, val);
  }

  print() {
    let re = [this.tree];
    let printString = '';
    while(re.length > 0) {
      let length = re.length;
      for(let i=0; i<length; i++) {
        let node = re.shift();
        printString = printString + '|' + node.value;
        if (node.left != null) re.push(node.left);
        if (node.right != null) re.push(node.right);
      }
      printString = printString + '\n';
    }
    console.log(printString);
  }
} 

export default BinaryTree;
