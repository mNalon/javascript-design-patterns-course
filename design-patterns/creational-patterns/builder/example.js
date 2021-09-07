const { timingSafeEqual } = require("crypto")

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

