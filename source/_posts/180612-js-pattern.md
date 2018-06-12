---
title:      "JS 设计模式"
date:       2018-06-12
author:     "Bowen"
tags:
    - 前端开发
    - 设计模式
---

本文是 《[Learning JavaScript Design Patterns][Learning JavaScript Design Patterns]》的读书笔记。该书的作者是鼎鼎大名的 Addy Osmani。撰写本文的目的就是为了学习参考大牛的思想，并结合自己的理解来加强自己的知识架构。

[Learning JavaScript Design Patterns]:https://addyosmani.com/resources/essentialjsdesignpatterns/book/

|基本概念| 描述 |
|---|---|
|factory method|可根据不同的参数数据或参数事件对象而实例化生成不同的实例|
|prototype|一个包含所有实例共享的属性和方法的对象|
|singleton|在全局中只有一个实例的类|

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

在 JS 中实现模块的方式：

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

- 模块模式优势

    1. 基于面向对象编程使得逻辑更为清晰。
    
    2. 保护了模块内部变量，该变量只能通过公有方法修改，无法通过模块外部修改。

- 模块模式劣势

    1. 可拓展性差，没有遵循设计模块的 ***开（放）（封）闭原则***（对拓展开放，对修改封闭）。该模块一旦建立，其功能就被固定，后期拓展该模块必须修改模块本身，这是违背开闭原则中的 `对拓展开放`。

    2. 在某种情况下 1 不一定是劣势，比如构建一个后期不希望被拓展的封闭模块。
