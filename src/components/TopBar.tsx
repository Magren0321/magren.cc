'use client'

import * as React from 'react';
import NProgress from 'nprogress';
export type NextTopLoaderProps = {
  /**
   * Color for the TopLoader.
   * @default "#29d"
   */
  color?: string;
  /**
   * Color for the TopLoader in dark mode.
   */
  darkColor?: string;
  /**
   * The initial position for the TopLoader in percentage, 0.08 is 8%.
   * @default 0.08
   */
  initialPosition?: number;
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number;
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number;
  /**
   * Auto increamenting behaviour for the TopLoader.
   * @default true
   */
  crawl?: boolean;
  /**
   * To show spinner or not.
   * @default true
   */
  showSpinner?: boolean;
  /**
   * Animation settings using easing (a CSS easing string).
   * @default "ease"
   */
  easing?: string;
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number;
  /**
   * Defines a shadow for the TopLoader.
   * @default "0 0 10px ${color},0 0 5px ${color}"
   *
   * @ you can disable it by setting it to `false`
   */
  shadow?: string | false;
};

const NextTopLoader = ({
  color: propColor,
  darkColor: propDarkColor,
  height: propHeight,
  showSpinner,
  crawl,
  crawlSpeed,
  initialPosition,
  easing,
  speed,
  shadow,
}: NextTopLoaderProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const defaultColor = '#29d';
  const defaultHeight = 3;

  const color = propColor ?? defaultColor;
  const darkColor = propDarkColor ?? color;
  const height = propHeight ?? defaultHeight;

  const boxShadow =
    !shadow && shadow !== undefined
      ? ''
      : shadow
      ? `box-shadow:${shadow}`
      : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

  const styles = (
    <style>
      {`#nprogress{pointer-events:none}#nprogress .bar{background:${
        isDarkMode ? darkColor : color
      };position:fixed;z-index:1031;top:0;left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${
        isDarkMode ? darkColor : color
      };border-left-color:${
        isDarkMode ? darkColor : color
      };border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
    </style>
  );

  React.useEffect(() => {
    NProgress.configure({
      showSpinner: showSpinner ?? true,
      trickle: crawl ?? true,
      trickleSpeed: crawlSpeed ?? 200,
      minimum: initialPosition ?? 0.08,
      easing: easing ?? 'ease',
      speed: speed ?? 200,
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange(event: MediaQueryListEvent) {
      setIsDarkMode(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);
    setIsDarkMode(mediaQuery.matches);

    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);
      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {

        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
        );
      }
      return false;
    }


    var npgclass = document.querySelectorAll('html');
    function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase() !== 'a') {
        element = element.parentElement;
      }
      return element as HTMLAnchorElement;
    }
    function handleClick(event: MouseEvent) {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        if (anchor) {
          const currentUrl = window.location.href;
          const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink = (anchor as HTMLAnchorElement).target === '_blank';
          const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
          if (newUrl === currentUrl || isAnchor || isExternalLink) {
            NProgress.start();
            NProgress.done();
            [].forEach.call(npgclass, function (el: Element) {
              el.classList.remove('nprogress-busy');
            });
          } else {
            NProgress.start();
            (function (history) {
              const pushState = history.pushState;
              history.pushState = function () {
                NProgress.done();
                [].forEach.call(npgclass, function (el: Element) {
                  el.classList.remove('nprogress-busy');
                });
                return pushState.apply(history, arguments as any);
              };
            })(window.history);
          }
        }
      } catch (err) {
        NProgress.start();
        NProgress.done();
      }
    }

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [crawl, crawlSpeed, easing, initialPosition, showSpinner, speed]);

  return styles;
};
export default NextTopLoader;

