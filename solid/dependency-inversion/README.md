## Dependency Inversion Principle (DIP)

This is the last SOLID principle. It claims that high-level modules should not depend on low-level modules (its implementation details), instead it should depend on abstractions (interfaces).

Let's try to exemplify this concept using a simple implementation. Imagine we store a list of relationships between people and we need to do a search based on a criteria of relationship. 

We can have a class RelationShips that is responsible for store the relationships. In our example, this class represents a low-level module. 

```javascript
let RelationShip = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2
})

class Person {
  constructor(name ) {
    this.name = name
  }
}

class RelationShips {
  constructor() {
    this.relationShips = []
  }

  addParentAndChild (parent, child) {
    this.relationShips.push({
      from: parent,
      to: child,
      type: RelationShip.parent
    })
  }

  //another relationShips insertion methods
}
```

Here we are just creating some parent child relationships:

```javascript
const parent = new Person('Daniel')

const child1 = new Person('Maria')
const child2 = new Person('Kadu')

const relationShips = new RelationShips()
relationShips.addParentAndChild(parent, child1)
relationShips.addParentAndChild(parent, child2)
```

Now let's say we create a class Search just to print the children of Daniel. This class would be our high-level module.

```javascript
class Search {
  constructor (relationShips) {
    for (let relationShip of relationShips.relationShips) {
      if (relationShip.from.name === 'Daniel' 
           && relationShip.type === RelationShip.parent) {
             console.log(`Daniel has a child named ${relationShip.to.name}`)
           }
    }
  }
}
```

Although this works we are violating the DIP. The high-level module is totally depending on the details of the implementation of the low-level module. We are accessing a private variable that retains the relationships and doing a search that really depends on the structure of this private data. 

Instead of doing this, we could create an interface that allows us to abstract this kind of search, and do the Search class depend on this abstraction.

We end up with this:

```javascript
class RelationShipsBrowser {
  constructor() {
    if (this.constructor.name === 'RelationShipsBrowser') {
      throw new Error('RelationShipBrowser is an abstract class!')
    }
  }

  getChildOfParent(name) {}
}

class RelationShips extends RelationShipsBrowser {
  constructor() {
    super()
    this.relationShips = []
  }

  addParentAndChild(parent, child) {
    this.relationShips.push({
      from: parent,
      to: child,
      type: RelationShip.parent
    })
  }

  findAllChildrenOf(name) {
    return this.relationShips.filter((relationShip) => {
      return relationShip.from.name === name 
        && relationShip.type === RelationShip.parent
    })
  }

  //another relationShips insertion methods
}


class Search {
  constructor (relationShipsBrowser) {
    for (let relationShip of relationShipsBrowser.findAllChildrenOf('Daniel')) {
      console.log(`Daniel has a child named ${relationShip.to.name}`)
    }
  }
}
```

As we can see the high-level module would be unaware of the details of which type of data structure is used to retain the list of relationships and it does not need to know how to do the search. It allows us to do change the implementation inside the low-level module any time we want since we keep the contract created by the interface.  

*NOTE:* The **Dependency Injection** pattern is not the same as the DIP, it is a consequence of it.
