import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback, useMemo } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetchWithHeaders } from './index-CUww0JST.js';
import { SessionProvider, signIn } from '@hono/auth-js/react';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Menu, LayoutGrid, Layers, Square, Home, RefreshCcw, Info, CheckCircle2, ShoppingBag, ChevronRight, DollarSign, X, Plus, Save, Edit2, Trash2 } from 'lucide-react';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'ws';
import '@auth/core/jwt';
import 'node:path';
import 'node:fs';
import 'node:url';
import '@react-router/dev/routes';
import 'node:fs/promises';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-expect-error -- generic forwardRef signature doesn't propagate the As type param
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useIdleTimer({
    disabled: typeof window === "undefined",
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = LoadFonts ;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-3987f819",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-5463aa6a",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-85a92975",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-ef08210e",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-9577ef09",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-c73dd72e",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-5ee1b1a8",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-08aa2d50",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-22378788",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-64a5e1bb",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-1f5216b1",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-4f158018",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-d40284b0",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-1449b97f",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      // 5 minutes
      cacheTime: 1e3 * 60 * 30,
      // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "min-h-screen bg-slate-50 font-sans text-slate-900",
      renderId: "render-f9a4a382",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md",
        renderId: "render-60e8d934",
        as: "header",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          renderId: "render-1fa6d3bd",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-2",
            renderId: "render-ac8821a7",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[#E31E24] text-white font-bold text-xl",
              renderId: "render-2a7830c9",
              as: "div",
              children: "S"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-bold tracking-tight text-[#E31E24]",
              renderId: "render-4f70075b",
              as: "span",
              children: "SOKOGATE"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden md:flex items-center gap-8",
            renderId: "render-325daa42",
            as: "nav",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "#",
              className: "text-sm font-medium hover:text-[#E31E24] transition-colors",
              renderId: "render-c1c43a74",
              as: "a",
              children: "Products"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "#",
              className: "text-sm font-medium hover:text-[#E31E24] transition-colors",
              renderId: "render-ef072035",
              as: "a",
              children: "Calculators"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "#",
              className: "text-sm font-medium hover:text-[#E31E24] transition-colors",
              renderId: "render-0491915a",
              as: "a",
              children: "About Us"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-4",
            renderId: "render-58b766b5",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "hidden sm:flex h-10 items-center justify-center rounded-full bg-[#E31E24] px-6 text-sm font-semibold text-white hover:bg-[#c4191f] transition-colors shadow-lg shadow-red-200",
              renderId: "render-19b0f5fe",
              as: "button",
              children: "Download App"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "md:hidden p-2 text-slate-600",
              renderId: "render-1eb8db21",
              as: "button",
              children: /* @__PURE__ */ jsx(Menu, {
                size: 24
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
        renderId: "render-b0ab60fb",
        as: "main",
        children
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-20 border-t bg-slate-900 py-12 text-slate-400",
        renderId: "render-7d8f442c",
        as: "footer",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          renderId: "render-2033e1d4",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 gap-8 md:grid-cols-4",
            renderId: "render-70be846b",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "col-span-1 md:col-span-2",
              renderId: "render-6ac78727",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2 mb-4",
                renderId: "render-8e0f0742",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "flex h-8 w-8 items-center justify-center rounded bg-white text-[#E31E24] font-bold",
                  renderId: "render-a074b320",
                  as: "div",
                  children: "S"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xl font-bold text-white",
                  renderId: "render-9618bd49",
                  as: "span",
                  children: "SOKOGATE"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "max-w-xs text-sm leading-relaxed",
                renderId: "render-a07151f7",
                as: "p",
                children: "Your number one marketplace for building and construction materials in Nigeria. Quality products, delivered to your site."
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-6c38f7e0",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mb-4 text-sm font-semibold text-white uppercase tracking-wider",
                renderId: "render-44792232",
                as: "h3",
                children: "Resources"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "space-y-2 text-sm",
                renderId: "render-c48d3fc3",
                as: "ul",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-4e0b813a",
                  as: "li",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    href: "#",
                    className: "hover:text-white transition-colors",
                    renderId: "render-57a950d4",
                    as: "a",
                    children: "Calculators"
                  })
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-f3638f3a",
                  as: "li",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    href: "#",
                    className: "hover:text-white transition-colors",
                    renderId: "render-b49b2b5b",
                    as: "a",
                    children: "Product Catalogue"
                  })
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-a09975ed",
                  as: "li",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    href: "#",
                    className: "hover:text-white transition-colors",
                    renderId: "render-37792669",
                    as: "a",
                    children: "Delivery Terms"
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-3e499dd4",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mb-4 text-sm font-semibold text-white uppercase tracking-wider",
                renderId: "render-5b26df2f",
                as: "h3",
                children: "Contact"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "space-y-2 text-sm",
                renderId: "render-0028f7d3",
                as: "ul",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-99ac884f",
                  as: "li",
                  children: "support@sokogate.com"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-bca8f585",
                  as: "li",
                  children: "+234 (0) 800 SOKOGATE"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mt-12 border-t border-slate-800 pt-8 text-center text-xs",
            renderId: "render-86bc6408",
            as: "div",
            children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " Sokogate Technologies. All rights reserved."]
          })]
        })
      })]
    })
  });
}

const TILE_TYPES = [{
  id: "ceramic",
  name: "Ceramic"
}, {
  id: "porcelain",
  name: "Porcelain"
}, {
  id: "vitrified",
  name: "Vitrified"
}, {
  id: "marble",
  name: "Marble Effect"
}, {
  id: "granite",
  name: "Granite"
}];
const TILE_COLORS = [{
  id: "white",
  hex: "#F5F5F5",
  name: "White"
}, {
  id: "beige",
  hex: "#D4A574",
  name: "Beige"
}, {
  id: "cream",
  hex: "#FFFDD0",
  name: "Cream"
}, {
  id: "grey",
  hex: "#9CA3AF",
  name: "Grey"
}, {
  id: "brown",
  hex: "#8B4513",
  name: "Brown"
}, {
  id: "black",
  hex: "#1F2937",
  name: "Black"
}, {
  id: "maroon",
  hex: "#800000",
  name: "Maroon"
}, {
  id: "navy",
  hex: "#1E3A5F",
  name: "Navy"
}, {
  id: "teal",
  hex: "#0D9488",
  name: "Teal"
}, {
  id: "ivory",
  hex: "#FFFFF0",
  name: "Ivory"
}, {
  id: "tan",
  hex: "#D2B48C",
  name: "Tan"
}, {
  id: "slate",
  hex: "#64748B",
  name: "Slate"
}];
function Room3DPreview({
  length = 5,
  width = 4,
  tileSize = 60
}) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("beige");
  const [selectedType, setSelectedType] = useState("ceramic");
  const roomLength = length || 5;
  const roomWidth = width || 4;
  const ts = (tileSize || 60) / 100;
  const cols = Math.ceil(roomLength / ts);
  const rows = Math.ceil(roomWidth / ts);
  const currentColor = TILE_COLORS.find((c) => c.id === selectedColor) || TILE_COLORS[1];
  const currentType = TILE_TYPES.find((t) => t.id === selectedType) || TILE_TYPES[0];
  const floorTiles = useMemo(() => {
    const tiles = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        tiles.push({
          key: `${i}-${j}`,
          row: i,
          col: j
        });
      }
    }
    return tiles;
  }, [cols, rows]);
  const maxDim = Math.max(cols, rows);
  const baseTileSize = Math.min(28, 240 / maxDim);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200",
    renderId: "render-24b18240",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between px-4 py-3 border-b border-slate-100",
      renderId: "render-367460a4",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-bold text-slate-900",
        renderId: "render-dce8884a",
        as: "h3",
        children: "3D Room Preview"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex gap-2",
        renderId: "render-85dbf1a4",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setShowOptions(!showOptions),
          className: `px-3 py-1.5 text-xs font-semibold rounded-lg ${showOptions ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-91ba4773",
          as: "button",
          children: "Options"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setVisible(!visible),
          className: "px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg",
          renderId: "render-139dc1ed",
          as: "button",
          children: visible ? "Hide" : "Show"
        })]
      })]
    }), showOptions && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-slate-100",
      renderId: "render-2153dfba",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-c8e601fa",
        as: "p",
        children: "Tile Type"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2 mb-3",
        renderId: "render-6b79ce07",
        as: "div",
        children: TILE_TYPES.map((type) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedType(type.id),
          className: `px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-8245a2ff",
          as: "button",
          children: type.name
        }, type.id))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-7c34c6b1",
        as: "p",
        children: "Tile Color"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2",
        renderId: "render-3ad02477",
        as: "div",
        children: TILE_COLORS.map((color) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedColor(color.id),
          className: `w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? "border-[#E31E24]" : "border-transparent"}`,
          style: {
            backgroundColor: color.hex
          },
          title: color.name,
          renderId: "render-b5427323",
          as: "button"
        }, color.id))
      })]
    }), visible && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4",
      renderId: "render-79fdbfba",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex justify-center items-center h-64 bg-slate-50 rounded-xl overflow-hidden",
        renderId: "render-3ce61b51",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative",
          style: {
            width: cols * baseTileSize + 60,
            height: rows * baseTileSize + 80
          },
          renderId: "render-7e8bdd77",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute rounded-t-md",
            style: {
              top: 0,
              left: 40,
              right: 0,
              height: 40,
              backgroundColor: "#E2E8F0"
            },
            renderId: "render-6dc627af",
            as: "div"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "absolute",
            style: {
              top: 40,
              left: 0,
              right: 0,
              bottom: 0
            },
            renderId: "render-a142c36c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              style: {
                position: "absolute",
                top: 0,
                left: 40,
                height: 100,
                width: cols * baseTileSize,
                backgroundColor: "#F1F5F9"
              },
              renderId: "render-bfb5158f",
              as: "div"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: rows * baseTileSize,
                backgroundColor: "#CBD5E1"
              },
              renderId: "render-f5b9afa2",
              as: "div"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              style: {
                position: "absolute",
                top: 0,
                right: 0,
                width: 40,
                height: rows * baseTileSize,
                backgroundColor: "#94A3B8"
              },
              renderId: "render-07af3a7e",
              as: "div"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute flex flex-wrap rounded-sm",
            style: {
              top: 100,
              left: 40,
              width: cols * baseTileSize,
              height: rows * baseTileSize,
              border: "3px solid #E31E24",
              padding: 1,
              overflow: "hidden",
              backgroundColor: "#F8FAFC"
            },
            renderId: "render-f6638d41",
            as: "div",
            children: floorTiles.map((tile) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "rounded-sm",
              style: {
                width: baseTileSize - 2,
                height: baseTileSize - 2,
                backgroundColor: currentColor.hex,
                margin: 0.5
              },
              renderId: "render-0bd48648",
              as: "div"
            }, tile.key))
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex justify-around mt-4",
        renderId: "render-6d808db5",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-99a663f9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-072894d3",
            as: "p",
            children: "Room Size"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-776d64d8",
            as: "p",
            children: [roomLength, "m × ", roomWidth, "m"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-f3339d80",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-27336dc0",
            as: "p",
            children: "Floor Area"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-fb61366e",
            as: "p",
            children: [(roomLength * roomWidth).toFixed(2), " m²"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-bc9c83ce",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-282c40a8",
            as: "p",
            children: ["Tiles (", ts * 100, "cm)"]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-52c74510",
            as: "p",
            children: [cols, " × ", rows]
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-3 p-2 bg-slate-50 rounded-lg",
        renderId: "render-ea15ba4e",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-slate-500 text-center",
          renderId: "render-8f1fec7b",
          as: "p",
          children: ["Type: ", currentType.name, " | Color: ", currentColor.name]
        })
      })]
    })]
  });
}

const BLOCK_TYPES = [{
  id: "sandcrete",
  name: "Sandcrete"
}, {
  id: "concrete",
  name: "Concrete"
}, {
  id: "solid",
  name: "Solid Block"
}, {
  id: "hollow",
  name: "Hollow Block"
}];
const BLOCK_COLORS = [{
  id: "grey",
  hex: "#9CA3AF",
  name: "Grey"
}, {
  id: "darkgrey",
  hex: "#6B7280",
  name: "Dark Grey"
}, {
  id: "lightgrey",
  hex: "#D1D5DB",
  name: "Light Grey"
}, {
  id: "charcoal",
  hex: "#4B5563",
  name: "Charcoal"
}, {
  id: "slate",
  hex: "#64748B",
  name: "Slate"
}, {
  id: "white",
  hex: "#F3F4F6",
  name: "White"
}];
function Wall3DPreview({
  length = 10,
  height = 3
}) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedType, setSelectedType] = useState("sandcrete");
  const wallLength = length || 10;
  const wallHeight = height || 3;
  const blockWidth = 0.45;
  const blockHeight = 0.225;
  const cols = Math.ceil(wallLength / blockWidth);
  const rows = Math.ceil(wallHeight / blockHeight);
  const currentColor = BLOCK_COLORS.find((c) => c.id === selectedColor) || BLOCK_COLORS[0];
  const currentType = BLOCK_TYPES.find((t) => t.id === selectedType) || BLOCK_TYPES[0];
  const blocks = useMemo(() => {
    const b = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        b.push({
          key: `${i}-${j}`,
          row: i,
          col: j
        });
      }
    }
    return b;
  }, [cols, rows]);
  const maxDim = Math.max(cols, rows);
  const baseBlockSize = Math.min(16, 180 / maxDim);
  const wallWidth = cols * baseBlockSize;
  const wallHeightPx = rows * baseBlockSize;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200",
    renderId: "render-4894228e",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between px-4 py-3 border-b border-slate-100",
      renderId: "render-b19eed24",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-bold text-slate-900",
        renderId: "render-de9a10ed",
        as: "h3",
        children: "3D Wall Preview"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex gap-2",
        renderId: "render-038b370a",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setShowOptions(!showOptions),
          className: `px-3 py-1.5 text-xs font-semibold rounded-lg ${showOptions ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-c52ff56f",
          as: "button",
          children: "Options"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setVisible(!visible),
          className: "px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg",
          renderId: "render-84bfe061",
          as: "button",
          children: visible ? "Hide" : "Show"
        })]
      })]
    }), showOptions && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-slate-100",
      renderId: "render-50120273",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-61c5ec34",
        as: "p",
        children: "Block Type"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2 mb-3",
        renderId: "render-36751289",
        as: "div",
        children: BLOCK_TYPES.map((type) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedType(type.id),
          className: `px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-32fd8d48",
          as: "button",
          children: type.name
        }, type.id))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-f09fda08",
        as: "p",
        children: "Block Color"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2",
        renderId: "render-29d88fc9",
        as: "div",
        children: BLOCK_COLORS.map((color) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedColor(color.id),
          className: `w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? "border-[#E31E24]" : "border-transparent"}`,
          style: {
            backgroundColor: color.hex
          },
          title: color.name,
          renderId: "render-806ba019",
          as: "button"
        }, color.id))
      })]
    }), visible && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4",
      renderId: "render-4a1050f7",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex justify-center items-center h-52 bg-slate-50 rounded-xl overflow-hidden",
        renderId: "render-fa5c59f1",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative",
          style: {
            width: wallWidth + 60,
            height: wallHeightPx + 60
          },
          renderId: "render-ad0879f3",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute rounded-t-md",
            style: {
              top: 0,
              left: 30,
              right: 0,
              height: 30,
              backgroundColor: "#BFDBFE"
            },
            renderId: "render-8b60dc05",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute flex flex-wrap rounded-sm",
            style: {
              top: 30,
              left: 30,
              width: wallWidth,
              height: wallHeightPx,
              border: "2px solid #6B7280",
              backgroundColor: "#F1F5F9"
            },
            renderId: "render-f327c043",
            as: "div",
            children: blocks.map((block) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute rounded-sm",
              style: {
                width: baseBlockSize - 1,
                height: baseBlockSize * 0.5 - 0.5,
                backgroundColor: currentColor.hex,
                left: block.row * baseBlockSize,
                top: block.col * baseBlockSize * 0.5
              },
              renderId: "render-68305865",
              as: "div"
            }, block.key))
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex justify-around mt-4",
        renderId: "render-66cc44ba",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-1860b1e2",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-12dd07d0",
            as: "p",
            children: "Wall Size"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-0cdef884",
            as: "p",
            children: [wallLength, "m × ", wallHeight, "m"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-2fe09e5d",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-ad1050c4",
            as: "p",
            children: "Wall Area"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-0ab46b9c",
            as: "p",
            children: [(wallLength * wallHeight).toFixed(2), " m²"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-854d1be5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-b05090cc",
            as: "p",
            children: 'Blocks (9")'
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-6ac2697f",
            as: "p",
            children: [cols, " × ", rows * 2]
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-3 p-2 bg-slate-50 rounded-lg",
        renderId: "render-ab63377d",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-slate-500 text-center",
          renderId: "render-622abf13",
          as: "p",
          children: ["Type: ", currentType.name, " | Color: ", currentColor.name]
        })
      })]
    })]
  });
}

const PLASTER_TYPES = [{
  id: "cement",
  name: "Cement Sand"
}, {
  id: "lime",
  name: "Lime Plaster"
}, {
  id: "gypsum",
  name: "Gypsum"
}, {
  id: "mud",
  name: "Mud/Clay"
}];
const PLASTER_COLORS = [{
  id: "cream",
  hex: "#FDE68A",
  name: "Cream"
}, {
  id: "yellow",
  hex: "#FCD34D",
  name: "Yellow"
}, {
  id: "gold",
  hex: "#FBBF24",
  name: "Gold"
}, {
  id: "amber",
  hex: "#F59E0B",
  name: "Amber"
}, {
  id: "orange",
  hex: "#D97706",
  name: "Orange"
}, {
  id: "brown",
  hex: "#B45309",
  name: "Brown"
}, {
  id: "white",
  hex: "#FEF3C7",
  name: "White"
}, {
  id: "sand",
  hex: "#FDE047",
  name: "Sand"
}];
function Plaster3DPreview({
  area = 20,
  thickness = 15
}) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("cream");
  const [selectedType, setSelectedType] = useState("cement");
  const wallArea = area || 20;
  const thick = thickness || 15;
  const rows = Math.min(8, Math.ceil(Math.sqrt(wallArea)));
  const cols = Math.min(10, Math.ceil(wallArea / rows));
  const currentColor = PLASTER_COLORS.find((c) => c.id === selectedColor) || PLASTER_COLORS[0];
  const currentType = PLASTER_TYPES.find((t) => t.id === selectedType) || PLASTER_TYPES[0];
  const sections = useMemo(() => {
    const s = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j
        });
      }
    }
    return s;
  }, [cols, rows]);
  const maxDim = Math.max(cols, rows);
  const sectionSize = Math.min(35, 250 / maxDim);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200",
    renderId: "render-a0f867bc",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between px-4 py-3 border-b border-slate-100",
      renderId: "render-4e7aa039",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-bold text-slate-900",
        renderId: "render-26fead6e",
        as: "h3",
        children: "3D Wall Plaster Preview"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex gap-2",
        renderId: "render-f244b829",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setShowOptions(!showOptions),
          className: `px-3 py-1.5 text-xs font-semibold rounded-lg ${showOptions ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-e458e6f8",
          as: "button",
          children: "Options"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setVisible(!visible),
          className: "px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg",
          renderId: "render-0621234b",
          as: "button",
          children: visible ? "Hide" : "Show"
        })]
      })]
    }), showOptions && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-slate-100",
      renderId: "render-1f348e0c",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-1f75ef13",
        as: "p",
        children: "Plaster Type"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2 mb-3",
        renderId: "render-112a6fdd",
        as: "div",
        children: PLASTER_TYPES.map((type) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedType(type.id),
          className: `px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-5f60d272",
          as: "button",
          children: type.name
        }, type.id))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-97c4e6ad",
        as: "p",
        children: "Plaster Color"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2",
        renderId: "render-01ea56a9",
        as: "div",
        children: PLASTER_COLORS.map((color) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedColor(color.id),
          className: `w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? "border-[#E31E24]" : "border-transparent"}`,
          style: {
            backgroundColor: color.hex
          },
          title: color.name,
          renderId: "render-259022c2",
          as: "button"
        }, color.id))
      })]
    }), visible && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4",
      renderId: "render-9382fe99",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex justify-center items-center h-56 bg-slate-50 rounded-xl overflow-hidden",
        renderId: "render-f7ad8ff7",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative",
          style: {
            width: cols * sectionSize + 40,
            height: rows * sectionSize + 50
          },
          renderId: "render-d95ab438",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute rounded-t-md",
            style: {
              top: 0,
              left: 20,
              right: 20,
              height: 20,
              backgroundColor: "#BFDBFE"
            },
            renderId: "render-829609bd",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute flex flex-wrap rounded-md",
            style: {
              top: 20,
              left: 20,
              width: cols * sectionSize,
              height: rows * sectionSize,
              border: "2px solid #F59E0B",
              backgroundColor: "#F8FAFC"
            },
            renderId: "render-f81a049d",
            as: "div",
            children: sections.map((section) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "rounded-sm",
              style: {
                width: sectionSize - 2,
                height: sectionSize - 2,
                backgroundColor: currentColor.hex,
                margin: 1
              },
              renderId: "render-67a762e6",
              as: "div"
            }, section.key))
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "absolute flex items-end",
            style: {
              left: cols * sectionSize + 15,
              top: 20
            },
            renderId: "render-88e3e348",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              style: {
                width: 8,
                height: 60,
                backgroundColor: "#E5E7EB",
                borderRadius: 4
              },
              renderId: "render-07bca18e",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                style: {
                  width: "100%",
                  height: Math.min(thick * 2, 50),
                  backgroundColor: "#F59E0B",
                  borderRadius: 4
                },
                renderId: "render-db44ce22",
                as: "div"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-[10px] text-slate-500 ml-1",
              renderId: "render-8dba0250",
              as: "span",
              children: [thick, "mm"]
            })]
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex justify-around mt-4",
        renderId: "render-fbf9fd09",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-b4cbcba7",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-67352547",
            as: "p",
            children: "Wall Area"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-ffabf190",
            as: "p",
            children: [wallArea, " m²"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-9ffa8569",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-909a00bc",
            as: "p",
            children: "Thickness"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-f92af96c",
            as: "p",
            children: [thick, " mm"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-1cfb0a3c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-3901dc2c",
            as: "p",
            children: "Mix Ratio"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-7242f394",
            as: "p",
            children: "1:4"
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-3 p-2 bg-slate-50 rounded-lg",
        renderId: "render-03a2b2be",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-slate-500 text-center",
          renderId: "render-149a7dc7",
          as: "p",
          children: ["Type: ", currentType.name, " | Color: ", currentColor.name]
        })
      })]
    })]
  });
}

const ROOFING_TYPES = [{
  id: "aluminum",
  name: "Aluminum"
}, {
  id: "zinc",
  name: "Zinc"
}, {
  id: "copper",
  name: "Copper"
}, {
  id: "steel",
  name: "Steel"
}, {
  id: "tile",
  name: "Roof Tile"
}, {
  id: "shingle",
  name: "Shingle"
}];
const ROOFING_COLORS = [{
  id: "purple",
  hex: "#7C3AED",
  name: "Purple"
}, {
  id: "violet",
  hex: "#8B5CF6",
  name: "Violet"
}, {
  id: "lavender",
  hex: "#A78BFA",
  name: "Lavender"
}, {
  id: "lilac",
  hex: "#C4B5FD",
  name: "Lilac"
}, {
  id: "mauve",
  hex: "#DDD6FE",
  name: "Mauve"
}, {
  id: "periwinkle",
  hex: "#EDE9FE",
  name: "Periwinkle"
}, {
  id: "charcoal",
  hex: "#374151",
  name: "Charcoal"
}, {
  id: "terracotta",
  hex: "#B45309",
  name: "Terracotta"
}, {
  id: "rust",
  hex: "#9A3412",
  name: "Rust"
}, {
  id: "slate",
  hex: "#64748B",
  name: "Slate"
}];
function Roofing3DPreview({
  length = 12,
  width = 8
}) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedType, setSelectedType] = useState("aluminum");
  const bldgLength = length || 12;
  const bldgWidth = width || 8;
  const sheetLength = 2.4;
  const sheetWidth = 0.9;
  const overlap = 0.15;
  const effectiveSheetLength = sheetLength - overlap;
  const effectiveSheetWidth = sheetWidth - overlap;
  const sheetsLength = Math.ceil(bldgLength / effectiveSheetLength);
  const sheetsWidth = Math.ceil(bldgWidth / effectiveSheetWidth);
  const totalSheets = sheetsLength * sheetsWidth;
  const currentColor = ROOFING_COLORS.find((c) => c.id === selectedColor) || ROOFING_COLORS[0];
  const currentType = ROOFING_TYPES.find((t) => t.id === selectedType) || ROOFING_TYPES[0];
  const roofSlope = 0.3;
  const roofRise = bldgWidth * roofSlope;
  const sheets = useMemo(() => {
    const s = [];
    for (let i = 0; i < sheetsLength; i++) {
      for (let j = 0; j < sheetsWidth; j++) {
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          offset: j % 2 === 1 ? roofRise / 2 : 0
        });
      }
    }
    return s;
  }, [sheetsLength, sheetsWidth]);
  const maxDim = Math.max(sheetsLength, sheetsWidth);
  const sheetSize = Math.min(40, 300 / maxDim);
  const roofWidth = sheetsWidth * sheetSize;
  const roofLength = sheetsLength * sheetSize;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200",
    renderId: "render-b348e4bb",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between px-4 py-3 border-b border-slate-100",
      renderId: "render-e41989bd",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-bold text-slate-900",
        renderId: "render-47e05ba7",
        as: "h3",
        children: "3D Roof Preview"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex gap-2",
        renderId: "render-3c0926c9",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setShowOptions(!showOptions),
          className: `px-3 py-1.5 text-xs font-semibold rounded-lg ${showOptions ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-70123c84",
          as: "button",
          children: "Options"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setVisible(!visible),
          className: "px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg",
          renderId: "render-eda548dd",
          as: "button",
          children: visible ? "Hide" : "Show"
        })]
      })]
    }), showOptions && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-slate-100",
      renderId: "render-46d6d6b5",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-9fdb4eb4",
        as: "p",
        children: "Roofing Type"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2 mb-3",
        renderId: "render-dc508e89",
        as: "div",
        children: ROOFING_TYPES.map((type) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedType(type.id),
          className: `px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? "bg-[#E31E24] text-white" : "bg-slate-100 text-slate-600"}`,
          renderId: "render-5a9288a8",
          as: "button",
          children: type.name
        }, type.id))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-slate-500 mb-2",
        renderId: "render-a5b63a61",
        as: "p",
        children: "Sheet Color"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2",
        renderId: "render-5f38f31d",
        as: "div",
        children: ROOFING_COLORS.map((color) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setSelectedColor(color.id),
          className: `w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? "border-[#E31E24]" : "border-transparent"}`,
          style: {
            backgroundColor: color.hex
          },
          title: color.name,
          renderId: "render-5db9bc88",
          as: "button"
        }, color.id))
      })]
    }), visible && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4",
      renderId: "render-a031182e",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex justify-center items-center h-52 bg-slate-50 rounded-xl overflow-hidden",
        renderId: "render-34518bf6",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative",
          style: {
            width: roofLength + 60,
            height: roofWidth + roofRise + 80
          },
          renderId: "render-e14a46fe",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute rounded-t-md",
            style: {
              top: 0,
              left: 30,
              right: 0,
              height: 25,
              backgroundColor: "#BFDBFE"
            },
            renderId: "render-8eca1b22",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            style: {
              position: "absolute",
              bottom: 20,
              left: 30,
              width: 8,
              height: 50,
              backgroundColor: "#CBD5E1"
            },
            renderId: "render-f3f452e5",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            style: {
              position: "absolute",
              bottom: 20,
              right: 30,
              width: 8,
              height: 50,
              backgroundColor: "#94A3B8"
            },
            renderId: "render-96334600",
            as: "div"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "absolute flex flex-wrap rounded-sm",
            style: {
              bottom: 20,
              left: 30,
              width: roofLength,
              height: roofWidth,
              border: "2px solid #7C3AED",
              backgroundColor: "#EDE9FE",
              transform: "skewY(-15deg)",
              transformOrigin: "bottom"
            },
            renderId: "render-bf53b93f",
            as: "div",
            children: [sheets.map((sheet) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute rounded-sm",
              style: {
                width: sheetSize - 2,
                height: sheetSize * 0.6,
                backgroundColor: currentColor.hex,
                left: sheet.row * sheetSize,
                top: sheet.col * sheetSize * 0.6 + sheet.offset
              },
              renderId: "render-f0d4ecbe",
              as: "div"
            }, sheet.key)), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              style: {
                position: "absolute",
                top: -8,
                left: -5,
                width: roofLength + 10,
                height: 8,
                backgroundColor: "#5B21B6",
                borderRadius: 2
              },
              renderId: "render-55b032ca",
              as: "div"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            style: {
              position: "absolute",
              bottom: 30,
              left: 45,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#FCD34D"
            },
            renderId: "render-32485807",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            style: {
              position: "absolute",
              bottom: 45,
              left: 60,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#FCD34D"
            },
            renderId: "render-3d4568df",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            style: {
              position: "absolute",
              bottom: 0,
              left: 30,
              right: 0,
              height: 20,
              backgroundColor: "#86EFAC"
            },
            renderId: "render-e2897c9c",
            as: "div"
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex justify-around mt-4",
        renderId: "render-986ca74a",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-046170d1",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-025a943e",
            as: "p",
            children: "Roof Size"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-f5d675c1",
            as: "p",
            children: [bldgLength, "m × ", bldgWidth, "m"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-b3de5a30",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-ccdacdf4",
            as: "p",
            children: "Sheets"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-38f75dea",
            as: "p",
            children: [sheetsLength, " × ", sheetsWidth]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center",
          renderId: "render-75137cd3",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-slate-500",
            renderId: "render-5fa4b4be",
            as: "p",
            children: "Total"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-slate-900",
            renderId: "render-940ae82a",
            as: "p",
            children: [totalSheets, " sheets"]
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-3 p-2 bg-slate-50 rounded-lg",
        renderId: "render-dd8c16f1",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-slate-500 text-center",
          renderId: "render-b3b9bf20",
          as: "p",
          children: ["Type: ", currentType.name, " | Color: ", currentColor.name]
        })
      })]
    })]
  });
}

const roundUp = (val) => Math.ceil(val);
const formatCurrency = (amount) => `₦${amount.toLocaleString("en-NG", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;
function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("tiles");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const getPrice = (name) => {
    const product = products.find((p) => p.name === name);
    return product ? Number(product.price) : 0;
  };
  const tabs = [{
    id: "tiles",
    name: "Floor Tiles",
    icon: LayoutGrid
  }, {
    id: "plaster",
    name: "Plastering",
    icon: Layers
  }, {
    id: "blocks",
    name: "Building Blocks",
    icon: Square
  }, {
    id: "roofing",
    name: "Roofing Sheets",
    icon: Home
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "space-y-8",
    renderId: "render-e43ee180",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center space-y-2",
      renderId: "render-46ca9517",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900",
        renderId: "render-46d98bd8",
        as: "h1",
        children: ["Construction Materials", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[#E31E24]",
          renderId: "render-493c5d41",
          as: "span",
          children: "Calculator"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mx-auto max-w-2xl text-slate-500",
        renderId: "render-4692955c",
        as: "p",
        children: "Professional-grade estimates for your building project. Accurately calculate quantities and costs for tiles, cement, blocks, and roofing."
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex flex-wrap justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-3xl mx-auto",
      renderId: "render-b8e001e7",
      as: "div",
      children: tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => setActiveTab(tab.id),
          className: `
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${isActive ? "bg-white text-[#E31E24] shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"}
              `,
          renderId: "render-7920124d",
          as: "button",
          children: [/* @__PURE__ */ jsx(Icon, {
            size: 18
          }), tab.name]
        }, tab.id);
      })
    }), loading ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-5xl mx-auto text-center py-20",
      renderId: "render-ef9e2535",
      as: "div",
      children: [/* @__PURE__ */ jsx(RefreshCcw, {
        className: "animate-spin mx-auto mb-4 text-[#E31E24]",
        size: 32
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-slate-500",
        renderId: "render-d979bfe1",
        as: "p",
        children: "Loading pricing data..."
      })]
    }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-5xl mx-auto",
      renderId: "render-d3c3e52a",
      as: "div",
      children: [activeTab === "tiles" && /* @__PURE__ */ jsx(TilesCalculator, {
        getPrice
      }), activeTab === "plaster" && /* @__PURE__ */ jsx(PlasteringCalculator, {
        getPrice
      }), activeTab === "blocks" && /* @__PURE__ */ jsx(BlocksCalculator, {
        getPrice
      }), activeTab === "roofing" && /* @__PURE__ */ jsx(RoofingCalculator, {
        getPrice
      })]
    })]
  });
}
function TilesCalculator({
  getPrice
}) {
  const [inputs, setInputs] = useState({
    length: 5,
    width: 4,
    tileLength: 60,
    tileWidth: 60,
    wastage: 10,
    boxSize: 10
  });
  const results = useMemo(() => {
    const area = inputs.length * inputs.width;
    const tileArea = inputs.tileLength / 100 * (inputs.tileWidth / 100);
    const basePieces = area / tileArea;
    const totalPieces = roundUp(basePieces * (1 + inputs.wastage / 100));
    const boxes = roundUp(totalPieces / inputs.boxSize);
    const adhesiveBags = roundUp(area / 4.5);
    const tileBoxPrice = getPrice("Floor Tile (Box of 10)");
    const adhesivePrice = getPrice("Tile Adhesive");
    const totalCost = boxes * tileBoxPrice + adhesiveBags * adhesivePrice;
    return {
      area,
      totalPieces,
      boxes,
      adhesiveBags,
      totalCost,
      tileBoxPrice,
      adhesivePrice
    };
  }, [inputs, getPrice]);
  return /* @__PURE__ */ jsx(CalculatorLayout, {
    title: "Floor Tiles Estimator",
    icon: LayoutGrid,
    inputs: /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Room3DPreview, {
        length: inputs.length,
        width: inputs.width,
        tileSize: inputs.tileLength
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        renderId: "render-f70435ec",
        as: "div",
        children: [/* @__PURE__ */ jsx(InputGroup, {
          label: "Room Length (m)",
          value: inputs.length,
          onChange: (v) => setInputs({
            ...inputs,
            length: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Room Width (m)",
          value: inputs.width,
          onChange: (v) => setInputs({
            ...inputs,
            width: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Tile Length (cm)",
          value: inputs.tileLength,
          onChange: (v) => setInputs({
            ...inputs,
            tileLength: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Tile Width (cm)",
          value: inputs.tileWidth,
          onChange: (v) => setInputs({
            ...inputs,
            tileWidth: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Wastage (%)",
          value: inputs.wastage,
          onChange: (v) => setInputs({
            ...inputs,
            wastage: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Pieces per Box",
          value: inputs.boxSize,
          onChange: (v) => setInputs({
            ...inputs,
            boxSize: v
          })
        })]
      })]
    }),
    results: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-7a311fee",
      as: "div",
      children: [/* @__PURE__ */ jsx(ResultCard, {
        label: "Total Area",
        value: `${results.area.toFixed(2)} m²`
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Total Pieces Needed",
        value: results.totalPieces,
        subtext: "(including wastage)"
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Boxes to Order",
        value: results.boxes,
        highlight: true,
        price: results.tileBoxPrice > 0 ? `${formatCurrency(results.tileBoxPrice)} per box` : null
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Adhesive Bags (20kg)",
        value: results.adhesiveBags,
        price: results.adhesivePrice > 0 ? `${formatCurrency(results.adhesivePrice)} per bag` : null
      }), results.totalCost > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200",
        renderId: "render-98d538a4",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-96fced10",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-green-900",
            renderId: "render-427c8047",
            as: "span",
            children: "Estimated Total Cost"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-extrabold text-green-700",
            renderId: "render-80f2ae9f",
            as: "span",
            children: formatCurrency(results.totalCost)
          })]
        })
      })]
    })
  });
}
function PlasteringCalculator({
  getPrice
}) {
  const [inputs, setInputs] = useState({
    area: 20,
    thickness: 15,
    ratio: 4,
    // 1:4
    wastage: 5
  });
  const results = useMemo(() => {
    const volume = inputs.area * (inputs.thickness / 1e3);
    const dryVolume = volume * 1.33;
    const totalVolume = dryVolume * (1 + inputs.wastage / 100);
    const cementVolume = totalVolume / (1 + inputs.ratio);
    const sandVolume = cementVolume * inputs.ratio;
    const cementBags = roundUp(cementVolume / 0.0347);
    const cementPrice = getPrice("Cement 50kg Bag");
    const sandPrice = getPrice("Building Sand");
    const totalCost = cementBags * cementPrice + sandVolume * sandPrice;
    return {
      cementBags,
      sandVolume,
      totalCost,
      cementPrice,
      sandPrice
    };
  }, [inputs, getPrice]);
  return /* @__PURE__ */ jsx(CalculatorLayout, {
    title: "Plastering Estimator",
    icon: Layers,
    inputs: /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Plaster3DPreview, {
        area: inputs.area,
        thickness: inputs.thickness
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        renderId: "render-62e638a8",
        as: "div",
        children: [/* @__PURE__ */ jsx(InputGroup, {
          label: "Wall Area (m²)",
          value: inputs.area,
          onChange: (v) => setInputs({
            ...inputs,
            area: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Thickness (mm)",
          value: inputs.thickness,
          onChange: (v) => setInputs({
            ...inputs,
            thickness: v
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "sm:col-span-2",
          renderId: "render-259a336c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-slate-700 mb-1",
            renderId: "render-dc78f44a",
            as: "label",
            children: "Mix Ratio (Cement:Sand)"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
            value: inputs.ratio,
            onChange: (e) => setInputs({
              ...inputs,
              ratio: Number(e.target.value)
            }),
            renderId: "render-de6a2f16",
            as: "select",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: 3,
              renderId: "render-fff62730",
              as: "option",
              children: "1:3 (Strong)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: 4,
              renderId: "render-8edc0d25",
              as: "option",
              children: "1:4 (Standard)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: 5,
              renderId: "render-8a1a9df2",
              as: "option",
              children: "1:5 (Light)"
            })]
          })]
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Wastage (%)",
          value: inputs.wastage,
          onChange: (v) => setInputs({
            ...inputs,
            wastage: v
          })
        })]
      })]
    }),
    results: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-94df9709",
      as: "div",
      children: [/* @__PURE__ */ jsx(ResultCard, {
        label: "Cement Bags (50kg)",
        value: results.cementBags,
        highlight: true,
        price: results.cementPrice > 0 ? `${formatCurrency(results.cementPrice)} per bag` : null
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Sand Required",
        value: `${results.sandVolume.toFixed(2)} m³`,
        price: results.sandPrice > 0 ? `${formatCurrency(results.sandPrice)} per m³` : null
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "p-3 bg-blue-50 rounded-lg flex gap-3 text-xs text-blue-700",
        renderId: "render-645db9b0",
        as: "div",
        children: [/* @__PURE__ */ jsx(Info, {
          size: 16,
          className: "shrink-0"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-ecd4f367",
          as: "p",
          children: "Calculations account for 33% shrinkage from dry mix to wet plaster."
        })]
      }), results.totalCost > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200",
        renderId: "render-1f28e6fd",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-3156b5fb",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-green-900",
            renderId: "render-1624eee1",
            as: "span",
            children: "Estimated Total Cost"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-extrabold text-green-700",
            renderId: "render-11821ec9",
            as: "span",
            children: formatCurrency(results.totalCost)
          })]
        })
      })]
    })
  });
}
function BlocksCalculator({
  getPrice
}) {
  const [inputs, setInputs] = useState({
    length: 10,
    height: 3,
    blockSize: "9-inch",
    // 225x450
    openings: 2,
    // e.g. 1 door, 1 window
    openingArea: 3.5,
    // Total m2 of openings
    wastage: 5
  });
  const results = useMemo(() => {
    const wallArea = inputs.length * inputs.height - inputs.openingArea;
    const blockArea = 0.10125;
    const blockCount = roundUp(wallArea / blockArea * (1 + inputs.wastage / 100));
    const cementBags = roundUp(blockCount / 100 * 0.6);
    const blockPrice = getPrice("9 inch Sandcrete Block");
    const mortarCementPrice = getPrice("Mortar Cement");
    const totalCost = blockCount * blockPrice + cementBags * mortarCementPrice;
    return {
      blockCount,
      cementBags,
      wallArea,
      totalCost,
      blockPrice,
      mortarCementPrice
    };
  }, [inputs, getPrice]);
  return /* @__PURE__ */ jsx(CalculatorLayout, {
    title: "Building Blocks Estimator",
    icon: Square,
    inputs: /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Wall3DPreview, {
        length: inputs.length,
        height: inputs.height
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        renderId: "render-7aff7642",
        as: "div",
        children: [/* @__PURE__ */ jsx(InputGroup, {
          label: "Wall Length (m)",
          value: inputs.length,
          onChange: (v) => setInputs({
            ...inputs,
            length: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Wall Height (m)",
          value: inputs.height,
          onChange: (v) => setInputs({
            ...inputs,
            height: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Opening Deduction (m²)",
          value: inputs.openingArea,
          onChange: (v) => setInputs({
            ...inputs,
            openingArea: v
          }),
          subtext: "Doors, windows, etc."
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Wastage (%)",
          value: inputs.wastage,
          onChange: (v) => setInputs({
            ...inputs,
            wastage: v
          })
        })]
      })]
    }),
    results: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-89f9092a",
      as: "div",
      children: [/* @__PURE__ */ jsx(ResultCard, {
        label: "Effective Wall Area",
        value: `${results.wallArea.toFixed(2)} m²`
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Blocks Needed",
        value: results.blockCount,
        highlight: true,
        price: results.blockPrice > 0 ? `${formatCurrency(results.blockPrice)} per block` : null
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Cement for Mortar (50kg)",
        value: results.cementBags,
        price: results.mortarCementPrice > 0 ? `${formatCurrency(results.mortarCementPrice)} per bag` : null
      }), results.totalCost > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200",
        renderId: "render-2aa92983",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-0e58b716",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-green-900",
            renderId: "render-046ea946",
            as: "span",
            children: "Estimated Total Cost"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-extrabold text-green-700",
            renderId: "render-3342b5f4",
            as: "span",
            children: formatCurrency(results.totalCost)
          })]
        })
      })]
    })
  });
}
function RoofingCalculator({
  getPrice
}) {
  const [inputs, setInputs] = useState({
    span: 12,
    width: 8,
    roofType: "gable",
    sheetLength: 2.4,
    // m
    sheetWidth: 0.9,
    // m
    wastage: 10
  });
  const results = useMemo(() => {
    const baseArea = inputs.span * inputs.width;
    const roofArea = baseArea * (inputs.roofType === "hip" ? 1.25 : 1.15);
    const effectiveSheetArea = (inputs.sheetLength - 0.15) * (inputs.sheetWidth - 0.1);
    const sheets = roundUp(roofArea / effectiveSheetArea * (1 + inputs.wastage / 100));
    const screws = roundUp(sheets * 12);
    const screwPacks = roundUp(screws / 100);
    const sheetPrice = getPrice("Aluminum Roofing Sheet 0.5mm");
    const screwPackPrice = getPrice("Roofing Screws (Pack of 100)");
    const totalCost = sheets * sheetPrice + screwPacks * screwPackPrice;
    return {
      roofArea,
      sheets,
      screws,
      screwPacks,
      totalCost,
      sheetPrice,
      screwPackPrice
    };
  }, [inputs, getPrice]);
  return /* @__PURE__ */ jsx(CalculatorLayout, {
    title: "Roofing Sheets Estimator",
    icon: Home,
    inputs: /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Roofing3DPreview, {
        length: inputs.span,
        width: inputs.width
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        renderId: "render-c022ac2b",
        as: "div",
        children: [/* @__PURE__ */ jsx(InputGroup, {
          label: "Building Length (m)",
          value: inputs.span,
          onChange: (v) => setInputs({
            ...inputs,
            span: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Building Width (m)",
          value: inputs.width,
          onChange: (v) => setInputs({
            ...inputs,
            width: v
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "sm:col-span-2",
          renderId: "render-f77b34e8",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-slate-700 mb-1",
            renderId: "render-86991197",
            as: "label",
            children: "Roof Type"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
            value: inputs.roofType,
            onChange: (e) => setInputs({
              ...inputs,
              roofType: e.target.value
            }),
            renderId: "render-9c689434",
            as: "select",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: "mono",
              renderId: "render-3e2248ae",
              as: "option",
              children: "Mono-pitch (Shed)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: "gable",
              renderId: "render-dba673a1",
              as: "option",
              children: "Gable (Standard V)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: "hip",
              renderId: "render-3b1b95c1",
              as: "option",
              children: "Hip Roof (Complex)"
            })]
          })]
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Sheet Length (m)",
          value: inputs.sheetLength,
          onChange: (v) => setInputs({
            ...inputs,
            sheetLength: v
          })
        }), /* @__PURE__ */ jsx(InputGroup, {
          label: "Wastage (%)",
          value: inputs.wastage,
          onChange: (v) => setInputs({
            ...inputs,
            wastage: v
          })
        })]
      })]
    }),
    results: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-8f10d009",
      as: "div",
      children: [/* @__PURE__ */ jsx(ResultCard, {
        label: "Estimated Roof Area",
        value: `${results.roofArea.toFixed(2)} m²`
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Sheets to Order",
        value: results.sheets,
        highlight: true,
        price: results.sheetPrice > 0 ? `${formatCurrency(results.sheetPrice)} per sheet` : null
      }), /* @__PURE__ */ jsx(ResultCard, {
        label: "Screws Needed",
        value: `${results.screws} (${results.screwPacks} packs)`,
        price: results.screwPackPrice > 0 ? `${formatCurrency(results.screwPackPrice)} per pack` : null
      }), results.totalCost > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200",
        renderId: "render-70962678",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-874fcbfc",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-green-900",
            renderId: "render-6b83c94b",
            as: "span",
            children: "Estimated Total Cost"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-extrabold text-green-700",
            renderId: "render-9db0623c",
            as: "span",
            children: formatCurrency(results.totalCost)
          })]
        })
      })]
    })
  });
}
function CalculatorLayout({
  title,
  icon: Icon,
  inputs,
  results
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden",
    renderId: "render-94da46b2",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "lg:col-span-3 p-6 sm:p-10 space-y-8",
      renderId: "render-803f2d41",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-4",
        renderId: "render-7b1d0c62",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-3 bg-red-50 text-[#E31E24] rounded-2xl",
          renderId: "render-413e2a7a",
          as: "div",
          children: /* @__PURE__ */ jsx(Icon, {
            size: 32,
            strokeWidth: 1.5
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-e093f5c7",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-slate-900",
            renderId: "render-4097958e",
            as: "h2",
            children: title
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-500 text-sm",
            renderId: "render-4147861c",
            as: "p",
            children: "Fill in the dimensions below"
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-slate-50 p-6 rounded-2xl border border-slate-100",
        renderId: "render-16c175fa",
        as: "div",
        children: inputs
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "lg:col-span-2 bg-[#FDFDFD] border-l border-slate-100 p-6 sm:p-10",
      renderId: "render-cb59ab75",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between mb-8",
        renderId: "render-1999f266",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-bold text-slate-900",
          renderId: "render-f69b5dab",
          as: "h3",
          children: "Estimated Totals"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full",
          renderId: "render-d293050b",
          as: "span",
          children: [/* @__PURE__ */ jsx(CheckCircle2, {
            size: 12
          }), " Live Sync"]
        })]
      }), results, /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mt-10 p-5 bg-[#E31E24] rounded-2xl text-white shadow-lg shadow-red-200",
        renderId: "render-ad0424d4",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-2",
          renderId: "render-ccbfcdf9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium opacity-90",
            renderId: "render-c66b9cc0",
            as: "span",
            children: "Ready to buy?"
          }), /* @__PURE__ */ jsx(ShoppingBag, {
            size: 20,
            className: "opacity-80"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs opacity-80 mb-4 leading-relaxed",
          renderId: "render-5d71ad65",
          as: "p",
          children: "Get these materials delivered to your site today from Nigeria's top suppliers."
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "w-full bg-white text-[#E31E24] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors",
          renderId: "render-b571c53c",
          as: "button",
          children: ["Order via Sokogate ", /* @__PURE__ */ jsx(ChevronRight, {
            size: 16
          })]
        })]
      })]
    })]
  });
}
function InputGroup({
  label,
  value,
  onChange,
  subtext
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    renderId: "render-2e2d2444",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "block text-sm font-semibold text-slate-700 mb-1",
      renderId: "render-cf7438cc",
      as: "label",
      children: label
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      type: "number",
      className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
      value,
      onChange: (e) => onChange(Number(e.target.value)),
      renderId: "render-1b46117f",
      as: "input"
    }), subtext && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "mt-1 text-[10px] text-slate-400 font-medium",
      renderId: "render-ca3ada31",
      as: "p",
      children: subtext
    })]
  });
}
function ResultCard({
  label,
  value,
  highlight,
  subtext,
  price
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `p-4 rounded-2xl border transition-all ${highlight ? "bg-white border-[#E31E24] ring-1 ring-[#E31E24]/20 shadow-sm" : "bg-slate-50 border-slate-100"}`,
    renderId: "render-09f144a4",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between",
      renderId: "render-a0c22656",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-sm text-slate-500 font-medium",
        renderId: "render-2a382bb8",
        as: "span",
        children: label
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-lg font-bold ${highlight ? "text-[#E31E24]" : "text-slate-900"}`,
        renderId: "render-20532f1c",
        as: "span",
        children: value
      })]
    }), price && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mt-1 text-[10px] text-green-600 text-right font-semibold flex items-center justify-end gap-1",
      renderId: "render-25f73ff3",
      as: "p",
      children: [/* @__PURE__ */ jsx(DollarSign, {
        size: 10
      }), " ", price]
    }), subtext && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "mt-1 text-[10px] text-slate-400 text-right italic",
      renderId: "render-bd1306ca",
      as: "p",
      children: subtext
    })]
  });
}

const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(CalculatorPage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

const isDev = process.env.NEXT_PUBLIC_CREATE_ENV === "DEVELOPMENT";
const PROVIDER_LABELS = {
  google: "Google",
  facebook: "Facebook",
  twitter: "Twitter / X",
  apple: "Apple"
};
function SocialDevShimPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isDev) {
      navigate("/");
    }
  }, [navigate]);
  if (!isDev) {
    return null;
  }
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const provider = params.get("provider") || "google";
  const callbackUrl = params.get("callbackUrl") || "/";
  const label = PROVIDER_LABELS[provider] || provider;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [missingSecrets, setMissingSecrets] = useState(null);
  useEffect(() => {
    fetch(`/api/__create/check-social-secrets?provider=${encodeURIComponent(provider)}`).then((r) => r.json()).then((data) => setMissingSecrets(data.missing || [])).catch((err) => {
      console.error("Failed to check social secrets:", err);
    });
  }, [provider]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn("dev-social", {
        email,
        name,
        provider,
        callbackUrl
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen flex items-center justify-center font-sans bg-gray-100",
    renderId: "render-96ec0539",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-white rounded-xl p-8 w-full max-w-[400px] shadow-md",
      renderId: "render-4ef882b3",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-amber-50 border border-amber-400 rounded-lg p-3 mb-4 text-[13px] text-amber-800",
        renderId: "render-875a3528",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-cda1036f",
          as: "strong",
          children: "Development Mode"
        }), " — This is a simulated", " ", label, " sign-in. In production, users will see the real", " ", label, " OAuth screen."]
      }), error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-red-50 border border-red-400 rounded-lg p-3 mb-4 text-[13px] text-red-900",
        renderId: "render-d148b602",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-d0c36dd5",
          as: "strong",
          children: "Sign-in error"
        }), " — ", error]
      }), missingSecrets && missingSecrets.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-red-50 border border-red-400 rounded-lg p-3 mb-4 text-[13px] text-red-900",
        renderId: "render-481385dd",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-3c56742a",
          as: "strong",
          children: "Missing secrets"
        }), " — ", label, " sign-in won't work in production until you add these secrets to your project:", " ", missingSecrets.map((s) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-200 px-1 rounded text-[12px]",
          renderId: "render-4e9f27cf",
          as: "code",
          children: s
        }, s))]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mt-0 mb-6 text-xl font-semibold",
        renderId: "render-20b5c62a",
        as: "h2",
        children: ["Sign in with ", label]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: handleSubmit,
        renderId: "render-ad6c97b2",
        as: "form",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "block mb-4",
          renderId: "render-e28c8031",
          as: "label",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium mb-1.5",
            renderId: "render-abf4e487",
            as: "span",
            children: "Email"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "test@example.com",
            className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm",
            renderId: "render-a680dbc5",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "block mb-6",
          renderId: "render-22832576",
          as: "label",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "block text-sm font-medium mb-1.5",
            renderId: "render-4cc10ee6",
            as: "span",
            children: ["Display Name", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-gray-400",
              renderId: "render-81488778",
              as: "span",
              children: "(optional)"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Test User",
            className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm",
            renderId: "render-86ec37f3",
            as: "input"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: loading,
          className: "w-full py-2.5 rounded-lg border-none text-white text-sm font-medium bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-default cursor-pointer",
          renderId: "render-db68d52b",
          as: "button",
          children: loading ? "Signing in..." : `Continue as ${label} user`
        })]
      })]
    })
  });
}

const page$1 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SocialDevShimPage, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "tiles",
    unit: "piece",
    price: "",
    description: ""
  });
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  const handleAdd = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) throw new Error("Failed to add product");
      setNewProduct({
        name: "",
        category: "tiles",
        unit: "piece",
        price: "",
        description: ""
      });
      setShowAddForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
      });
      if (!response.ok) throw new Error("Failed to update");
      setEditingId(null);
      setEditForm({});
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };
  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      unit: product.unit,
      price: product.price,
      description: product.description || ""
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  const categories = ["tiles", "cement", "blocks", "roofing", "adhesive", "sand"];
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-50",
    renderId: "render-a64661e5",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto px-4 py-8",
      renderId: "render-b7ee63bc",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-981fc83d",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-9ae599c2",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-45d05b42",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-3xl font-bold text-slate-900",
              renderId: "render-0fe57248",
              as: "h1",
              children: "Product Price Management"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-500 mt-1",
              renderId: "render-9c413c32",
              as: "p",
              children: "Manage construction material prices for Sokogate calculators"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => setShowAddForm(!showAddForm),
            className: "flex items-center gap-2 bg-[#E31E24] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold",
            renderId: "render-5fa77837",
            as: "button",
            children: [showAddForm ? /* @__PURE__ */ jsx(X, {
              size: 20
            }) : /* @__PURE__ */ jsx(Plus, {
              size: 20
            }), showAddForm ? "Cancel" : "Add Product"]
          })]
        })
      }), showAddForm && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm",
        renderId: "render-ba954061",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-bold text-slate-900 mb-4",
          renderId: "render-c624f19e",
          as: "h3",
          children: "Add New Product"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-5c269a0a",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-40551391",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-semibold text-slate-700 mb-1",
              renderId: "render-4c65ea2b",
              as: "label",
              children: "Product Name"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
              value: newProduct.name,
              onChange: (e) => setNewProduct({
                ...newProduct,
                name: e.target.value
              }),
              placeholder: "e.g., Standard Floor Tile",
              renderId: "render-4d8a16aa",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-4cee640f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-semibold text-slate-700 mb-1",
              renderId: "render-c57daf35",
              as: "label",
              children: "Category"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
              value: newProduct.category,
              onChange: (e) => setNewProduct({
                ...newProduct,
                category: e.target.value
              }),
              renderId: "render-459d7765",
              as: "select",
              children: categories.map((cat) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: cat,
                renderId: "render-cfb4340a",
                as: "option",
                children: cat.charAt(0).toUpperCase() + cat.slice(1)
              }, cat))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-bc540c06",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-semibold text-slate-700 mb-1",
              renderId: "render-a4782685",
              as: "label",
              children: "Unit"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
              value: newProduct.unit,
              onChange: (e) => setNewProduct({
                ...newProduct,
                unit: e.target.value
              }),
              placeholder: "e.g., piece, bag, box, m3",
              renderId: "render-e28ec702",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-e3793ff8",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-semibold text-slate-700 mb-1",
              renderId: "render-af22eeed",
              as: "label",
              children: "Price (₦)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "number",
              step: "0.01",
              className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
              value: newProduct.price,
              onChange: (e) => setNewProduct({
                ...newProduct,
                price: e.target.value
              }),
              placeholder: "0.00",
              renderId: "render-7b75d6cc",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-7f9560ba",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-semibold text-slate-700 mb-1",
              renderId: "render-121a9fb2",
              as: "label",
              children: "Description (optional)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              className: "w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]",
              value: newProduct.description,
              onChange: (e) => setNewProduct({
                ...newProduct,
                description: e.target.value
              }),
              placeholder: "e.g., Standard ceramic floor tile 30x30cm",
              renderId: "render-2219b53e",
              as: "input"
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex justify-end gap-3 mt-6",
          renderId: "render-39078c62",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => setShowAddForm(false),
            className: "px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold",
            renderId: "render-875d1b65",
            as: "button",
            children: "Cancel"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: handleAdd,
            className: "flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold",
            renderId: "render-2454372b",
            as: "button",
            children: [/* @__PURE__ */ jsx(Save, {
              size: 16
            }), "Add Product"]
          })]
        })]
      }), loading ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-center py-12",
        renderId: "render-efa8d1e5",
        as: "div",
        children: [/* @__PURE__ */ jsx(RefreshCcw, {
          className: "animate-spin mx-auto mb-4 text-[#E31E24]",
          size: 32
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-slate-500",
          renderId: "render-c6e2d081",
          as: "p",
          children: "Loading products..."
        })]
      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-6",
        renderId: "render-db0430bb",
        as: "div",
        children: categories.map((category) => {
          const categoryProducts = groupedProducts[category] || [];
          if (categoryProducts.length === 0) return null;
          return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm",
            renderId: "render-74c56287",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "bg-slate-50 px-6 py-3 border-b border-slate-200",
              renderId: "render-282c48f9",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-bold text-slate-900 uppercase text-sm tracking-wide",
                renderId: "render-cc5d0074",
                as: "h3",
                children: category
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "divide-y divide-slate-100",
              renderId: "render-19d65a3e",
              as: "div",
              children: categoryProducts.map((product) => {
                const isEditing = editingId === product.id;
                return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "p-6 hover:bg-slate-50 transition-colors",
                  renderId: "render-6a2194dc",
                  as: "div",
                  children: isEditing ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "space-y-4",
                    renderId: "render-89d4d044",
                    as: "div",
                    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                      renderId: "render-6a380d15",
                      as: "div",
                      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        renderId: "render-8ab6652c",
                        as: "div",
                        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          className: "block text-xs font-semibold text-slate-600 mb-1",
                          renderId: "render-0d969ae2",
                          as: "label",
                          children: "Name"
                        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          type: "text",
                          className: "w-full rounded-lg border-slate-200 text-sm",
                          value: editForm.name,
                          onChange: (e) => setEditForm({
                            ...editForm,
                            name: e.target.value
                          }),
                          renderId: "render-f1dec059",
                          as: "input"
                        })]
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        renderId: "render-9d64e289",
                        as: "div",
                        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          className: "block text-xs font-semibold text-slate-600 mb-1",
                          renderId: "render-b2998657",
                          as: "label",
                          children: "Unit"
                        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          type: "text",
                          className: "w-full rounded-lg border-slate-200 text-sm",
                          value: editForm.unit,
                          onChange: (e) => setEditForm({
                            ...editForm,
                            unit: e.target.value
                          }),
                          renderId: "render-e23b71ee",
                          as: "input"
                        })]
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        renderId: "render-f214af49",
                        as: "div",
                        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          className: "block text-xs font-semibold text-slate-600 mb-1",
                          renderId: "render-148ab12c",
                          as: "label",
                          children: "Price (₦)"
                        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          type: "number",
                          step: "0.01",
                          className: "w-full rounded-lg border-slate-200 text-sm",
                          value: editForm.price,
                          onChange: (e) => setEditForm({
                            ...editForm,
                            price: e.target.value
                          }),
                          renderId: "render-16b1b4a2",
                          as: "input"
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "flex justify-end gap-2",
                      renderId: "render-7ac0ae44",
                      as: "div",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        onClick: cancelEdit,
                        className: "px-3 py-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold",
                        renderId: "render-28ed3850",
                        as: "button",
                        children: "Cancel"
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        onClick: () => handleUpdate(product.id),
                        className: "flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm font-semibold",
                        renderId: "render-0fa602ae",
                        as: "button",
                        children: [/* @__PURE__ */ jsx(Save, {
                          size: 14
                        }), "Save"]
                      })]
                    })]
                  }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "flex items-center justify-between",
                    renderId: "render-b779725e",
                    as: "div",
                    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "flex-1",
                      renderId: "render-92bc7cda",
                      as: "div",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "font-bold text-slate-900",
                        renderId: "render-0a6eaad3",
                        as: "h4",
                        children: product.name
                      }), product.description && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "text-sm text-slate-500 mt-1",
                        renderId: "render-7a0c5344",
                        as: "p",
                        children: product.description
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        className: "flex items-center gap-4 mt-2",
                        renderId: "render-caeddd53",
                        as: "div",
                        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          className: "text-xs font-semibold text-slate-500 uppercase",
                          renderId: "render-c07d06a6",
                          as: "span",
                          children: product.unit
                        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                          className: "text-xl font-bold text-[#E31E24]",
                          renderId: "render-2d6232d2",
                          as: "span",
                          children: ["₦", Number(product.price).toLocaleString("en-NG", {
                            minimumFractionDigits: 2
                          })]
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "flex gap-2",
                      renderId: "render-d8f56b5e",
                      as: "div",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        onClick: () => startEdit(product),
                        className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                        title: "Edit",
                        renderId: "render-7ae44f9e",
                        as: "button",
                        children: /* @__PURE__ */ jsx(Edit2, {
                          size: 18
                        })
                      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        onClick: () => handleDelete(product.id),
                        className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                        title: "Delete",
                        renderId: "render-e2cfd181",
                        as: "button",
                        children: /* @__PURE__ */ jsx(Trash2, {
                          size: 18
                        })
                      })]
                    })]
                  })
                }, product.id);
              })
            })]
          }, category);
        })
      }), products.length === 0 && !loading && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-center py-12 bg-white rounded-xl border border-slate-200",
        renderId: "render-ec22480b",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-slate-500",
          renderId: "render-20fb2e78",
          as: "p",
          children: "No products yet. Add your first product above."
        })
      })]
    })
  });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ProductsAdminPage, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-5d3dedd4",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-52336eae",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-e1005118",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-7d7b9718",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-8a7f825e",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-196124eb",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-86a705e5",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-2f9e00c6",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-918fd507",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-08ebcb98",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-5dccce98",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-53ac453d",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-85c4045d",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-ede8061c",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-46c9344f",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-5ad9f510",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-e29d7c41",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-dc5680fb",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-a42858f7",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-93f67d03",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-2382b2a1",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-d067deae",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-0b8d4ea7",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-964c9a9c",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-ceb5746a",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-d9c63895",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-03d1dfe4",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-aaa6175f",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-1edb3009",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-13fa6455",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-b756cf5f",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-45694365",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-05bcbfd9",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-d2019b95",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-5774b1c7",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-b94fb2f7",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-DVq_muML.js','imports':['/assets/chunk-OE4NN4TA-CjDq5ZTd.js','/assets/index-ByLzXaoV.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/root-DbK3dEdg.js','imports':['/assets/chunk-OE4NN4TA-CjDq5ZTd.js','/assets/index-ByLzXaoV.js','/assets/PolymorphicComponent-D0VE-53G.js','/assets/react-D3IynbJC.js'],'css':['/assets/root-BpZI6xuh.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DSkz_YcF.js','imports':['/assets/PolymorphicComponent-D0VE-53G.js','/assets/chunk-OE4NN4TA-CjDq5ZTd.js','/assets/layout-DaeHGVx8.js','/assets/refresh-ccw-Ceuulfcv.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/social-dev-shim/page':{'id':'__create/social-dev-shim/page','parentId':'root','path':'__create/social-dev-shim','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BNT4pNus.js','imports':['/assets/PolymorphicComponent-D0VE-53G.js','/assets/chunk-OE4NN4TA-CjDq5ZTd.js','/assets/layout-DaeHGVx8.js','/assets/react-D3IynbJC.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/products/page':{'id':'admin/products/page','parentId':'root','path':'admin/products','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BZo3RNo8.js','imports':['/assets/PolymorphicComponent-D0VE-53G.js','/assets/chunk-OE4NN4TA-CjDq5ZTd.js','/assets/layout-DaeHGVx8.js','/assets/refresh-ccw-Ceuulfcv.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/not-found-Dry2GZIe.js','imports':['/assets/PolymorphicComponent-D0VE-53G.js','/assets/chunk-OE4NN4TA-CjDq5ZTd.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-56c828cb.js','version':'56c828cb','sri':undefined};

const assetsBuildDirectory = "build/client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"unstable_passThroughRequests":false,"unstable_subResourceIntegrity":false,"unstable_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "__create/social-dev-shim/page": {
          id: "__create/social-dev-shim/page",
          parentId: "root",
          path: "__create/social-dev-shim",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "admin/products/page": {
          id: "admin/products/page",
          parentId: "root",
          path: "admin/products",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
