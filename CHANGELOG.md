<a name="1.3.0"></a>
# [1.3.0](https://github.com/lbwa/lbwa.github.io/compare/v1.2.0...v1.3.0) (2018-08-03)


### Bug Fixes

* **home:** add icon height for compatibility ([482faf6](https://github.com/lbwa/lbwa.github.io/commit/482faf6))


### Features

* define viewport for svg icon ([cd1370c](https://github.com/lbwa/lbwa.github.io/commit/cd1370c))
* home bg-image with a grey wrapper and used to be a backup option ([e0ee1c9](https://github.com/lbwa/lbwa.github.io/commit/e0ee1c9))
* **home:** add homeheader animation and optimize scrolling callback destruction ([d3ffaa3](https://github.com/lbwa/lbwa.github.io/commit/d3ffaa3))
* **homeheader:** a functionality for scorlling ([feb1140](https://github.com/lbwa/lbwa.github.io/commit/feb1140))
* **lib/utils:** add requestAnimationFrame to lib/utils ([e91639d](https://github.com/lbwa/lbwa.github.io/commit/e91639d))


### Performance Improvements

* **blog,baseFBtn:** optimize scrolling callback destruction ([b73545c](https://github.com/lbwa/lbwa.github.io/commit/b73545c))
* **throttle:** optimize requestAnimationFrame ([a6e6974](https://github.com/lbwa/lbwa.github.io/commit/a6e6974))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/lbwa/lbwa.github.io/compare/v1.1.0...v1.2.0) (2018-07-31)


### Bug Fixes

* compatible with scroll behavior on IOS browser ([c417063](https://github.com/lbwa/lbwa.github.io/commit/c417063))
* **floatingBtn:** a scrolling bug on desktop Chrome 68 ([e6ba784](https://github.com/lbwa/lbwa.github.io/commit/e6ba784))
* **home:** correct center layout for arrow ([972c388](https://github.com/lbwa/lbwa.github.io/commit/972c388))
* **recent-section:** correct recentPosts default value ([9c334e7](https://github.com/lbwa/lbwa.github.io/commit/9c334e7))


### Features

* add floating button for going back to top ([0b96f8c](https://github.com/lbwa/lbwa.github.io/commit/0b96f8c))
* add language head tag for every unique page ([941dd58](https://github.com/lbwa/lbwa.github.io/commit/941dd58))
* add x-ua-compatile meta tag ([8a1eddf](https://github.com/lbwa/lbwa.github.io/commit/8a1eddf))
* **home-footer:** add home footer ([7833106](https://github.com/lbwa/lbwa.github.io/commit/7833106))
* support beginning animations in home page ([8816e5c](https://github.com/lbwa/lbwa.github.io/commit/8816e5c))
* **blog:** new layout for blog page ([b0b218e](https://github.com/lbwa/lbwa.github.io/commit/b0b218e))
* **home:** add background color of recent section ([40184b8](https://github.com/lbwa/lbwa.github.io/commit/40184b8))
* **home:** add readmore button ([2dc82fd](https://github.com/lbwa/lbwa.github.io/commit/2dc82fd))
* **home:** add recent posts section ([b520dfd](https://github.com/lbwa/lbwa.github.io/commit/b520dfd))
* **home:** new layout for home page ([ea03899](https://github.com/lbwa/lbwa.github.io/commit/ea03899))
* **home-header:** add home header components ([a2e208e](https://github.com/lbwa/lbwa.github.io/commit/a2e208e))
* **style:** add style primary color shade ([8e3dbd6](https://github.com/lbwa/lbwa.github.io/commit/8e3dbd6))


### Performance Improvements

* resize avatar in first screen ([e5bd839](https://github.com/lbwa/lbwa.github.io/commit/e5bd839))
* use `ele.matches` rather than `[...ele.classList].indexOf` ([da7a003](https://github.com/lbwa/lbwa.github.io/commit/da7a003))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/lbwa/lbwa.github.io/compare/v1.0.2...v1.1.0) (2018-07-17)


### Bug Fixes

* restore correct axios base url ([5ed34b1](https://github.com/lbwa/lbwa.github.io/commit/5ed34b1))


### Features

* add service-worker for building PWA ([eb8e43f](https://github.com/lbwa/lbwa.github.io/commit/eb8e43f))


### Performance Improvements

* revise tags detail page and writings catalog style ([3bfc8e9](https://github.com/lbwa/lbwa.github.io/commit/3bfc8e9))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/lbwa/lbwa.github.io/compare/v1.0.1...v1.0.2) (2018-07-16)


### Bug Fixes

* fix wrong path which is used to read cache from local storage ([d3b11ad](https://github.com/lbwa/lbwa.github.io/commit/d3b11ad))
* **CI:** fix menu request link when bundler generate static page ([8faa86d](https://github.com/lbwa/lbwa.github.io/commit/8faa86d))
* pages should scroll to target element when user input hash url ([f5983e7](https://github.com/lbwa/lbwa.github.io/commit/f5983e7))
* pages should scroll to top by default when clicking title in catalog ([ddad664](https://github.com/lbwa/lbwa.github.io/commit/ddad664))


### Features

* **projects page:** add skeleton screen for prejects page ([f913553](https://github.com/lbwa/lbwa.github.io/commit/f913553))
* **writings_id:** implement local storage without window.sessionStorage even if disable cache ([5a3c557](https://github.com/lbwa/lbwa.github.io/commit/5a3c557))
* store menu list to local ([d08ba8e](https://github.com/lbwa/lbwa.github.io/commit/d08ba8e))
* use event bus to implement local storage like vuex in projects page ([63755b1](https://github.com/lbwa/lbwa.github.io/commit/63755b1))


### Performance Improvements

* expend hover style scale in app header ([6d33ec2](https://github.com/lbwa/lbwa.github.io/commit/6d33ec2))


### Reverts

* deprecated pages skeleton component because of suitability ([965002b](https://github.com/lbwa/lbwa.github.io/commit/965002b))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/lbwa/lbwa.github.io/compare/v0.1.0...v1.0.1) (2018-07-12)


### Bug Fixes

* fix app header animation in writings page ([f295753](https://github.com/lbwa/lbwa.github.io/commit/f295753))
* **tags_id page:** fix a bug which can be caused by clicking one of `a.tag-list` link margin ([f8bc4fe](https://github.com/lbwa/lbwa.github.io/commit/f8bc4fe))


### Performance Improvements

* remove markdown meta parser module for decreasing chunk weight ([09816f3](https://github.com/lbwa/lbwa.github.io/commit/09816f3))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/lbwa/lbwa.github.io/compare/40294e1...v0.1.0) (2018-07-11)


### Bug Fixes

* debug wrong import link in components ([26382ff](https://github.com/lbwa/lbwa.github.io/commit/26382ff))
* fix date presentation error (month number should be plus 1) ([8a0f4e3](https://github.com/lbwa/lbwa.github.io/commit/8a0f4e3))
* fix links in article ([14f962f](https://github.com/lbwa/lbwa.github.io/commit/14f962f))
* fix problem that will generate wrong index link ([fb66e27](https://github.com/lbwa/lbwa.github.io/commit/fb66e27))
* fix problem with generating wrong static link ([f4ab606](https://github.com/lbwa/lbwa.github.io/commit/f4ab606))
* fix problem with html tag highlight ([b523c93](https://github.com/lbwa/lbwa.github.io/commit/b523c93))
* refresh filename in `_posts` files, prevent uppercase problem in node js ([90a27e8](https://github.com/lbwa/lbwa.github.io/commit/90a27e8))
* refresh filename in `_posts` files, prevent uppercase problem in node js ([e03a495](https://github.com/lbwa/lbwa.github.io/commit/e03a495))
* reivse underline style of header button when it is selected on mobile device ([0541539](https://github.com/lbwa/lbwa.github.io/commit/0541539))


### Features

* `fs` module has been replace by `axios` module ([a6c1261](https://github.com/lbwa/lbwa.github.io/commit/a6c1261))
* add app footer component ([c42334c](https://github.com/lbwa/lbwa.github.io/commit/c42334c))
* add app header animation ([e3d60ef](https://github.com/lbwa/lbwa.github.io/commit/e3d60ef))
* add article page css ([d235920](https://github.com/lbwa/lbwa.github.io/commit/d235920))
* add initial tags page ([6d2db8f](https://github.com/lbwa/lbwa.github.io/commit/6d2db8f))
* add meta information css ([7c37c5d](https://github.com/lbwa/lbwa.github.io/commit/7c37c5d))
* add mobile header ([b127ceb](https://github.com/lbwa/lbwa.github.io/commit/b127ceb))
* add tag route from article to tags page ([9f5382e](https://github.com/lbwa/lbwa.github.io/commit/9f5382e))
* add tags page ([fb37b78](https://github.com/lbwa/lbwa.github.io/commit/fb37b78))
* build blog catalog generator ([61360c4](https://github.com/lbwa/lbwa.github.io/commit/61360c4))
* build sass variables ([2903dba](https://github.com/lbwa/lbwa.github.io/commit/2903dba))
* complete mobile header animations ([c3e109f](https://github.com/lbwa/lbwa.github.io/commit/c3e109f))
* complete tags  system ([f1d010c](https://github.com/lbwa/lbwa.github.io/commit/f1d010c))
* construct writing index page ([162ca18](https://github.com/lbwa/lbwa.github.io/commit/162ca18))
* dynamic title in client tab, refactor sass ([46a6aa9](https://github.com/lbwa/lbwa.github.io/commit/46a6aa9))
* extract meta (yaml) from single markdown file ([33bc59f](https://github.com/lbwa/lbwa.github.io/commit/33bc59f))
* inject scoped css to child component and build projects page ([2e3093d](https://github.com/lbwa/lbwa.github.io/commit/2e3093d))
* parse markdown and highlight code ([40294e1](https://github.com/lbwa/lbwa.github.io/commit/40294e1))
* responsive web design ([2db4741](https://github.com/lbwa/lbwa.github.io/commit/2db4741))
* support loading animation in tags page ([334b832](https://github.com/lbwa/lbwa.github.io/commit/334b832))
* tags system prototype ([be26a4d](https://github.com/lbwa/lbwa.github.io/commit/be26a4d))


### Performance Improvements

* avatar deoubce and reset h tag sass in article ([68cfaa8](https://github.com/lbwa/lbwa.github.io/commit/68cfaa8))
* new highlight strategy ([aa69124](https://github.com/lbwa/lbwa.github.io/commit/aa69124))
* optimize app header animation(remove $refs), writings page link(by vue router, not default bro ([b542b70](https://github.com/lbwa/lbwa.github.io/commit/b542b70))
* optimize components according to lighthouse ([e499e47](https://github.com/lbwa/lbwa.github.io/commit/e499e47))



