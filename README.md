# ND React Boilerplate
NetDragon XM Engineering front end React Bolierplate, based on the React + Redux + Webpack


## 开发环境

### 搭建

1. `cd` 到项目根目录，即 package.json 文件所在目录
2. `npm install` 安装开发依赖
3. `npm start` 运行服务器，然后在浏览器中打开 http://127.0.0.1:3000

### 安装软件包

1. 例如：`npm install jquery` 从 npm 上安装 jquery
2. 如果 `package.json` 文件有变化，请重新运行一次 `npm install`，以安装新增的依赖包


## 文件夹结构说明

- index.html
- style (公用的样式)
- src
  - index.js (程序入口)
  - components (组件)
  - actions (动作)
  - store (模型)
  - services (服务接口)
  - reducers (状态更新器)
  - containers (容器)
  - middleware （中间件）
- __tests__ (测试文件目录)

## 文件命名规范

1. 采取大驼峰法，比如定义一个翻页组件，Pagination.js。

## CSS

每个模块各自携带一个 CSS 文件，CSS 启用模块化写法：

    ```
    .standout { color: red; }
    ```
这样在模块 js 文件中 `import styles from './whatever.css'` 后，就可以使用 `styles.standout` 样式，避免各人的样式互相冲突。

如果要使用全局 CSS，如下：

    ```
    :global(.class)
    ```
### 外部全局 CSS

在 app.js 顶部有引入一些 suitcss 模块，是全局 CSS，具体样式类请查看 [github 上的文档](https://github.com/suitcss/utils)。

### CSS 命名规范

请查阅 [BEM](https://en.bem.info/method/definitions/ "BEM 的定义")。

## 测试

测试代码写在 __tests__ 目录下，完成测试代码后，可执行：

    ```
    npm test
    ```

## 模拟后端接口

因为前后端同步开发，前端为方便开发，可尝试使用 [expressjs](https://github.com/chenxsan/express) 搭建服务器，根据 API 文档简单模拟接口，便于后期接入后端。

## 编辑器配置文件

因为各人使用的编辑器可能不一样，所以请注意在 commit 时不要将编辑器配置文件上传到 svn 上，建议直接将它们加入 ignore 列表中。
