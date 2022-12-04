/*
 * @FilePath: /nx-repo-template/src/index.ts
 * @author: Wibus
 * @Date: 2022-07-01 19:50:23
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-01 19:50:24
 * Coding With IU
 */
import nashi, { Core, QueryResult } from '@akrc/nashi';

interface ILazyConfig {
  selector: string; // 需要懒加载的元素
  placeholder: string; // 占位图片
  loaderAttr: string; // loader属性
  throttle: number; // 节流时间
}


/**
 * Lazy Fn
 * @param nashi nashi 实例
 * @param config 配置
 */
export function nashiLazy(config: ILazyConfig, nashi?: Core): QueryResult {

  if (!nashi) {
    if (!window.nashi) {
      throw new Error('Nashi is not found');
    }
    nashi = window.nashi;
  }

  /**
   * Main Idea:
   * 
   * 1. Listen to the scroll event 监听滚动事件
   * 2. When the scroll event is triggered, check whether the element is in the viewport 滚动事件触发时，检查元素是否在视口内
   * 3. If it is in the viewport, load the image 如果在视口内，加载图片
   * 4. If it is not in the viewport, do nothing 如果不在视口内，什么都不做
   * 
   * Before:
   * 
   * 1. Get all the elements that need to be lazy loaded 获取所有需要懒加载的元素
   * 2. Get the root element 获取根元素
   * 3. Get the default image 获取默认图片
   * 4. Get the placeholder image 获取占位图片
   * 5. Change the src attribute of the element to the placeholder image 将元素的src属性改为占位图片
   * 6. Clone the original src attribute of the element and save it to the loader attribute 将元素的原始src属性克隆并保存到loader属性
   */

  // Get all the elements that need to be lazy loaded 获取所有需要懒加载的元素
  const elements = nashi(config.selector);
  if (!elements.length) {
    throw new Error('No elements found');
  }
  // Get the placeholder image 获取占位图片
  const placeholder = config.placeholder;
  // Clone the original src attribute of the element and save it to the loader attribute 将元素的原始src属性克隆并保存到loader属性
  elements.forEach((element: QueryResult) => {
    element.attr(config.loaderAttr, element.attr('src'));
  });
  // Change the src attribute of the element to the placeholder image 将元素的src属性改为占位图片
  elements.attr('src', placeholder);

  // Through the throttle function, the scroll event is triggered once every 100 milliseconds 通过节流函数，每隔100毫秒触发一次滚动事件
  const throttle = (fn: Function, delay: number) => {
    let timer: any = null;
    return function () {
      if (timer) return;
      timer = setTimeout(() => {
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    };
  }

  // Check whether the element is in the viewport 检查元素是否在视口内
  const isInViewport = (element: QueryResult) => {
    if (element.length > 1 ) {
      console.warn('The element is not unique');
      return false;
    } 
    const { top, left, bottom, right } = element.node[0].getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    // 只要有一部分在视口内就算在视口内 If any part is in the viewport, it is considered to be in the viewport
    return (
      (top > 0 && top < innerHeight) ||
      (bottom > 0 && bottom < innerHeight) ||
      (top < 0 && bottom > innerHeight)
    ) && (
      (left > 0 && left < innerWidth) ||
      (right > 0 && right < innerWidth) ||
      (left < 0 && right > innerWidth)
    );
  }

  // Load the image 加载图片
  const loadImage = (element: QueryResult) => {
    const image = new Image();
    image.src = element.attr(config.loaderAttr);
    image.onload = () => {
      element.attr('src', image.src);
    }
  }

  // When the scroll event is triggered, check whether the element is in the viewport 滚动事件触发时，检查元素是否在视口内
  const lazyLoad = throttle(() => {
    elements.each((element: QueryResult) => {
      if (isInViewport(element)) {
        loadImage(element);
      } 
    });
  }, config.throttle);

  // Listen to the scroll event 监听滚动事件
  window.addEventListener('scroll', lazyLoad);

  lazyLoad(); // Trigger the scroll event once 触发一次滚动事件
  window.addEventListener('resize', lazyLoad); // Listen to the resize event 监听resize事件
  window.addEventListener('load', lazyLoad); // Listen to the load event 监听load事件
  window.addEventListener('DOMContentLoaded', lazyLoad); // Listen to the DOMContentLoaded event 监听DOMContentLoaded事件
  window.addEventListener('readystatechange', lazyLoad); // Listen to the readystatechange event 监听readystatechange事件
  window.addEventListener('pageshow', lazyLoad); // Listen to the pageshow event 监听pageshow事件

  // Return the elements that need to be lazy loaded 返回需要懒加载的元素
  return elements;
}

// @ts-ignore
window.nashi.lazyimg = nashiLazy;
window.nashi.prototype.lazyimg = nashiLazy;
window.nashiLazy = nashiLazy;
window.nashi = nashi;