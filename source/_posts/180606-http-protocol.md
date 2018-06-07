---
title:      "HTTP 协议"
date:       2018-06-06
author:     "Bowen"
tags:
    - 前端开发
    - 网络请求
---

## HTTP 三次握手

`HTTP` 自身没有和 `server` 端通信传输的功能，`HTTP` 本身只能发起和响应请求，并不传输请求。他是通过创建的 `TCP connection`（作为传输请求的通道）来实现数据传递功能。所有的 `HTTP` 请求创建时，都会创建一个 `TCP` 通道用于数据传输。

  ![http-tcp][http-tcp]

[http-tcp]:https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/http-tcp.png

- `HTTP 1.0` 时，在 `HTTP` 请求创建时，同样会创建一个 `TCP` 通道用于传输数据。在服务端响应请求后，`TCP` 通道就会关闭（非常驻）。

- `HTTP 1.1` 时，可 ***额外声明*** 让服务端响应请求后，`TCP` 仍保持通道开启（常驻状态）。此举用于避免多次请求时，不必要的 `三次握手` 性能开销。

- `HTTP 2` 可并发请求，那么在保持 `TCP` 通道开启时，相同用户多次对同一服务器的并发请求可共用一个 `TCP` 通道。

### 三次握手

在 `HTTP` 通过 `TCP` 执行正式的请求之前，有 3 次预先请求发生在 `client` 和 `server` 端之间。

1. `client` 创建一个通知 `server` 即将发起一个正式请求的预请求，此次请求包含标志位（`SYN=1,Seq=X`）。

2. `server` 响应 1 中的预请求，开启相应 `TCP` 端口，并返回一个响应数据包（`SYN=1, ACK=X+1, Seq=Y`）给 `client`。

    - 此次 `server` 返回数据表示 `server` 不仅能够正常接受 `client` 的请求，而且已开启相应端口准备接收即将到来的正式 `TCP` 连接。

    - 此时 `server` 端的 `TCP` 端口将保持开启至响应 `client` 请求（`client` 已正常接收的请求或关闭当前 `TCP` 连接的请求）。

3. `client` 在收到 `server` 端返回的允许创建 `TCP` 连接的请求之后，向 `server` 发送已正常接收到 2 中的响应数据的请求（`ACK=Y+1, Seq=Z`）。

    - 此次请求表示 `client` 能够正常接受 `server` 的响应数据。

此时，完成 `三次握手` 预请求，创建正式的 `TCP` 请求。

### 三次握手的意义

1. 若没有三次握手，直接请求，那么在 `server` 返回数据时，`server` 并不知道 `client` 是否能够正确的接受到请求，是否过程中有数据丢失，那么 `server` 就可能在错误的时机仍然保持 `TCP` 连接端口来等待 `client` 确认数据已接受的请求或关闭当前 `TCP` 连接的请求，这样将带来一系列不必要的 `server` 性能开销。在 `client` 等待时间内没有正确接收请求时，`client` 就会关闭 `TCP` 连接。那么此时 `server` 也就没有必要为为无用的数据连接继续保持开启相应 `TCP` 连接端口。

2. 在有了三次握手的策略后，在正式请求之前，就可以确保当前 `TCP` 通道是可用的，及时发现当前 `TCP` 的网络问题。避免因网络问题导致的无用的数据传输带来的 `server` 端口常驻的性能开销。
