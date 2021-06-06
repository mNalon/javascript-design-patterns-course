class Rectangle {
  #width
  #height

  constructor(width, height) {
    this.#width = width
    this.#height = height
  }

  set width(value) {
    this.#width = value
  }

  get width() {
    return this.#width
  }

  set height(value) {
    this.#height = value
  }

  get height() {
    return this.#height
  }

  toString() {
    return `${this.#width}x${this.#height}`
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size)
  }

  get height() {
    return super.height
  }

  get width() {
    return super.width
  }

  set width(value) {
    super.width = super.height = value
  }

  set height(value) {
    super.width = super.height = value
  }
}

const assertArea = (rec) => {
  const width = rec.width
  console.log('Changing height value to 10')
  rec.height = 10

  console.log(`Expected area = ${width * rec.height}`)
  console.log(`Received area = ${rec.width * rec.height}`)
}

const rectangle = new Rectangle(10,5)
console.log(`Rectangle: ${rectangle.toString()}`)
assertArea(rectangle)

const square = new Square(4)
console.log(`Square: ${square.toString()}`)
assertArea(square)




