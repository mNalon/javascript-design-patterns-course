const Sizes = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
})

const Colors = Object.freeze({
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow'
})

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ColorSpec {
  constructor (color) {
    this.color = color
  }

  isSatisfied (item) {
    return item.color === this.color;
  }
}

class SizeSpec {
  constructor (size) {
    this.size = size
  }

  isSatisfied (item) {
    return item.size === this.size;
  }
}

class AndSpec {
  constructor (specs) {
    this.specs = specs
  }

  isSatisfied (item) {
    return this.specs.every((spec) =>  spec.isSatisfied(item))
  }
}

class ProductFilter {
  static filter(products, spec) {
    return products.filter((product) => spec.isSatisfied(product))
  }
}

const products = [
  new Product('clock', Colors.GREEN, Sizes.LARGE),
  new Product('car', Colors.GREEN, Sizes.MEDIUM),
  new Product('house', Colors.BLUE, Sizes.LARGE),
  new Product('boat', Colors.GREEN, Sizes.LARGE)
]

console.log('Products with color=green')

const colorGreenSpec = new ColorSpec(Colors.GREEN)
console.log(ProductFilter.filter(products, colorGreenSpec))

console.log('Products with size=large and color=green')

const sizeLargeSpec = new SizeSpec(Sizes.LARGE)
const colorGreenAndSizeLargeSpec = new AndSpec([colorGreenSpec, sizeLargeSpec])
console.log(ProductFilter.filter(products, colorGreenAndSizeLargeSpec))