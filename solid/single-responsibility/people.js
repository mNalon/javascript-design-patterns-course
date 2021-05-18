const fs = require('fs')

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

const people = new People()
people.add(1, 'Nalon')
people.add(2, 'John')
people.add(3, 'Adda')

console.log(people.get(1))
console.log(people.get(3))
console.log(people.getEntries())

const persistenceManager = new PersistenceManager()
persistenceManager.persistIntoFile('people-list-1', people)
const loadedPeople = persistenceManager.loadFromFile('people-list-1', People)

console.log(loadedPeople.get(1))
console.log(loadedPeople.get(2))
console.log(loadedPeople.getEntries())
