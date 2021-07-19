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

const parent = new Person('Daniel')

const child1 = new Person('Maria')
const child2 = new Person('Kadu')

const relationShips = new RelationShips()
relationShips.addParentAndChild(parent, child1)
relationShips.addParentAndChild(parent, child2)

new Search(relationShips)