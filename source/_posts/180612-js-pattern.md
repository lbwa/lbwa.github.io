---
title:      "JS 设计模式"
date:       2018-06-12
author:     "Bowen"
tags:
    - 前端开发
    - 设计模式
---

本文是 《[Learning JavaScript Design Patterns][Learning JavaScript Design Patterns]》的读书笔记。该书的作者是鼎鼎大名的 `Addy Osmani`。撰写本文的目的就是为了学习参考大牛的思想，并结合自己的理解来加强自己的知识架构。另外，这本书中提到的 `GoF book` 即 `Gang Of Four book` 指的是 `Design Patterns` 这本书。该书列举了编程领域常见的 23 种编程模式和相应的设计原则。

[Learning JavaScript Design Patterns]:https://addyosmani.com/resources/essentialjsdesignpatterns/book/

|基本概念| 描述 |
|---|---|
|factory method|可根据不同的参数数据或参数事件对象而实例化生成不同的实例|
|prototype|一个包含类的所有实例共享的属性和方法的对象|
|singleton|在全局作用域中只有一个实例的类|

## 工厂模式

```js
function Person (name, age, gender) {
  const person = {}

  person.name = name
  person.age = age
  person.gender = gender

  return person
}

const john = Person('John', 20, 'male')
const mary = Person('Mary', 20, 'female')
```

- 利：以一个基础结构创建无限个新的结构相似的实例，解决了创建相似对象的问题。
- 劣：新的实例无法感知其对象的具体类型，只能知道是对象，但不知道是谁的实例，比如示例代码中无法检测出 `john` 是由 `Person` 创建出来的。

## 构造函数模式

即 `Constructor Pattern`。

继承工厂模式的优点，并解决了工厂模式的弊端，即可检测出是谁创建了实例。

```js
class Person {
  constructor (name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}

const john = new Person('John', 20, 'male')
const mary = new Person('Mary', 20, 'female')

// 构造函数模式通过 constructor 原型属性解决了 `不知道是谁的实例` 的弊端。
john.__proto__.constructor === Person // true
mary.__proto__.constructor === Person //true

john instanceof Person // true
mary instanceof Person // true
```

## 原型模式

即 `Prototype Pattern`。

以一个对象作为原型对象，该对象包含所有实例所共有的属性和方法。

```js
const car = {
  name: 'Benz',

  drive () {
    console.log('I am driving!')
  }
}

const yourCar = Object.create(car)

yourCar.name // 'Benz'
yourCar.drive // 'I am driving!'
```

示例代码中，`Object.create` 指定了以参数对象为新对象的原型对象。那么由 `Object.create(car)` 创建的所有新对象都共享 `car` 对象的所有属性和方法。

### 结合构造函数模式

将 `构造函数模式` 与 `原型模式` 相结合，那么可以实现基于构造函数对象的原型对象创建出不同的构造函数实例。

```js
class SuperPerson extends Person {
  constructor (name, age, gender) {
    super(name, age, gender)
  }

  // 原型方法，它被所有 SuperPerson 的实例所共享
  say (property) {
    const detect = `${property}` in this
    if (!detect) {
      throw new Error('parameter must be a string of `name, age, gender`')
      return
    }

    return this[property]
  }
}

const jack = new SuperPerson('Jack', 20, 'male')
const lily = new SuperPerson('Lily', 20, 'female')

// say 方法是原型方法，能被任何实例访问，但它不单独属于任何实例
'say' in jack // true
jack.hasOwnProperty('say') // false
'say' in lily // true
lily.hasOwnProperty('say') // false
```

## 模块模式

即 `Module Pattern`。

在 JS 中实现模块（即一个拥有公共接口的封闭命名空间）的方式：

1. 模块模式

2. 对象字面量

3. AMD 模块

4. CommonJS 模块

5. ES 模块语法

### 对象字面量

```js
const myModule = {
  property: 'some value',

  fu () {
    console.log('I\'m a function in Object')
  }
}

myModule.property // some value
myModule.fn // I'm a function in Object
```

- 利：示例代码中 `myModule` 构成了一个功能集合（模块），方便调用。
- 弊：模块中的键值对可被外部任意修改，不具有安全性。

### 模块模式

利用 ***闭包***（作用域链）原理实现私有变量，保护模块内部变量无法从模块外部修改。

```js
const myModule = (function () {
  // 私有变量，只能被模块内部修改，对外部不可见。
  let counter = 0

  // 公有方法和属性，是模块外部访问内部变量的唯一渠道。
  return {
    running () {
      return ++counter
    },
    reset () {
      counter = 0
      return counter
    }
  }
})()
```

示例代码中，私有变量 `counter` 因公有方法保持了对其引用，故在函数执行完成后，仍存在于内存中直至公有方法或属性的生命周期结束。

模块模式在 `jQuery` 等一些 `JS` 库中都有广泛的应用。

另外还存在一种模块模式的变种模式。

1. 传入参数

```js
const myModule = (function (jQuery, lodash) {
  function reviseHtml () {
    jQ('.container').html('test')
  }

  function printMin () {
    console.log(_.min([1, 2, 3]))
  }

  return {
    revise: reviseHTML,
    print: printMin
  }

  // 传入参数
})(jQuery, _)
```

2. 返回模块对象

```js
const myModule = (function () {
  let module = {}
  const privateVariable = 'Hello'
  function privateFn () {}

  module.publicVariable = 'World'
  module.publicFn = function () {
    privateFn()
    console.log(privateVariable)
  }

  return module
})
```

模块模式的应用技巧，将所有私有方法和属性统一，只通过公有接口暴露其键名。这样可直观展示出该模块的公有接口及其与私有方法或属性的关系。

```js
const customModule = (function () {
  let counter = 0

  function addFunction () {
    counter++
    console.log(`Counter is ${counter}.`)
  }

  function minusFunction () {
    counter--
    console.log(`Counter is ${counter}.`)
  }

  function resetFunction () {
    counter = 0
    console.log(`Counter is ${counter}.`)
  }

  // 清晰展示了公有接口及其与内部变量的关系
  return {
    add: addFunction,
    minus: minusFunction,
    reset: resetFunction
  }
})()
```

### 模块模式利弊

- 优势

    1. 基于面向对象编程使得功能逻辑更为清晰。
    
    2. 保护了模块内部变量，该变量只能通过公有方法修改，无法通过模块外部修改。

- 劣势

    1. 可拓展性差，没有遵循设计模块的 ***开（放）（封）闭原则***（对拓展开放，对修改封闭）。该模块一旦建立，其功能就被固定，后期拓展该模块必须修改模块本身，这是违背开闭原则中的 `对拓展开放`。

    2. 除非需要创建一个不希望后期被拓展的封闭模块，那么 1 就是劣势。

    3. 模块模式的公有接口有被修改的风险。


## 单例模式

即 `Singleton Pattern`。

在 `模块模式` 基础上发展而成的 `单例模式`，在实例化时，最多在全局只创建一个该类的实例。

```js
const singleton = (function () {

  // 实例化方法，可以是一个构造函数或模块
  // （可选）可分离出 singleton 模块
  // init 模块
  function init () {
    let privateNum = 10
    const privateFn = function () {}

    return {
      num: privateNum,
      fn: privateFn
    }
  }

  // singleton 类的实例的缓存容器，必须以私有变量的形式存在于 singleton 模块中
  let _instance = null

  // singleton 类的公有方法
  return {
    // 该方法通过闭包形式保持了对实例缓存容器的引用，只有在不存在实例时才执行 init 初始化
    getInit () {
      // 缓存实例
      _instance = _instance ? _instance : init()
      // or _instance = _instance ? _instance : new Initialize()
      return _instance
    }
  }
})()

const ins1 = singleton.getInit() // { num: 10, fn: function () {} }
const ins2 = singleton.getInit() // { num: 10, fn: function () {} }

ins1 === ins2 // true
```

单例模式通过模块内部的一个变量 `instance` 来作为实例的缓存容器，通过判断是否存在实例缓存来决定是否实例化。据此实现全局只存在唯一一个 `singleton` 的实例的逻辑。

### 单例模式适用场景

1. 作用域中只应存在唯一一个具有公共接口的类的实例，比如创建弹窗。

    ```js
    const createDiv = (function () {
      let div = null

      return function () {
        if (!div) {
          div = document.createElement('div')
          div.innerText = 'Hello world'
          div.style.display = 'none'
          document.body.appendChild(div)
        }
        return div
      }
    })()

    document.querySelector('.btn').addEventListener('click', evt => {
      // 即使是多次点击也是只有一个弹窗被创建
      const div = createDiv()
      div.style.display = 'block'
    })
    ```
    以上代码保证了即使存在多次点击，也只会在第一次点击时创建弹窗元素。另外该效果也可使用函数防抖（[extension][debounce-function]）来实现，不同的是，只有在有限时间内的最后一次点击生效。但是超过有限时间仍然会创建多个弹窗元素。

[debounce-function]:https://github.com/lbwa/lbwa.github.io/issues/10

2. 在单例通过子类拓展后，使用者可以调用该拓展后的单例而不用修改使用者本身的代码。

    ```js
    singleton.getInit = function () {
      if (this._instance === null) {
        // 判断是否拓展单例
        if (doSomething()) {
          // 拓展单例
          this._instance = new SubSingleton()
        } else {
          // 初始化单例
          this._instance = new BasicSingleton()
        }
      }
      return this._instance
    }
    ```

     示例代码中，`SubSingleton` 是 `BasicSingleton` 的子类，具有与 `BasicSingleton` 相同的数据接口。

### 通用的单例模式

```js
const getInit = function (fn) {
  let cache = null

  return function (...args) {
    // this 为调用该匿名包装函数的对象
    // args 为调用该匿名包装函数时传入的 rest 参数
    return cache || (cache = fn.apply(this, args))
  }
}
```

创建单例弹窗：

```js
const createDiv = function (text) {
  const div = document.createElement('div')
  div.innerText = `${text}`

  return div
}

const initDiv = getInit(createDiv)

document.querySelector('.btn').addEventListener('click', evt => {
  // 匿名包装函数内 this 指向 .btn 元素，args 为 ['hello world']
  initDiv('hello world')
})
```

### 单例模式利弊

- 优势

    1. 使得类的实例化过程可控，即控制类的实例数量，保证作用域内只存在唯一的实例。实际上，在应用中只需要一个单例就可协调其他模块运作的情况下，都应该使用单例模式。

    2. 单例可通过子类任意拓展，使用者在调用该拓展后的单例时也不用修改使用者本身的代码。

### 单例模式的风险

当在应用中经常使用单例时，这时应该重新评估自己的代码结构。这通常表明该单例模块要么过于与其他模块的逻辑耦合，要么在应用中过于分散。过度使用单例将导致范围过大的依赖关系，即 `debug` 成本增加。后期如要将单例修改为多个实例或移除单例都会很麻烦。

## 观察者模式