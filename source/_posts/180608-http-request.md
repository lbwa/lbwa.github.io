---
title:      "HTTP 协议请求首部"
date:       2018-06-08
author:     "Bowen"
tags:
    - 前端开发
    - 网络请求
---

## Cookie

- 通过 `server` 端响应首部 `Set-Cookie` 设置本地 `HTTP Cookie`。在每次请求时，会通过 `Cookie` 请求首部携带 `HTTP Cookie`（[extension][extension-cookie]）传输至 `server` 端验证，用于确认当前用户等同源信息。

在 `client` 发起一个 `HTTP` 请求时，最多只能有一个 `Cookie` 头部被建立，但 `HTTP Cookie` 不具有唯一性，可以有多个。当 `client` 设置禁用 `Cookie` 后，请求时将完全忽略 `Cookie` 首部的建立。

（拓展阅读: `HTTP 响应首部` - [Set-Cookie][set-cookie]）

[set-cookie]:https://lbwa.github.io/2018/06/07/180607-http-response/#Set-Cookie

## Connection/长连接

- 值为 `keep-alive` 或 `close`。

- 用于构建 `HTTP` 长连接，复用同一客户端下的 `TCP` 通道。即用于告知 `server` 端在此次请求完成后，是否应该保持 `TCP` 通道开启，以用于该 `client` 下次请求可跳过 `三次握手` 直接进行 `TCP` 传输。

    - 注：此举不具有强约束，那么 `server` 端 ***可能*** 有自己的实现并返回不同值的 `Connection` 响应头，而不遵循 `Connection` 请求头的值。

    - 在建立 `HTTP` 长连接后，若没有新的请求，在有效期后 `server` 将会关闭当前 `TCP` 连接通道。

### 资源请求与加载

（拓展阅读: [浏览器工作原理][how-browsers-work]）

以 `Chrome ` 为示例，在控制台 `Network` 选项卡的 `Connection ID` （原理介绍[source][chrome-connection-id]）条目中，相同 ID 的连接即是使用的同一 `TCP` 通道。

（更多的 `Chrome` 的 1. `waterfall` 文档：[source][chrome-water-fall]。2. 控制台官方文档（[source][chrome-console-drawer]））

  1. 在 `HTTP 1.1` 中 `TCP` 通道本身是串行请求的，即一个 `TCP` 通道内每次只执行一次请求，但该 `TCP` 连接通道是可以被同一 `client` 的不同请求复用的（此处应与浏览器允许多个 `TCP` 并发进行区分）。

      - 在 `HTTP 2` 中可进行并发请求。即在请求时，所有请求可并发复用同一个 `TCP` 通道。

  2. `client` 在请求 ***同域*** 的情况下会尽量复用同一 `TCP` 通道。超出限定时间后未有新的请求时，`server` 会关闭当前 `TCP` 连接通道。

  3. `Chrome` 现阶段最大并发数为 6，那么即最多有 6 个 `TCP` 请求（通道开启）同时进行，超出的请求将在队列中等待（[source][chrome-water-fall]）。

[how-browsers-work]:https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/

[chrome-connection-id]:https://stackoverflow.com/questions/34184994/chrome-developer-tools-connection-id

[chrome-water-fall]:https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing

[chrome-console-drawer]:https://developers.google.com/web/tools/chrome-devtools/

整体加载时，`waterfall` 图例：

（注：以下浏览器默认添加 `Connection: keep-alive` 请求头。）

![waterfall1][waterfall1]

上图中，首先加载 `HTML` 文件，在 DOM 树构建完成后，加载外部资源，那么表现为前六个外部资源 `TCP` 请求是并发的，所以他们之间的 `Connection ID` 是不同的。

当其中某一外部资源加载完成，那么请求队列中的请求开始复用之前的 `TCP` 通道，这点可从后续请求的 `Connection ID` 可以看到。

![waterfall2][waterfall2]

单个外部资源 `waterfall` 详细对比：

![initial][initial]

上图中经历过 `HTTP` 三次握手的初始化请求的 `waterfall` 中都有一栏桔黄色条目 `Initial connection`，表示 `三次握手` 所经历的时间。而经过复用 `TCP` 通道的请求时没有这一栏的，即不会经过 `三次握手`。

[waterfall1]:https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/waterfall-integrity1.png

[waterfall2]:https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/waterfall-integrity2.png

[initial]:https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/waterfall-initial.png

## Accept

表示 `client` 可处理的内容类型（`MIME`类型）。
