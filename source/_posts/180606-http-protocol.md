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

[http-tcp]:https://rawgit.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/http-tcp.svg

- `HTTP 1.0` 时，在 `HTTP` 请求创建时，同样会创建一个 `TCP` 通道用于传输数据。在服务端响应请求后，`TCP` 通道就会关闭（非常驻）。

- `HTTP 1.1` 时，可 ***额外声明*** 让服务端响应请求后，`TCP` 仍保持通道开启（常驻状态）。此举用于避免多次请求时，不必要的 `三次握手` 性能开销。

    - 现阶段使用最为广泛的 `HTTP` 协议版本。

- `HTTP 2` 可并发请求，那么在保持 `TCP` 通道开启时，相同用户多次对同一服务器的并发请求可共用一个 `TCP` 通道。

    - `HTTP 2` 正在逐步推广中。 

### 三次握手

在 `HTTP` 通过 `TCP` 执行正式的请求之前，有 3 次预先请求发生在 `client` 和 `server` 端之间。

1. `client` 创建一个预请求以告知 `server`：`client` 即将发起一个正式 `TCP` 连接。此次请求包含标志位（`SYN=1,Seq=X`）。

2. `server` 响应 1 中的预请求，开启相应 `TCP` 端口，并返回一个响应数据包（`SYN=1, ACK=X+1, Seq=Y`）给 `client`。

    - 此次 `server` 返回数据表示 `server` 不仅能够正常接受 `client` 的请求，而且已开启相应端口准备接收即将到来的正式 `TCP` 连接。

    - 此时 `server` 端的 `TCP` 端口将保持开启至响应 `client` 请求（`client` 已正常接收的请求或关闭当前 `TCP` 连接的请求）。

3. `client` 在收到 `server` 端返回的允许创建 `TCP` 连接的请求之后，向 `server` 发送已正常接收到 2 中的响应数据的请求（`ACK=Y+1, Seq=Z`）。

    - 此次请求表示 `client` 能够正常接受 `server` 的响应数据。

此时，完成 `三次握手` 预请求，创建正式的 `TCP` 请求。

### 三次握手的意义

1. 若没有三次握手，直接请求，那么在 `server` 返回数据时，`server` 并不知道 `client` 是否能够正确的接受到请求，是否过程中有数据丢失，那么 `server` 就可能在错误的时机仍然保持 `TCP` 连接端口来等待 `client` 确认数据已接受的请求或关闭当前 `TCP` 连接的请求，这样将带来一系列不必要的 `server` 性能开销。在 `client` 等待时间内没有正确接收请求时，`client` 就会关闭 `TCP` 连接。那么此时 `server` 也就没有必要为为无用的数据连接继续保持开启相应 `TCP` 连接端口。

2. 在有了三次握手的策略后，在正式请求之前，就可以确保当前 `TCP` 通道是可用的，及时发现当前 `TCP` 的网络问题。避免因网络问题导致的无用的数据传输带来的 `server` 端口常驻的性能开销。

## URI/URL/URN

`URI`: Uniform Resource Identifier 统一资源标志符

  - 用于唯一标识互联网中的信息资源

  - 包含 `URL` 和 `URN`

`URL`: Uniform Resource Locator 统一资源定位器

  - 格式如下：

      `protocol://user:pass@host.com:80/path?query=string#hash`

      - `protocol` 协议。如 `https`、`http`、`ftp` 等。

      - `user:pass` 用户验证。因暴露用户账号密码不安全，故不推荐使用。

      - `host` 主机名。

      - `80` 主机端口，默认为 `80`。每个物理主机端口都存放着不同的 web 服务。

      - `path` 路由。
      
          1. `/` 表示当前 `web` 服务的根目录，而不是主机的根目录。
          
          2. `path` 路径默认情况下为 `web` 服务器下数据存放的路径。当数据库独立时，那么 `path` 仅表示数据的 ***存放地址***，并不能表示该数据在服务器磁盘上的路径。

          3. 故推荐在程序内部鉴别数据，而不是通过 URL 鉴别数据。

      - `query=string` 查询参数。常用于向 `server` 端传参。

      - `hash` 哈希值。定位某个资源的某一片段。如文章的锚点。

`URN`: Uniform Resource Name （永久）统一资源定位符

  - 用于永久性在网络中标识出资源，因限制过多，已逐渐被 `URI` 取代。（[extension][urn]）

[urn]:https://en.wikipedia.org/wiki/Uniform_Resource_Name

## HTTP 报文

`HTTP` 报文没有强约束，可自定义报文内容。

![http-bw][http-bw]

[http-bw]:https://rawgit.com/lbwa/lbwa.github.io/dev/source/images/post/http-protocol/http-bw.svg

## HTTP 方法

- 用来定义对于资源的操作

    - 常用方法有 `GET`、`POST`、`PUT`、`DELETE`。另外还有 `HEAD`、`OPTIONS`、`PATCH` 方法。

    - 应该从开发人员的使用方式来定义各自方法的语义。

## HTTP code

- 定义服务器对请求的处理结果。

    - 2XX - Success - 表示成功处理请求。如 200。

    - 3XX - Redirection - 需要重定向，浏览器直接跳转。

    - 4XX - Client Error - 客户端请求错误。

    - 5XX - Server Error - 服务端响应错误。

- 推荐 `server` 端正确配置 HTTP code，使得 HTTP code 语义化。好的 `HTTP` 服务应该可以通过 HTTP code 来判断请求结果。而不是只有 `200` 或 `500`。

拓展：[code 码参考][code-reference]

[code-reference]:http://tool.oschina.net/commons?type=5

## HTTP 客户端

能够发起 HTTP 请求，并能够接收返回数据的客户端都可称为 HTTP 客户端。如 `curl`、`XMLHttpRequest`、浏览器等。

除了在浏览器中可以观察 HTTP 请求的细节外，亦可使用 `curl` 命令行工具来观察。 

```bash
# -v 表示显示报文信息
curl -v www.baidu.com
```

返回数据如下：

```bash
* Rebuilt URL to: www.google.com/
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*
  Trying 172.217.10.132...
* TCP_NODELAY set
* Connected to www.google.com (172.217.10.132) port 80 (#0)
# 请求报文
  # 起始行
> GET / HTTP/1.1
  # 首部
> Host: www.google.com
> User-Agent: curl/7.57.0
> Accept: */*
> # 此处有一空行
# 响应报文
  # 起始行
< HTTP/1.1 200 OK
  # 首部
< Date: Thu, 07 Jun 2018 14:28:45 GMT
< Expires: -1
< Cache-Control: private, max-age=0
< Content-Type: text/html; charset=ISO-8859-1
# 省略一些信息
# ...
< Transfer-Encoding: chunked
<
{ [759 bytes data]
100  3555    0  3555    0     0   3555      0 --:--:--  0:00:01 --:--:--  1834
# 以下是响应报文的主体内容区域
# ...
<!doctype html><html
```

## HTTP 首部

👉[HTTP 响应首部][http-response]

👉[HTTP 请求首部][http-request]

[http-response]:https://lbwa.github.io/2018/06/07/180607-http-response/

[http-request]:https://lbwa.github.io/2018/06/08/180608-http-request/

## 实战

（以 `Nginx` 为例）

`Nginx`（[官网][nginx-official-site]）纯粹地实现 `HTTP` 协议，其中并不包含业务逻辑，正因如此它的 ***可拓展性强***。

[nginx-official-site]:https://nginx.org/en/

### 基础配置

1. 在 `host` 文件中映射原始请求地址。示例：

```shell
# 用于将 example.com 解析为 127.0.0.1，PC 首先在本地 host 文件中解析 URL
127.0.0.1 example.com
```

2. 单独配置 `servers/example.conf`，以配置 `Nginx` 代理

拓展：`http` 是明文传输，故可在代理层修改原始请求的请求首部和内容。

```shell
server {
  # 监听的端口
  listen      80;
  # 监听的 URL，即用户输入的 URL
  server_name test.com;
  
  # 转发的目标地址
  location / {
    # 1. 代理层接受到原始请求后，将发起一个新的请求至代理路径。依据 HTTP 原则，该新的请
    # 求的 host 默认为 proxy_pass。
    # 注：可于终端 server 打印并查看新请求的 host 请求首部。
    proxy_pass http://127.0.0.1:8800;
    # 2. 恢复原始请求的 host 请求首部。变量 $host 即原始请求的 host 请求首部。
    # 注：经浏览器控制台 network tag 可查看原始请求的 host 请求首部
    proxy_set_header Host $host;
  }
}
```

以上配置将实现 `example.com ==转发至==> http://127.0.0.1:8800`。

***注***，代理服务器根据原始请求的 `host` 请求首部来 ***选择*** 代理的目标路径。即可以实现一个端口监听，多个路径代理。
