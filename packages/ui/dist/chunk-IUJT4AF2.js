'use strict';

var chunkXKMXOZKR_js = require('./chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');

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

var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);

var DropdownMenu = DropdownMenuPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive__namespace.Group;
var DropdownMenuPortal = DropdownMenuPrimitive__namespace.Portal;
var DropdownMenuSub = DropdownMenuPrimitive__namespace.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive__namespace.RadioGroup;
var DropdownMenuSubTrigger = (_a) => {
  var _b = _a, { className, inset, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "inset", "children"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.SubTrigger,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none",
        inset && "pl-8",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.ChevronRightIcon, { className: "ml-auto h-4 w-4" })
  );
};
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive__namespace.SubTrigger.displayName;
var DropdownMenuSubContent = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.SubContent,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )
    }, props)
  );
};
DropdownMenuSubContent.displayName = DropdownMenuPrimitive__namespace.SubContent.displayName;
var DropdownMenuContent = (_a) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ React.createElement(DropdownMenuPrimitive__namespace.Portal, null, /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      sideOffset,
      className: chunkXE52ECJH_js.cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ));
};
DropdownMenuContent.displayName = DropdownMenuPrimitive__namespace.Content.displayName;
var DropdownMenuItem = (_a) => {
  var _b = _a, { className, inset } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.Item,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        inset && "pl-8",
        className
      )
    }, props)
  );
};
DropdownMenuItem.displayName = DropdownMenuPrimitive__namespace.Item.displayName;
var DropdownMenuCheckboxItem = (_a) => {
  var _b = _a, { className, children, checked } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children", "checked"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.CheckboxItem,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      ),
      checked
    }, props),
    /* @__PURE__ */ React.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React.createElement(DropdownMenuPrimitive__namespace.ItemIndicator, null, /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.CheckIcon, { className: "h-4 w-4" }))),
    children
  );
};
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive__namespace.CheckboxItem.displayName;
var DropdownMenuRadioItem = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.RadioItem,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React.createElement(DropdownMenuPrimitive__namespace.ItemIndicator, null, /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.DotFilledIcon, { className: "h-4 w-4 fill-current" }))),
    children
  );
};
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive__namespace.RadioItem.displayName;
var DropdownMenuLabel = (_a) => {
  var _b = _a, { className, inset } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.Label,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )
    }, props)
  );
};
DropdownMenuLabel.displayName = DropdownMenuPrimitive__namespace.Label.displayName;
var DropdownMenuSeparator = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    DropdownMenuPrimitive__namespace.Separator,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("bg-muted -mx-1 my-1 h-px", className)
    }, props)
  );
};
DropdownMenuSeparator.displayName = DropdownMenuPrimitive__namespace.Separator.displayName;
var DropdownMenuShortcut = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("ml-auto text-xs tracking-widest opacity-60", className)
    }, props)
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
//# sourceMappingURL=chunk-IUJT4AF2.js.map
//# sourceMappingURL=chunk-IUJT4AF2.js.map