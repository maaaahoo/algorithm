class TrieNode {
  constructor(val) {
    this.key = val;
    this.children = [];
  }
}
// 字典树
class TrieMap {
  constructor() {
    this.root = new TrieNode('/');
    this.size = 0;
  }

  insert(data) {
    this.insertData(data, this.root);
  }

  insertData(data, node){
    if (data === '') {
        return;
    }

    let children = node.children;
    let haveData = null;
    
    for (let i in children) {
        if (children[i].key == data[0]) {
            haveData = children[i];
        }
    }
    
    if(haveData) {
        this.insertData(data.substring(1), haveData);
    }else{
        if(children.length === 0) {
            let insertNode = new TrieNode(data[0]);
            children.push(insertNode);
            this.insertData(data.substring(1), insertNode); 
        }else{
            let validPosition = 0;
            for (let j in children) {
                if (children[j].key < data[0]) {
                    validPosition++;
                }
            }
            let insertNode = new TrieNode(data[0]);
            children.splice(validPosition, 0, insertNode);
            this.insertData(data.substring(1), insertNode); 
        }
    }
  }

  search (data) {
    if (data === '' || this.root.children.length === 0) {
        return false;
    }
    for (let i in this.root.children) {
        if (this.searchNext(this.root.children[i], data)) {
            return true;
        }
    }
    return false;
  }

  searchNext(node, data) {
    if(data[0] !== node.key) return false;
    let children = node.children;
    if(children.length === 0 && data.length === 1) {
        return true;
    } else if(children.length > 0 && data.length > 1) {
        for(let i in children) {
            if(children[i].key === data[1]) {
                return this.searchNext(children[i], data.substring(1));
            }
        }
    } else {
        return false;
    }
  }

  deleteNode(data) {
    if (this.search(data)) { 
        for (let i in this.root.children) {
            if (this.deleteNext(this.root, i, data, data)) {
                return;
            }
        }
    }
    return this;
  }

  deleteNext(parent, index, stringData, delStr) {
    let node = parent.children[index];
    if (stringData[0] != node.key) {
        return false;
    } else {
        let children = node.children;
        if (children.length == 0 && stringData.length == 1) { 
            parent.children.splice(index, 1);
            this.deleteNode(delStr.substring(0, delStr.length - 1));
        } else if (children.length > 0 && stringData.length > 1) {
            for (let i in children) {
                if (children[i].key == stringData[1]) {
                    return this.deleteNext(node, i, stringData.substring(1), delStr);
                }
            }
        }
    }
  }
}


export default TrieMap;