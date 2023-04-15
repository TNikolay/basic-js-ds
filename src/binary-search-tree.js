const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() { this.r = null }
  root() { return this.r }

  add(data) {
    if (!this.r) this.r = new Node(data)
    else {
      let node = this.r, parent
      while(node) {
        if (data == node.data) return

        if (data > node.data) {
          if (node.right) node = node.right
          else {
            node.right = new Node(data)
            return
          }
        }
        else {
          if (node.left) node = node.left
          else {
            node.left = new Node(data)
            return
          }
        }
      }
    }
  }

  has(data) { return this.find(data) != null  }

  find(data) {
    let cur = this.r
    while (cur && cur.data != data) 
      cur = data > cur.data ? cur.right : cur.left
    return cur
  }

  remove(data) {
 
    const removeNode = (node, data) => {

      if (!node) return null

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } 
 
      if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } 
      else {
        if (!node.left && !node.right) return null
        
        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let minFromRight = node.right
        while (minFromRight.left) minFromRight = minFromRight.left
        node.data = minFromRight.data
        node.right = removeNode(node.right, minFromRight.data)

        return node
      }
    }

    this.r = removeNode(this.r, data)
}

  min() {
    let cur = this.r
    while (cur.left) cur = cur.left
    return cur.data;
  }

  max() {
    let cur = this.r
    while (cur.right) cur = cur.right
    return cur.data;
  }
}

module.exports = {
  BinarySearchTree
};