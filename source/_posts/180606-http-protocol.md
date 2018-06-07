---
title:      "HTTP 协议"
date:       2018-06-06
author:     "Bowen"
tags:
    - 前端开发
    - 网络请求
---

## HTTP 三次握手

`HTTP` 自身没有和 `server` 端通信传输的功能，他是通过 `TCP connection`（作为传输请求的通道）来实现数据的请求和响应功能。所有的 `HTTP` 请求创建时，都会创建一个 `TCP` 通道用于数据传输。

  ![http-tcp][http-tcp]

[http-tcp]:https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/http-tcp.png

- `HTTP 1.0` 时，在 `HTTP` 请求创建时，同样会创建一个 `TCP` 通道用于传输数据。在服务端响应请求后，`TCP` 通道就会关闭。

- `HTTP 1.1` 时，可额外声明让服务端响应请求后，`TCP` 仍保持通道开启。此举用于避免多次请求时，不必要的 `三次握手` 性能开销。

- `HTTP 2` 可并发请求，那么在保持 `TCP` 通道开启时，多个并发请求可共用一个 `TCP` 通道。
