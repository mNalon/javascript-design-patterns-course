## Open Closed Principle (OCP)

This principle states that a class should be **oppened for extension but closed for modification**. Let's see what it means next:

Imagine you have a class that defines a product by some features, lets say by the name, color, and size. 

```javascript
const Sizes = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
})

const Colors = Object.freeze({
  GREEN: 'grenn',
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
```

And given a list of products of this class you need to provide a way to filter products using some criteria.

At first you could do this creating a class responsible for this job. 

```javascript
//...
class ProductFilter {
  static filterByColor(products, color) {
    return products.filter((product) => product.color === color)
  }

  static filterBySize(products, size) {
    return products.filter((product) => product.size === size)
  }
}


const products = [
  new Product('clock', Colors.GREEN, Sizes.LARGE),
  new Product('car', Colors.BLUE, Sizes.MEDIUM),
  new Product('house', Colors.BLUE, Sizes.LARGE),
  new Product('boat', Colors.GREEN, Sizes.LARGE)
]

console.log('Products with color=green')

console.log(ProductFilter.filterByColor(products, Colors.GREEN))

console.log('Products with size=large')

console.log(ProductFilter.filterBySize(products, Sizes.LARGE))
```

But imagine you also need to allow a combination of those criteria and yet the product objects also started to have more characteristics that should be considered in the filter process.

You could start to add more and more methods on the FilterProduct class, but probably you would be conducted on achieving the "state space explosion", where depending on the total of the combinations of filters that your system has you would end with a big class mapping all those possibilities as methods.

Even that this looks like a kind of **extension** for the `ProductFilter` class, it is actually taken as **modification**. The "extension" on this principle is more related to the automatic expasion that a class is susceptibal using concepts like inheritance, where a class can automatically receive more functionalities by other means instead of your internal modification. 

Inheritance is not the only way to extend functionalities between classes. In the case of the filter problem, you can use the approach of the specification pattern, where you can create a class for each filter criteria or combination of those, following a specific interface. And right now instead of implement a method for each criteria you would just need to inform the spec as a second argument to a filter method.

```javascript
//...

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
```

As you can see using this pattern you are not breaking the **OCP** and you are extending the filter functionality in a totally flexible and declarative way, even allowing you to do combinations of filters. 

