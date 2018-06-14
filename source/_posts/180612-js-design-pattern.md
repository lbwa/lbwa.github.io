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

即 `Factory Pattern`。

工厂模式即对构造方法封装的抽象（`abstract`）。以特定接口实现创建对象的细节的函数封装，微观上，提高代码复用性，避免创建相似对象时产生大量重复代码；宏观上，使得功能得以抽象，便于思考。

外部调用者只关心该工厂所暴露给外部的使用接口。即外部使用者只关心调用该工厂即可完成特定的相似对象创建或相似的功能实现，并不关心其中的内部实现。

### 实现

```js
// 抽象类 abstract class，即实现某一功能的类
class Car {
  constructor (options) {
    this.type = 'car'
    this.brand = options.brand || 'Default brand'
    this.color = options.color || 'Default color'
  }
}

class Truck {
  constructor (options) {
    this.type = 'truck'
    this.brand = options.brand || 'Default brand'
    this.color = options.color || 'Default color'
  }

  transport () {
    return `I can transport vehicle`
  }
}

// 外部只关心调用该工厂方法即可实现特定功能（根据 options 执行不同路径）
class CarFactory {
  constructor () {
    // 默认抽象类
    Reflect.defineProperty(this, '_vehicle', {
      enumerable: false,
      writable: true,
      value: Car
    })
  }

  createVehicle (options) {
    // 推迟抽象类的实例化，将抽象类的实例化并入工厂类，统一集中管理，使得抽象类与其他代码解耦
    // 通过传入的参数选择不同的实例化路径
    if (options.type === 'truck') this._vehicle = Truck

    return new this._vehicle(options)
  }
}

```

外部调用工厂方法：

```js
// 外部调用只关心工厂方法的结果
const ins = new CarFactory()

const car = ins.createVehicle({
  type: 'car',
  brand: 'Panda',
  color: 'rainbow'
})
car instanceof Car // true

const truck = ins.createVehicle({
  type: 'truck',
  brand: 'Benz',
  color: 'sliver'
})
truck instanceof Truck // true
```

以上示例代码展示了根据传参不同，而执行不同的实例化路径。将判断路径的这个行为封装为一个工厂方法，集中管理，后续若需要修改某一抽象类时，只需要修改工厂方法即可。若不使用该工厂方法，那么在后期需要删除该类时，需要修改所有引用该类的地方，而使用了工厂方法后，删除该类只需要修改工厂方法即可，即将该类与其他代码解耦。

### 实际应用

适用场景：

1. 当我们需要便捷地以不同的属性值创建键值相同的对象时。

2. 执行多次相同的一系列复杂操作时。

### 工厂模式利弊

- 优势

    1. 以一个基础结构创建无限个新的结构相似的实例，解决了创建相似对象的问题。
    
    2. 以一个工厂函数封装可能被复用的操作，避免重复代码。

- 弊端

    2. 基于 1 的类型错误的问题，除非创建结构相似的对象提供一个接口是代码设计的目标，否则都应该显式地使用构造函数来创建对象。这样可以避免因产生错误的对象类型而导致应用复杂度升高。

    3. 基于创建对象的行为通过接口被抽象化，那么可能会为单元测试带来一些困难。至于有多困难取决于被抽象化的行为有多复杂。

### 复杂工厂模式

工厂模式的变种，同样是推迟抽象类的哦实例化。本质上因父类的原型方法可在子类上构建同名原型方法（作用域链与原型链原理）屏蔽，那么子类可以拥有自己独特的原型方法（可实现指定子类的类型），同时又继承了父类。

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

为了解决对象字面量的无法实现私有变量的问题，模块模式利用 ***闭包***（作用域链）原理实现私有变量，保护模块内部变量无法从模块外部修改。

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

单例模式通过模块内部的一个变量 `instance` 来作为实例的缓存容器，通过判断是否存在实例缓存来决定是否执行实例化。据此实现全局只存在唯一一个 `singleton` 的实例的逻辑。

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

即 `Observer Pattern`。

观察者模式：一个主体对象（`subject`）维护一个观察者对象（`observers list`）列表，并且主体对象对状态的任何修改都会被观察者对象 ***自动通知***。对主体对象修改状态的行为感兴趣的对象只需要接受观察者的通知即可。

|基本概念|描述|
|-------|----|
|`Subject` 主体对象| 维护一个观察者列表，并能够添加或移除观察者。|
|`Observer` 观察者 | 提供通知状态更新方法，在主体对象有任何修改状态的改变时，观察者将发出通知。|
|`ConcreteSubject`|存储 `ConcreteObserver`。在主体对象状态改变时，向观察者广播通知。|
|`ConcreteObserver`|存储对 `ConcreteSubject` 的引用，实现一个通知更新的接口，该接口将用于保持与 `ConcreteSubject` 的状态一致。|

### 实现

```js
// 观察者缓存容器（列表）
class ObserverList {
  constructor () {
    this.observerList = []
  }

  add (observer) {
    return this.observerList.push(observer)
  }

  remove (index) {
    return this.observerList.splice(index, 1)
  }

  get (index) {
    return this.observerList[index]
  }

  len () {
    return this.observerList.length
  }

  indexOf (observer, startIndex = 0) {
    const len = this.observerList.length
    for (let i = startIndex; i < len; i++) {
      if (this.observerList[i] === observer) {
        return i
      }
    }
    return -1

    // same as `return this.observerList.indexOf(observer, startIndex)`
  }
}

// 主体
class Subject {
  constructor () {
    // Subject 实例通过 observers 属性来维护观察者列表
    // 即观察者缓存容器
    this.observers = new ObserverList() // { observerList: [] }
  }

  addObserver (observer) {
    this.observers.add(observer)
  }

  removeObserver (observer) {
    // 传入的是某个之前被加入观察者容器中的 Observer　实例的引用的变量，故存在 index
    const index = this.observers.indexOf(observer, 0)
    return  this.observers.remove(index)
  }

  // 参数 context 可选，非重点。
  // 此处重点是 Subject 实例状态改变时，触发容器中每个观察者的更新函数，即让他们发出通知。
  notify (context) {
    const len = this.observers.len()
    for (let i = 0; i < len; i++) {
      this.observers.get(i).update(context)
    }
  }
}

// 观察者
class Observer {
  // 观察者通知类型原型方法，可在其中加入回调，以向这些对观察者通知感兴趣的对象发起通知
  update (context) {
    console.log('observer has been updated.')
  }
}
```

实例化如下：

```js
// concrete Subject
const sub = new Subject()

// Concrete Observer
const obs = new Observer()

sub.addObserver(obs)

// 其中有几个 Observer 实例，update 就被调用几次
sub.notify()
// observer has been  updated.

sub.removeObserver(obs)
// 返回被删除的 obs 观察者实例
```

***注***：一个隐藏的弊端就是，以上代码中并未实现有·选择性的触发 `Observer` 实例的 `update` 函数。`notify` 函数是触发所有的 `Observer` 实例。

示例代码中三者之间的关系如下图：

![observer-pattern][observer-pattern]

[observer-pattern]:https://rawgit.com/lbwa/lbwa.github.io/dev/source/images/post/js-design-pattern/observer-pattern.svg

## 发布/订阅模式

即 `Publish/Subscribe Pattern`。

发布/订阅模式是观察者模式的变种。不同与观察者模式的是发布/订阅模式实现了一个 `主体/事件通道` ，它用于发布者和订阅者之间通信，解耦发布者和订阅者。

### 实现

```js
class Pub {
  constructor () {
    // 订阅者缓存容器，其中包含各类消息的缓存队列
    this.caches = []

    Reflect.defineProperty(this, '_uid', {
      enumerable: false,
      writable: true,
      value: -1
    })
  }

  publish (evt, ...args) {
    if (!this.caches[evt]) return false

    const subscribers = this.caches[evt]
    let len = subscribers ? subscribers.length : 0
    while (len--) {
      subscribers[len].callback.apply(subscribers[len], args)
    }

    return this // pub 实例，启用级联，用于链式调用
  }

  subscribe (evt, callback) {
    // 初始化消息类型为 evt 的缓存容器
    if (!this.caches[evt]) this.caches[evt] = []

    this.caches[evt].push({
      uid: ++this._uid,
      callback
    })
    // caches[evt]: [{uid: 0, fn}, {uid: 1, fnn}, ...]
  }

  unsubscribe (evt, uid) {
    const cache = this.caches[evt]
    const len = this.caches[evt].length

    for (let i = 0; i < len; i++) {
      if (cache[i].uid === uid) {
        return cache.splice(i, 1)
      }
    }

    return this // 启用级联，用于链式调用
  }
}
```

实例化后：

```js
const pub = new Pub()

pub.subscribe('hello',() => console.log('I\'m from hello'))
pub.subscribe('index',() => console.log('I\'m from index'))

// 只调用 hello 类别中的订阅者，而不是像观察者模式那样触发所有订阅者
pub.publish('hello') // I'm from hello

// 只调用 index 类别中的订阅者
pub.publish('index') // I'm from index
```

***关键点***：示例代码中，`evt` 变量即是作为 `主题/事件通道` 的存在，它分离出了不同类型的消息通道，使得发出通知时只会触发相同类型下的订阅者。

![publish-subscribe][publish-subscribe]

[publish-subscribe]:https://rawgit.com/lbwa/lbwa.github.io/dev/source/images/post/js-design-pattern/publish-subscribe.svg

### 实际应用

一个典型应用是 `Vue.js` 中的依赖收集与更新（[我的解析][vue-reactive]）。其中定义了一个 `subs` 变量维护 `主题/事件` 通道。`Watcher` 实例作为订阅者，`Dep` 实例作为发布者。

另一个典型应用 `Vue.js` 中 `event bus`。

```js
// eventBus.js
import Vue from 'vue'
export default new Vue({}) // 该 Vue 实例将暴露在全局中

// a.vue
import eventBus from '@/eventBus'
eventBus.$emit('goPublish', payload) // publish by publisher

// b.vue
import eventBus from '@/eventBus'
function handler (payload) { // callback in b.vue
  // do something
}
eventBus.$on('goPublish', handler) // subscribe by subscriber
eventBus.$off('goPublish', handler) // unsubscribe
```

[vue-reactive]:https://github.com/lbwa/vue-reactive

### 观察者模式和发布/订阅模式的差异

1. 观察者模式

    1. 观察者模式要求希望接受通知的 `观察者对象` 必须订阅它所感兴趣的发起事件的 `主体对象`（`the object firing the event(the subject)`） 。
    
    2. 观察者必须 ***直接*** 订阅主体对象，此举导致二者形成 ***耦合***。主体对象广播时，所有观察者中回调都将被 ***同步*** 执行。

2. 发布/订阅模式

    1. 二者最大的差异是 `发布/订阅模式` 建立了一个 `主题/事件通道`。该通道是位于 `订阅者 subscribers`（希望接受通知的对象，`Observer`）和 `发布者 publisher`（发布通知/事件的对象，`Subject`）之间，作为二者的通信桥梁。
    
    2. 该事件系统（`主题/事件通道`）允许通过应用中包含自定义参数值的特殊事件来 ***区分订阅者***。这样做的目的是 ***选出*** 特定的订阅者用于单独执行回调（可形成一个消息队列），即 ***解耦*** 了订阅者和发布者之间的依赖关系（上文 1.2）。

    3. 观察者是通过 `主题/事件通道` ***间接*** 订阅主体对象。

与观察者模式不同的是，`发布/订阅模式` 允许任何的订阅者执行一个适当的事件处理程序用于注册和接受通过发布者广播的通知。即 `发布/订阅模式` 可单独执行某类消息下的订阅者的回调。而不是像 `观察者模式` 一样每次都执行全部类别消息下的观察者的事件回调。

### 观察者模式和发布/订阅模式的优劣

- 优势

    1. 观察者模式和发布/订阅模式鼓励我们去思考应用中不同模块之间的关系。它们帮助我们用主体对象和观察者对象的集合来代替包含直接关系的逻辑层。最终使得我们的应用更加倾向于轻量，***松耦合***，并改善代码的潜在复用性。

    2. 观察者模式使得 `主体对象` 与 `观察者对象` 形成动态联系。此举在应用中互不相关的模块之间存在强耦合时，提供了一种灵活性高的解耦解决方案。

    3. 观察者模式和发布/订阅模式是设计解耦系统的最佳工具之一，推荐使用。

- 劣势

    1. 在发布/订阅模式中，解耦了发布者和订阅者，那么它们二者之间是没有直接关系的。那么发布者发起事件，通过 `主题/事件通道` 传递给订阅者，在订阅者接受事件之后，触发订阅者回调时，发布者此时是没有方法知道订阅者的回调是否执行成功的。

    2. 发布者与订阅者二者之间的动态关系（动态体现在并不一一对应，可能触发一个或多个订阅者）也导致了 ***难以追踪*** 其中的执行过程。


## 中介者模式

即 `Mediator Pattern`。
