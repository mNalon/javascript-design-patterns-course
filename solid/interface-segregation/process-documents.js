class Machine {
  constructor() {
    if (this.constructor.name === 'Machine') {
      throw new Error('Machine is an abstract class!')
    }
  }

  print() {}
  scan() {}
  fax() {}
}

// instead of using a large interface use a smaller one
class Printer {
  constructor() {
    if (this.constructor.name === 'Printer') {
      throw new Error('Printer is an abstract class!')
    }
  }

  print() {}
}

class MultiFunctionalPrinter extends Printer {
  print(doc) {
    console.log('MultiFunctionalPrinter is printing the doc...')
  }

  //implement the other interfaces
}

class OldFashionedPrinter extends Printer {
  print(doc) {
    console.log('OldFashionedPrinter is printing the doc...')
  }
}

const printer1 = new MultiFunctionalPrinter()
printer1.print('doc')

const printer2 = new OldFashionedPrinter
printer2.print('doc')