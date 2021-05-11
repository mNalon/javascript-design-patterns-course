## Single Responsibility

It is a really simple principle that tells a class should have only a single primary responsibility and as consequence, it should have only one reason to change when something that is somehow related to its responsibility changes. 

In simple words, it is a bad idea to add more than one responsibility to a class.

As an example imagine you need to write a class that is responsible for manage a list of people by their identifiers. So the primary responsibility of this class is to allow adding and retrieving people. 

```javascript
class People {
  constructor() {
    this.entries = {}
  }

  add(id, name) {
    if (this.entries[id]) throw new Error('id already exists')
    
    this.entries[id] = name
  }

  get(id) {
    return this.entries[id]
  }

  getEntries() {
    return this.entries
  }
}

const people = new People()
people.add(1, 'Nalon')
people.add(2, 'John')
people.add(3, 'Adda')

console.log(people.get(1))
console.log(people.get(3))
console.log(people.getEntries(3))
```

So right now let's say you need to add some functionality to persist the people list into a file. Maybe you would be tempted to add one more method to the class, something like this:

```javascript
//WIP
```

Another term to describe this principle is "separation of concerns", which is something you commonly do when you are breaking some complex code to make it more clear. 