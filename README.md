# Nashi.Lazy

<pre align="center">
🧪 Working in Progress
</pre>

## What is this?

Nashi.Lazy is a library for lazy loading images. Powered by Nashi.

## Usage

```html
<!-- ...more? -->
<img data-src="https://www.baidu.com/img/flexible/logo/pc/index.png?0" src="https://via.placeholder.com/300" class="lazy" alt="">
<img data-src="https://www.baidu.com/img/flexible/logo/pc/index.png?1" src="https://via.placeholder.com/300" class="lazy" alt="">
<!-- ...more? -->
```

```js
let lazyConfig = {
  selector: ".lazy", // selector for lazy loading
  loaderAttr: "data-src", // attribute for image source
  throttle: 100, // throttle time for scroll event, default 100ms
};

nashiLazy(lazyConfig);
// or
nashi.lazyimg(lazyConfig);
```

## Tips

nashiLazy will find a nashi instance automatically, if you want to use your own nashi instance, you can pass it to nashi.lazy.

```js
nashiLazy(lazyConfig, YourNashiInstance);
// or
nashi.lazyimg(lazyConfig);
```

## License

此项目 MIT 授权开源，使用此项目进行的二次创作或者衍生项目也必须开源。

This project is MIT licensed, and the secondary creation or derivative project using this project must also be open source.

## Author

Nashi.Lazy © Wibus, Released under the MIT License.

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
