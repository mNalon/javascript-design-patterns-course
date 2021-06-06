## Liskov Substituion Principle (LSP)

This principle says that if you have a piece of code using an object that is an instance of a base class, it should equally also be able to use any object that is an instance of a class derived from this previous one. For example, a function that receives an object of a base class should also work correctly if you pass an object of a derived class. 

The problem of the rectangle-square is an example of a breaking of the LSP. Imagine you have the following function that receives an object that is an instance of a Rectangle class:

```javascript
const assertArea = (rec) => {
  const width = rec.width
  console.log('Changing height value to 10')
  rec.height = 10

  console.log(`Expected area = ${width * rec.height}`)
  console.log(`Received area = ${rec.width * rec.height}`)
}
```

Since we are storing the width of a rectangle in an internal variable, we expect that the area after change the height value would be this width multiplied by the new height. 

So if you define the Rectangle class and a Square class that inherit from it:

```javascript
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
```

You could get something like this:

```javascript
const rectangle = new Rectangle(10,5)
console.log(`Rectangle: ${rectangle.toString()}`)
assertArea(rectangle)

const square = new Square(4)
console.log(`Square: ${square.toString()}`)
assertArea(square)
```

In the case of the use of the square object, the result is not as expected, because the abstraction of this inheritance did not respect the LSP.
