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
console.log(people.getEntries())
```

So right now, let's say you need to add some functionality to persist the people list into a file. Maybe you would be tempted to add one more method to the class, something like this:

```javascript
import fs from fs

// ... the rest of the  class implementation

  persist(id) {
    const keyValues = this.entries.getEntries()
    const content = Object.keys(keyValues).reduce((prev, curr, index) => {
      if (index === 0) {
        return `${curr}: ${keyValues[curr]}`
      }
      return prev + '\n' + `${curr}: ${keyValues[curr]}`
    } , '')
    fs.writeFileSync(id, content)
  }

// ...

const people = new People()
people.add(1, 'Nalon')
people.add(2, 'John')
people.add(3, 'Adda')

console.log(people.get(1))
console.log(people.get(3))
console.log(people.getEntries(3))

people.persist('test')
```

That would work perfectly but imagine that besides persisting the people list into a file you would also need to provide a way to persist it into a database or as an HTML page with a specific format or yet retrieve the list of people using some of those persistencies methods. And going further, imagine you have other kinds of objects that are structured like the people list and they also need those persistence methods. As you can see we are talking about another responsibility here. It would be more appropriate to create another class to hold this responsibility and decouple it from the People class. 

```javascript
class PersistenceManager {
  persistIntoFile(id, entries) {
    const keyValues = entries.getEntries()
    const content = Object.keys(keyValues).reduce((prev, curr, index) => {
      if (index === 0) {
        return `${curr}: ${keyValues[curr]}`
      }
      return prev + '\n' + `${curr}: ${keyValues[curr]}`
    } , '')
    fs.writeFileSync(id, content)
  }

  loadFromFile(id, entryClass) {
    const contentFile = fs.readFileSync(id).toString() 

    const contentLines = contentFile.split('\n')

    const entries = new entryClass()

    contentLines.forEach((line) => {
      const [id, value] = line.split(': ')
      entries.add(id, value)
    }) 

    return entries
  }

  //...other persistence methods
}
```

And to use it:

```javascript
const people = new People()
people.add(1, 'Nalon')
people.add(2, 'John')
people.add(3, 'Adda')

const persistenceManager = new PersistenceManager()
persistenceManager.persistIntoFile('people-list-1', people)
const loadedPeople = persistenceManager.loadFromFile('people-list-1', People)

console.log(loadedPeople.get(1))
console.log(loadedPeople.get(2))
console.log(loadedPeople.getEntries())
```

Now any kind of rule related to persistence can be treated or generalized in another class without any side effect to the People class.

Another term to describe this principle is "separation of concerns", which is something you commonly do when you are breaking some complex code to make it more clear. 