'use strict';

var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var React6 = require('react');
require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React6__namespace = /*#__PURE__*/_interopNamespace(React6);

// ../../node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// ../../node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItems.includes(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (process.env.NODE_ENV !== "production") {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}

// ../../node_modules/@tanstack/query-core/build/modern/focusManager.js
var _focused, _cleanup, _setup, _a;
var FocusManager = (_a = class extends Subscribable {
  constructor() {
    super();
    chunkGNZACLC7_js.__privateAdd(this, _focused);
    chunkGNZACLC7_js.__privateAdd(this, _cleanup);
    chunkGNZACLC7_js.__privateAdd(this, _setup);
    chunkGNZACLC7_js.__privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!chunkGNZACLC7_js.__privateGet(this, _cleanup)) {
      this.setEventListener(chunkGNZACLC7_js.__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a4;
    if (!this.hasListeners()) {
      (_a4 = chunkGNZACLC7_js.__privateGet(this, _cleanup)) == null ? void 0 : _a4.call(this);
      chunkGNZACLC7_js.__privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a4;
    chunkGNZACLC7_js.__privateSet(this, _setup, setup);
    (_a4 = chunkGNZACLC7_js.__privateGet(this, _cleanup)) == null ? void 0 : _a4.call(this);
    chunkGNZACLC7_js.__privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = chunkGNZACLC7_js.__privateGet(this, _focused) !== focused;
    if (changed) {
      chunkGNZACLC7_js.__privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    var _a4;
    if (typeof chunkGNZACLC7_js.__privateGet(this, _focused) === "boolean") {
      return chunkGNZACLC7_js.__privateGet(this, _focused);
    }
    return ((_a4 = globalThis.document) == null ? void 0 : _a4.visibilityState) !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a);
var focusManager = new FocusManager();

// ../../node_modules/@tanstack/query-core/build/modern/onlineManager.js
var _online, _cleanup2, _setup2, _a2;
var OnlineManager = (_a2 = class extends Subscribable {
  constructor() {
    super();
    chunkGNZACLC7_js.__privateAdd(this, _online, true);
    chunkGNZACLC7_js.__privateAdd(this, _cleanup2);
    chunkGNZACLC7_js.__privateAdd(this, _setup2);
    chunkGNZACLC7_js.__privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!chunkGNZACLC7_js.__privateGet(this, _cleanup2)) {
      this.setEventListener(chunkGNZACLC7_js.__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a4;
    if (!this.hasListeners()) {
      (_a4 = chunkGNZACLC7_js.__privateGet(this, _cleanup2)) == null ? void 0 : _a4.call(this);
      chunkGNZACLC7_js.__privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a4;
    chunkGNZACLC7_js.__privateSet(this, _setup2, setup);
    (_a4 = chunkGNZACLC7_js.__privateGet(this, _cleanup2)) == null ? void 0 : _a4.call(this);
    chunkGNZACLC7_js.__privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = chunkGNZACLC7_js.__privateGet(this, _online) !== online;
    if (changed) {
      chunkGNZACLC7_js.__privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return chunkGNZACLC7_js.__privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _a2);
var onlineManager = new OnlineManager();

// ../../node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

// ../../node_modules/@tanstack/query-core/build/modern/retryer.js
function canFetch(networkMode) {
  return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}

// ../../node_modules/@tanstack/query-core/build/modern/notifyManager.js
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// ../../node_modules/@tanstack/query-core/build/modern/query.js
function fetchState(data, options) {
  return chunkGNZACLC7_js.__spreadValues({
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused"
  }, data === void 0 && {
    error: null,
    status: "pending"
  });
}

// ../../node_modules/@tanstack/query-core/build/modern/mutation.js
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// ../../node_modules/@tanstack/query-core/build/modern/queryObserver.js
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _b;
var QueryObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    chunkGNZACLC7_js.__privateAdd(this, _QueryObserver_instances);
    chunkGNZACLC7_js.__privateAdd(this, _client);
    chunkGNZACLC7_js.__privateAdd(this, _currentQuery);
    chunkGNZACLC7_js.__privateAdd(this, _currentQueryInitialState);
    chunkGNZACLC7_js.__privateAdd(this, _currentResult);
    chunkGNZACLC7_js.__privateAdd(this, _currentResultState);
    chunkGNZACLC7_js.__privateAdd(this, _currentResultOptions);
    chunkGNZACLC7_js.__privateAdd(this, _currentThenable);
    chunkGNZACLC7_js.__privateAdd(this, _selectError);
    chunkGNZACLC7_js.__privateAdd(this, _selectFn);
    chunkGNZACLC7_js.__privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    chunkGNZACLC7_js.__privateAdd(this, _lastQueryWithDefinedData);
    chunkGNZACLC7_js.__privateAdd(this, _staleTimeoutId);
    chunkGNZACLC7_js.__privateAdd(this, _refetchIntervalId);
    chunkGNZACLC7_js.__privateAdd(this, _currentRefetchInterval);
    chunkGNZACLC7_js.__privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    chunkGNZACLC7_js.__privateSet(this, _client, client);
    chunkGNZACLC7_js.__privateSet(this, _selectError, null);
    chunkGNZACLC7_js.__privateSet(this, _currentThenable, pendingThenable());
    if (!this.options.experimental_prefetchInRender) {
      chunkGNZACLC7_js.__privateGet(this, _currentThenable).reject(
        new Error("experimental_prefetchInRender feature flag is not enabled")
      );
    }
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      chunkGNZACLC7_js.__privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(chunkGNZACLC7_js.__privateGet(this, _currentQuery), this.options)) {
        chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      chunkGNZACLC7_js.__privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      chunkGNZACLC7_js.__privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    chunkGNZACLC7_js.__privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = chunkGNZACLC7_js.__privateGet(this, _currentQuery);
    this.options = chunkGNZACLC7_js.__privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    chunkGNZACLC7_js.__privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      chunkGNZACLC7_js.__privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: chunkGNZACLC7_js.__privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      chunkGNZACLC7_js.__privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult(notifyOptions);
    if (mounted && (chunkGNZACLC7_js.__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, chunkGNZACLC7_js.__privateGet(this, _currentQuery)))) {
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (chunkGNZACLC7_js.__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) || nextRefetchInterval !== chunkGNZACLC7_js.__privateGet(this, _currentRefetchInterval))) {
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = chunkGNZACLC7_js.__privateGet(this, _client).getQueryCache().build(chunkGNZACLC7_js.__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      chunkGNZACLC7_js.__privateSet(this, _currentResult, result);
      chunkGNZACLC7_js.__privateSet(this, _currentResultOptions, this.options);
      chunkGNZACLC7_js.__privateSet(this, _currentResultState, chunkGNZACLC7_js.__privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return chunkGNZACLC7_js.__privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    const trackedResult = {};
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          this.trackProp(key);
          onPropTracked == null ? void 0 : onPropTracked(key);
          return result[key];
        }
      });
    });
    return trackedResult;
  }
  trackProp(key) {
    chunkGNZACLC7_js.__privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return chunkGNZACLC7_js.__privateGet(this, _currentQuery);
  }
  refetch(_a4 = {}) {
    var options = chunkGNZACLC7_js.__objRest(_a4, []);
    return this.fetch(chunkGNZACLC7_js.__spreadValues({}, options));
  }
  fetchOptimistic(options) {
    const defaultedOptions = chunkGNZACLC7_js.__privateGet(this, _client).defaultQueryOptions(options);
    const query = chunkGNZACLC7_js.__privateGet(this, _client).getQueryCache().build(chunkGNZACLC7_js.__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    var _a4;
    return chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, fetchOptions), {
      cancelRefetch: (_a4 = fetchOptions.cancelRefetch) != null ? _a4 : true
    })).then(() => {
      this.updateResult();
      return chunkGNZACLC7_js.__privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a4;
    const prevQuery = chunkGNZACLC7_js.__privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = chunkGNZACLC7_js.__privateGet(this, _currentResult);
    const prevResultState = chunkGNZACLC7_js.__privateGet(this, _currentResultState);
    const prevResultOptions = chunkGNZACLC7_js.__privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : chunkGNZACLC7_js.__privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = chunkGNZACLC7_js.__spreadValues({}, state);
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = chunkGNZACLC7_js.__spreadValues(chunkGNZACLC7_js.__spreadValues({}, newState), fetchState(state.data, query.options));
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    if (options.select && newState.data !== void 0) {
      if (prevResult && newState.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === chunkGNZACLC7_js.__privateGet(this, _selectFn)) {
        data = chunkGNZACLC7_js.__privateGet(this, _selectResult);
      } else {
        try {
          chunkGNZACLC7_js.__privateSet(this, _selectFn, options.select);
          data = options.select(newState.data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          chunkGNZACLC7_js.__privateSet(this, _selectResult, data);
          chunkGNZACLC7_js.__privateSet(this, _selectError, null);
        } catch (selectError) {
          chunkGNZACLC7_js.__privateSet(this, _selectError, selectError);
        }
      }
    } else {
      data = newState.data;
    }
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a4 = chunkGNZACLC7_js.__privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a4.state.data,
          chunkGNZACLC7_js.__privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
        if (options.select && placeholderData !== void 0) {
          try {
            placeholderData = options.select(placeholderData);
            chunkGNZACLC7_js.__privateSet(this, _selectError, null);
          } catch (selectError) {
            chunkGNZACLC7_js.__privateSet(this, _selectError, selectError);
          }
        }
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (chunkGNZACLC7_js.__privateGet(this, _selectError)) {
      error = chunkGNZACLC7_js.__privateGet(this, _selectError);
      data = chunkGNZACLC7_js.__privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: chunkGNZACLC7_js.__privateGet(this, _currentThenable)
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (thenable) => {
        if (nextResult.status === "error") {
          thenable.reject(nextResult.error);
        } else if (nextResult.data !== void 0) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = chunkGNZACLC7_js.__privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = chunkGNZACLC7_js.__privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult(notifyOptions) {
    const prevResult = chunkGNZACLC7_js.__privateGet(this, _currentResult);
    const nextResult = this.createResult(chunkGNZACLC7_js.__privateGet(this, _currentQuery), this.options);
    chunkGNZACLC7_js.__privateSet(this, _currentResultState, chunkGNZACLC7_js.__privateGet(this, _currentQuery).state);
    chunkGNZACLC7_js.__privateSet(this, _currentResultOptions, this.options);
    if (chunkGNZACLC7_js.__privateGet(this, _currentResultState).data !== void 0) {
      chunkGNZACLC7_js.__privateSet(this, _lastQueryWithDefinedData, chunkGNZACLC7_js.__privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    chunkGNZACLC7_js.__privateSet(this, _currentResult, nextResult);
    const defaultNotifyOptions = {};
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !chunkGNZACLC7_js.__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue != null ? notifyOnChangePropsValue : chunkGNZACLC7_js.__privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(chunkGNZACLC7_js.__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = chunkGNZACLC7_js.__privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && shouldNotifyListeners()) {
      defaultNotifyOptions.listeners = true;
    }
    chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, notify_fn).call(this, chunkGNZACLC7_js.__spreadValues(chunkGNZACLC7_js.__spreadValues({}, defaultNotifyOptions), notifyOptions));
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = chunkGNZACLC7_js.__privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    chunkGNZACLC7_js.__privateGet(this, _currentQuery)
  );
  if (isServer || chunkGNZACLC7_js.__privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(chunkGNZACLC7_js.__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  chunkGNZACLC7_js.__privateSet(this, _staleTimeoutId, setTimeout(() => {
    if (!chunkGNZACLC7_js.__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  var _a4;
  return (_a4 = typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(chunkGNZACLC7_js.__privateGet(this, _currentQuery)) : this.options.refetchInterval) != null ? _a4 : false;
}, updateRefetchInterval_fn = function(nextInterval) {
  chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  chunkGNZACLC7_js.__privateSet(this, _currentRefetchInterval, nextInterval);
  if (isServer || resolveEnabled(this.options.enabled, chunkGNZACLC7_js.__privateGet(this, _currentQuery)) === false || !isValidTimeout(chunkGNZACLC7_js.__privateGet(this, _currentRefetchInterval)) || chunkGNZACLC7_js.__privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  chunkGNZACLC7_js.__privateSet(this, _refetchIntervalId, setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, chunkGNZACLC7_js.__privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, chunkGNZACLC7_js.__privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (chunkGNZACLC7_js.__privateGet(this, _staleTimeoutId)) {
    clearTimeout(chunkGNZACLC7_js.__privateGet(this, _staleTimeoutId));
    chunkGNZACLC7_js.__privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (chunkGNZACLC7_js.__privateGet(this, _refetchIntervalId)) {
    clearInterval(chunkGNZACLC7_js.__privateGet(this, _refetchIntervalId));
    chunkGNZACLC7_js.__privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = chunkGNZACLC7_js.__privateGet(this, _client).getQueryCache().build(chunkGNZACLC7_js.__privateGet(this, _client), this.options);
  if (query === chunkGNZACLC7_js.__privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = chunkGNZACLC7_js.__privateGet(this, _currentQuery);
  chunkGNZACLC7_js.__privateSet(this, _currentQuery, query);
  chunkGNZACLC7_js.__privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(chunkGNZACLC7_js.__privateGet(this, _currentResult));
      });
    }
    chunkGNZACLC7_js.__privateGet(this, _client).getQueryCache().notify({
      query: chunkGNZACLC7_js.__privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _b);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false) {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

// ../../node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _a3;
var MutationObserver = (_a3 = class extends Subscribable {
  constructor(client, options) {
    super();
    chunkGNZACLC7_js.__privateAdd(this, _MutationObserver_instances);
    chunkGNZACLC7_js.__privateAdd(this, _client2);
    chunkGNZACLC7_js.__privateAdd(this, _currentResult2);
    chunkGNZACLC7_js.__privateAdd(this, _currentMutation);
    chunkGNZACLC7_js.__privateAdd(this, _mutateOptions);
    chunkGNZACLC7_js.__privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    chunkGNZACLC7_js.__privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a4;
    const prevOptions = this.options;
    this.options = chunkGNZACLC7_js.__privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      chunkGNZACLC7_js.__privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: chunkGNZACLC7_js.__privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a4 = chunkGNZACLC7_js.__privateGet(this, _currentMutation)) == null ? void 0 : _a4.state.status) === "pending") {
      chunkGNZACLC7_js.__privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a4;
    if (!this.hasListeners()) {
      (_a4 = chunkGNZACLC7_js.__privateGet(this, _currentMutation)) == null ? void 0 : _a4.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    chunkGNZACLC7_js.__privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    chunkGNZACLC7_js.__privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return chunkGNZACLC7_js.__privateGet(this, _currentResult2);
  }
  reset() {
    var _a4;
    (_a4 = chunkGNZACLC7_js.__privateGet(this, _currentMutation)) == null ? void 0 : _a4.removeObserver(this);
    chunkGNZACLC7_js.__privateSet(this, _currentMutation, void 0);
    chunkGNZACLC7_js.__privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    chunkGNZACLC7_js.__privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a4;
    chunkGNZACLC7_js.__privateSet(this, _mutateOptions, options);
    (_a4 = chunkGNZACLC7_js.__privateGet(this, _currentMutation)) == null ? void 0 : _a4.removeObserver(this);
    chunkGNZACLC7_js.__privateSet(this, _currentMutation, chunkGNZACLC7_js.__privateGet(this, _client2).getMutationCache().build(chunkGNZACLC7_js.__privateGet(this, _client2), this.options));
    chunkGNZACLC7_js.__privateGet(this, _currentMutation).addObserver(this);
    return chunkGNZACLC7_js.__privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a4, _b2;
  const state = (_b2 = (_a4 = chunkGNZACLC7_js.__privateGet(this, _currentMutation)) == null ? void 0 : _a4.state) != null ? _b2 : getDefaultState();
  chunkGNZACLC7_js.__privateSet(this, _currentResult2, chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, state), {
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  }));
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a4, _b2, _c, _d, _e, _f, _g, _h;
    if (chunkGNZACLC7_js.__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = chunkGNZACLC7_js.__privateGet(this, _currentResult2).variables;
      const context = chunkGNZACLC7_js.__privateGet(this, _currentResult2).context;
      if ((action == null ? void 0 : action.type) === "success") {
        (_b2 = (_a4 = chunkGNZACLC7_js.__privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(_a4, action.data, variables, context);
        (_d = (_c = chunkGNZACLC7_js.__privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(_c, action.data, null, variables, context);
      } else if ((action == null ? void 0 : action.type) === "error") {
        (_f = (_e = chunkGNZACLC7_js.__privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(_e, action.error, variables, context);
        (_h = (_g = chunkGNZACLC7_js.__privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
          _g,
          void 0,
          action.error,
          variables,
          context
        );
      }
    }
    this.listeners.forEach((listener) => {
      listener(chunkGNZACLC7_js.__privateGet(this, _currentResult2));
    });
  });
}, _a3);
var QueryClientContext = React6__namespace.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = React6__namespace.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = React6__namespace.createContext(createValue());
var useQueryErrorResetBoundary = () => React6__namespace.useContext(QueryErrorResetBoundaryContext);

// ../../node_modules/@tanstack/react-query/build/modern/utils.js
function shouldThrowError(throwError, params) {
  if (typeof throwError === "function") {
    return throwError(...params);
  }
  return !!throwError;
}
function noop2() {
}

// ../../node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
  if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  React6__namespace.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && shouldThrowError(throwOnError, [result.error, query]);
};
var IsRestoringContext = React6__namespace.createContext(false);
var useIsRestoring = () => React6__namespace.useContext(IsRestoringContext);
IsRestoringContext.Provider;

// ../../node_modules/@tanstack/react-query/build/modern/suspense.js
var ensureSuspenseTimers = (defaultedOptions) => {
  const originalStaleTime = defaultedOptions.staleTime;
  if (defaultedOptions.suspense) {
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => Math.max(originalStaleTime(...args), 1e3) : Math.max(originalStaleTime != null ? originalStaleTime : 1e3, 1e3);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});

// ../../node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function useBaseQuery(options, Observer, queryClient) {
  var _a4, _b2, _c, _d, _e;
  if (process.env.NODE_ENV !== "production") {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const client = useQueryClient(queryClient);
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a4 = client.getDefaultOptions().queries) == null ? void 0 : _a4._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a4,
    defaultedOptions
  );
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = React6__namespace.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  React6__namespace.useSyncExternalStore(
    React6__namespace.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop2;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React6__namespace.useEffect(() => {
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query: client.getQueryCache().get(defaultedOptions.queryHash)
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (_e = client.getQueryCache().get(defaultedOptions.queryHash)) == null ? void 0 : _e.promise
    );
    promise == null ? void 0 : promise.catch(noop2).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

// ../../node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}
function useMutation(options, queryClient) {
  const client = useQueryClient(queryClient);
  const [observer] = React6__namespace.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  React6__namespace.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = React6__namespace.useSyncExternalStore(
    React6__namespace.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = React6__namespace.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop2);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, result), { mutate, mutateAsync: result.mutate });
}

exports.useMutation = useMutation;
exports.useQuery = useQuery;
//# sourceMappingURL=chunk-VRBYCNKS.js.map
//# sourceMappingURL=chunk-VRBYCNKS.js.map