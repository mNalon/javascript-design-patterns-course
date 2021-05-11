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