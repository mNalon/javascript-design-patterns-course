// You are asked to implement the Builder design pattern for rendering simple chunks of code.

// Sample use of the builder you are asked to create:

// let cb = new CodeBuilder('Person')
// cb.addField('name').addField('age')
// console.log(cb.toString())


/* The expected output of the above code is:

class Person 
{
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

*/

class ClassCodeRepresentation {
  constructor (name) {
    this.name = name
    this.fields = []
  }

  addField(name) {
    this.fields.push(name)
  }

  toString() {
    return `class ${this.name} \n`
      + `{\n`
      + `  constructor(${this.fields.join(', ')}) {\n`
      + `${this.fields.map(i => `    this.${i} = ${i};`).join(`\n`)}\n`
      + `  }\n`
      + `}`
  }
}

class CodeBuilder {
  constructor(className) {
    this.classCodeRepresantation = new ClassCodeRepresentation(className)
  }

  addField(name)
  {
    this.classCodeRepresantation.addField(name)
    return this
  }

  toString() {
    return this.classCodeRepresantation.toString()
  }


}

let cb = new CodeBuilder('Person')
cb.addField('name').addField('age')
console.log(cb.toString())