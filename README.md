# 购物车

> A Vue.js project
>
## Build Setup

``` bash
# install dependencies
npm install
# serve with hot reload at localhost:3000
npm start
# build for production with minification
npm run build
```



## 演示网：https://zhangyongwnag.github.io/ShoppingCart_react/build/index.html#/Index
## 演示图：
![](https://img-blog.csdnimg.cn/20190923174058901.gif)


## Fork improvements

* **Immutable Redux reducer** (`src/store/reducer/goods.js`) — the original mutated
  `state.list` items in place, allowed quantity to go below 0, mixed string/number
  types for `goodsNum`, and re-checked every item whenever any unrelated action was
  dispatched (the `default` branch reset selections). All fixed; quantities are now
  clamped at 0 and the initial `check: true` lives in the initial state.
* **Repository hygiene** — removed committed `.idea/` IDE configuration and the
  `build/` output directory, and expanded `.gitignore` so they stay out.
