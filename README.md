# Nashi.Lazy

<pre align="center">
🧪 Working in Progress
</pre>

## What is this?

Nashi.Lazy is a library for lazy loading images. Powered by Nashi.

## Usage

```js
let lazyConfig = {
  root: "#app", // root element, for listening scroll event
  selector: ".lazy", // selector for lazy loading
  placeholder: "https://via.placeholder.com/300", // placeholder image
  loaderAttr: "data-src", // attribute for image source
  throttle: 100, // throttle time for scroll event, default 100ms
};

nashiLazy(lazyConfig);
```

## Tips

nashiLazy will find a nashi instance automatically, if you want to use your own nashi instance, you can pass it to nashi.lazy.

```js
nashiLazy(lazyConfig, YourNashiInstance);
```

## License

此项目 MIT 授权开源，使用此项目进行的二次创作或者衍生项目也必须开源。

This project is MIT licensed, and the secondary creation or derivative project using this project must also be open source.

## Author

Nashi.Lazy © Wibus, Released under the MIT License.

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
