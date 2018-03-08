---
layout:     post
title:      "理解 event loop 机制"
subtitle:   "Event Loop 到底是什么，又是如何实现的？"
date:       2018-03-8
author:     "lbwa"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 前端开发
    - JavaScript
    - 事件循环
---

事件循环机制是重要的 JavaScript 核心基础之一。本文主要总结了：
1. 什么是事件循环
2. 事件循环的构成
3. 剖析事件循环(Event Loop)的运行机制，区分调用栈(call stack)、任务源(Task Source)、任务队列(Task Queues)

# 详解事件循环

## 1.简介

> An event loop has one or more task queues.

### 1.1 调用栈（帧）

宿主环境中**所有的 JavaScript 代码执行**都是依靠调用栈来执行。

众所周知，JavaScript 是单线程语言。单线程体现在**只有一个调用栈，或称只有一个事件循环**（注：宿主环境（浏览器、NodeJS等）中不止一个事件循环，其中包含`browser contexts`和`web workers`，本文讨论`browser contexts`），即 JavaScript 在执行时（在宿主环境中 runtime ）一次只执行一段代码（只做一件事情）。

###  1.2 任务队列/任务源

在宿主环境中，一个调用栈（事件循环）可以有**一个或者多个**任务队列。

在宿主环境中我们将任务队列分为宏任务（macro-task）、微任务（micro-task）（[参考1][1]、[参考2][2]）。

宏任务（macro-task）：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

微任务（micro-task）: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)

其中将宏任务或微任务中的每一类（如 setTimeout）称为`任务源`。遇到任务源，首先将任务分发到对应的队列（宏任务队列或微任务队列）中去等待执行。

相同任务源的任务，在执行时进入相同的任务队列。

**不同任务源**的任务，在执行时进入**不同的任务队列**。

在单独的任务队列中，任务中是按照先进先出的顺序执行。

**注：**

1. setTimeout/setInterval 是作为一个任务分发器的存在，他们函数本身会在调用栈中立即执行，分发任务完成后，启动定时器完成就**立即弹出**调用栈(这与普通函数中调用另一函数是不同的。原因见1.3)。而其中他们函数的第一个参数对象，即他们所要分发的任务才是**延迟**执行的。
1. new Promise( ) 中参数对象的函数体是在调用栈中立即执行，执行完成后弹出调用栈。进入微任务队列的是 then 中的 callback。（此处 new Promise 与 Promise.then() 机制是不同的。）

### 1.2.1 区分 Task Queues 和 Job Queues

Task Queues 出自 [w3c][w3c]、[HTML5 Standard][html5]两个规范。Job Queues 出自 [ES6 Standard][es6]。他们两个是不同的东西。

在宿主环境中（浏览器、Node等），宿主环境通过 Event loop 来推动 JavaScript 代码的执行。Event loop 时，宿主环境（浏览器、Node等）不断的从 Task Queues 取出任务并处理。Task Queues 的作用是选择在合适时机执行队列内容。

JavaScript 引擎（V8 等）在内部实现了自己的 Job Queues，Job Queues不依赖于宿主环境而存在，即 JavaScript 引擎不关注 Event Loop，只关注 Job Queues。 那么，Job Queues 与 Event loop 没有直接关系。一般是在[ES6标准中的Promise][promise]中用到了 Job Queues。

### 1.3 简易示例

示例中讨论的是同源任务(只有一个任务队列时)的调用栈。

有如下代码：

``` javascript
function foo() {
  throw new Error('Oops!')
}
function bar() {
  foo()
}
function baz() {
  bar()
}
baz()
```
返回结果正好体现了调用栈的行为：
> VM12839:2 Uncaught Error: Oops!
> 　　at foo (<anonymous>:2:9)
> 　　at bar (<anonymous>:5:3)
> 　　at baz (<anonymous>:8:3)
> 　　at <anonymous>:10:1

将调用栈可视化为动图，如下：
![event-loop-0](https://raw.githubusercontent.com/lbwa/lbwa.github.io/master/img/in-post/event-loop-0.gif)

> 调用一个函数会暂停当前函数的执行，传递控制权和参数给新的函数。—— 《 JavaScript 语言精粹 》 P27

在解释调用栈之前，要明白：

1. 函数执行完成后**总是**会返回一个结果，自定义返回值(return)或 undefined。
1. 函数体A中调用一个函数B，A之所以会进入"冻结状态"，是因为A函数体内要等到B返回结果才能结束当前函数A的执行，即当前A调用栈才算完成，之后弹出调用栈。

那么，回到之前代码。全局代码整体进入调用栈，这里用`main()`表示，之后声明3个函数，之后开始调用`baz()`，在`baz()`函数体内执行到调用`bar`，此时，`baz`函数体暂停执行，进入"冻结状态"，将执行权交给`bar`，然后执行`bar`，后面调用`foo`亦是如此。这是为什么调用栈中会叠起来的原因。

至此，总结了 JavaScript 中调用栈的基本行为模式。我们可拓展至开发时，我们是如何获取数据的？

### 1.4 拓展：Ajax中的数据获取

之前我们看到所有的函数调用都是同步进行，为了防止同步执行所带来的阻塞，即避免"冻结"发生。在 JavaScript 中，我们获取数据总是**异步**的，不是同步的，没有`return`，只有`callback`。

## 2. 不同源任务的调用栈

``` javascript
setTimeout(function() {
    console.log('timeout1');
}, 5000)

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
}).then(function() {
    console.log('then2');
})

console.log('global1');
```
结果：
> promise1
> promise2
> global1
> then1
> then2
> undefined
// 间隔
> timeout1

以上代码调用栈，如下：

1. 全局代码进入调用栈
1. setTimeout()立即执行，分发`console.log('timeout1')`并启动计时器，其排在全局代码之后
1. new Promise() 参数中的函数体立即执行，这里输出`promise1`和`promise2`
1. 至`then(callback)`，此时，第一个`then`的 callback 加入微任务队列。
1. 往后继续执行代码，输出`global1`，因为之前 then 的 callback 还未执行，那么全局代码还未完成
1. 若微队列有任务，则把微队列所有任务执行完成。此时，输出`then1`，并返回 undefined ，此时下一个`then`的 callback 加入微任务队列
1. 执行下一个微任务，输出`then2`，微队列执行完成，并弹出调用栈
1. 此时浏览器可能开始更新渲染，并进入下一轮事件循环
1. 自2后的第五秒，计时器结束，触发事件，`console.log('timeout1')`插入代码至队列，因为此时宏任务队列为空，那么它排在队列第一位，之后进入调用栈执行代码，执行完成后弹出作用栈。
1. 代码执行完成，弹出调用栈，所有代码执行完成

注：以上代码中，当 Promise 实例链式调用两个 callback 时，开始**只有**第一个 callback 进入微任务队列，待第一个 callback 执行完成后，才将第二个 callback 加入微任务队列。[参考][blog0]

综上，事件循环的**顺序**是，整个script代码，放在了宏任务队列中，在执行全局代码时，若产生其他同任务源的宏任务，那么将其依次（先进先出）放入同宏任务队列中。在执行宏任务过程中，若产生 promise.then 等微任务类型则放到了另一个任务队列微任务队列中。

这两个任务队列执行顺序如下，取1个宏任务队列中的 task ，执行之。若之前因宏任务执行，而产生微任务，那么把所有微队列中的任务顺序执行完，再取宏任务中的下一个任务。

注：以上代码执行顺序是依据 V8 引擎的实现，在不同的 JavaScript 引擎(不同 NodeJS 版本、不同浏览器)中的代码实现是**不同**的。那么就会导致执行代码顺序的不同。

# 参考

`JavaScript 语言精粹(修订版)`

[w3c Event loop][w3c]

[HTML5 Standard][html5]

[ECMA Jobs and Job Queues][job-queues]

[Tasks, microtasks, queues and schedules][blog0]

[Great talk at JSConf 2014 on the event loop][video]


[1]:https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context

[2]:http://www.ituring.com.cn/article/66566

[w3c]:https://www.w3.org/TR/html5/webappapis.html#event-loops

[html5]:https://html.spec.whatwg.org/multipage/webappapis.html#event-loops

[es6]:http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues

[promise]:http://www.ecma-international.org/ecma-262/6.0/#sec-performpromisethen

[job-queues]:http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues

[blog0]:https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

[video]:https://www.youtube.com/watch?v=8aGhZQkoFbQ
