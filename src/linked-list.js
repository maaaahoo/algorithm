function LinkedNode(node) {
  this.val = node;
  this.next = null;
}

class LinkedList {
  constructor() {
    this.head = new LinkedNode('head');   //头节点
    this.length = 0;
  }

  add(item) {
    let currNode = this.head;
    while(currNode.next != null) {
        currNode = currNode.next;
    }
    currNode.next = new LinkedNode(item);
    this.length ++;
  }

  find(item) {
    let currNode = this.head;
    let index = 0;
    while (currNode.val != item){
        if(currNode.next == null) {
            return currNode;
        }
        currNode = currNode.next;
        index++;
    }
    return currNode;
  }

  insert (newElement, item) {
    var newNode = new LinkedNode(newElement);
    var currNode = this.find(item);
    if(currNode.next == null) {
        return null;
    };
    newNode.next = currNode.next;
    currNode.next = newNode;
    this.length++;
  }

  remove(item) {
    let currNode = this.head;
    while(currNode.next != null) {
        if(currNode.next.val == item) {
            currNode.next = currNode.next.next;
            break;
        }
        currNode = currNode.next
    }
    this.length--;
  }
}


export default LinkedList;