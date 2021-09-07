## Builder Pattern

> When piecewise object construction is complicated, it provides an API for doing it succinctly

The motivation behind this pattern is the necessity of dealing with objects that require a lot of steps during your initialization. In this case, we can be tempted to create an initializer with many arguments or a lot of logic inside it, but in most cases when this happens, this initializer becomes unproductive or unmaintainable. So what this pattern try to do is, instead of using a massive initializer, it provides a way to construct the object piecewise through a step-by-step API. 

Let's exemplify it here. Suppose we have to create an abstraction to deal with a person's info, for example, its address and employment info, and a way to print all those info after fill them out.  

We could express the two pieces of info with two classes:

```javascript
class Address {
  constructor (streetAddress, postCode, city) {
    this.streetAddress = streetAddress
    this.postCode = postCode
    this.city = city
  }
}

class Employment {
  constructor (companyName, position, annualIncome) {
    this.companyName = companyName
    this.position = position
    this.annualIncome = annualIncome
  }
}

```

And to be able to initialize those info of a person and print them we could be tempted to create a Person class like this:

```javascript
class Person {
  constructor (streetAddress, postCode, city, companyName, position, annualIncome) {
    this.address = new Address(streetAddress, postCode, city)
    this.employment = new Employment(companyName, position, annualIncome)
  }

  toString() {
    return `Person lives at ${this.address.streetAddress}, ${this.address.city}, ${this.address.postCode} \nand works at ${this.employment.companyName} as a ${this.employment.position} earning ${this.employment.annualIncome}`
  }
}
```

But notice what would happen if we start to need other info or even some of those inputs had to pass through some kind of processing before establish the final value for a person's info.

To solve this we can use an abstraction to deal with the building of the Person in smaller steps, creating a builder class PersonBuilder:

```javascript
class Person {
  constructor (address, employment) {
    this.address = address
    this.employment = employment
  }

  toString() {
    return `Person lives at ${this.address.streetAddress}, ${this.address.city}, ${this.address.postCode} \nand works at ${this.employment.companyName} as a ${this.employment.position} earning ${this.employment.annualIncome}`
  }
}

class PersonBuilder {
  constructor() {
    this.address = null
    this.employment = null
  }

  lives(streetAddress, city, postCode) {
    this.address = new Address(streetAddress, city, postCode)
    return this
  }

  works(companyName, position, annualIncome) {
    this.employment = new Employment(companyName, position, annualIncome)
    return this
  }

  build() {
    return new Person(this.address, this.employment)
  }
}

const person = new PersonBuilder()
  .lives('Severino Meireles, 108', 'Rio de Janeiro', '20270-020')
  .works('FSociety', 'developer', 123400)
  .build()

console.log(person.toString())
```

Of course, this is a simple example and maybe it may not express the real benefits of splitting a more complex constructor of an object. 

Another thing worths notice is the fluent interface provided by each method of the builder class. Since all of them return a reference of an object that has the current state of the build pieces the builder becomes a very intuitive and charming API. 




