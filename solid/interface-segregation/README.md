## Interface Segregation Principle (ISP)

This principle states that no client (implementing class of an interface) should be forced to depend on methods it does not use. To make this possible large interfaces should be broken up into small ones (segregate/split up).  

Let's say we have an interface that represents any kind of machine used to process documents (print, scan, fax, etc).

```javascript
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
```

So if we need a multi-functional printer we can create a class that extends the Machine interface and implements all its methods.

```javascript
class MultiFunctionalPrinter extends Machine {
  print(doc) {
    console.log('printing doc...')
  }

  scan(doc) {
    console.log('scanning doc...')
  }

  fax(doc) {
    console.log('faxing doc...')
  }
}
```

But imagine right now we need to implement a printer that represents an old-fashioned printer and it only knows how to print. 

If we follow the idea of implementing the machine interface we would end up with a problem: what to do with the scan and fax methods? Actually, we could just implement those methods and letting them in the blank or even throw an error, but it would be probably a broken of a principle known as **the principle of least surprise**, where we would have some methods not being so predictable in our API, since when we call those methods they simply would not do anything or throw an error. 

So a better solution for these abstractions would be to create a separate interface for printers, for example, and make the two kinds of printers implement it. 

```javascript
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
```

As you can see we segregated the interface to make it more flexible for the clients that need to implement it. A problem here is that javascript does not support multiple inheritances and in the case of the multi-functional printer, it would be necessary to use some tweaks to make possible the extension of different interfaces (out of the scope dealt here).

*OBS*: Since Javascript does not has a formal concept of interfaces (it normally uses the **duck typing** approach) this principle can be a little bit dummy for the language, but since it is part of the SOLID principle we need to know that it exists. 
