class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

class Node {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.used = false
    this.right = null
    this.down = null
  }

  split(rectangle) {
    this.used = true
    this.down = new Node(this.x, this.y + rectangle.height, this.width, this.height - rectangle.height)
    this.right = new Node(this.x + rectangle.width, this.y, this.width - rectangle.width, rectangle.height)
  }

  fit(rectangle) {
    if (this.used) {
      return this.right.fit(rectangle) || this.down.fit(rectangle)
    } else if (rectangle.width <= this.width && rectangle.height <= this.height) {
      this.split(rectangle)
      return true
    } else {
      return false
    }
  }
}

class Packer {
  constructor(width, height) {
    this.root = new Node(0, 0, width, height)
  }

  pack(rectangles) {
    for (const rect of rectangles) {
      if (!this.root.fit(rect)) {
        console.log(`无法放置矩形 ${rect.width}x${rect.height}`)
        return false
      }
    }
    return true
  }
}

function calculateMinimumBoards(boardWidth, boardHeight, rectangles) {
  // 按面积从大到小排序
  rectangles.sort((a, b) => b.width * b.height - a.width * a.height)

  const boards = []
  let currentBoard

  for (const rect of rectangles) {
    if (!currentBoard || !currentBoard.pack([rect])) {
      currentBoard = new Packer(boardWidth, boardHeight)
      currentBoard.pack([rect])
      boards.push(currentBoard)
    }
  }

  return boards.length
}

// 示例数据
const boardWidth = 1220
const boardHeight = 2440
const rectangles = [
  new Rectangle(364, 1330),
  new Rectangle(364, 1330),
  new Rectangle(364, 1330),
  new Rectangle(364, 1330),
  new Rectangle(362, 920),
  new Rectangle(362, 920),
  new Rectangle(362, 920),
  new Rectangle(362, 920),
  new Rectangle(371, 920),
  new Rectangle(371, 920),
  new Rectangle(371, 1693),
  new Rectangle(371, 1693)
]

const minimumBoards = calculateMinimumBoards(boardWidth, boardHeight, rectangles)

console.log('最少板材数量:', minimumBoards)
