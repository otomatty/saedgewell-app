import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

var THEMES = { light: "", dark: ".dark" };
var ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
var ChartContainer = (_a) => {
  var _b = _a, { id, className, children, config } = _b, props = __objRest(_b, ["id", "className", "children", "config"]);
  const uniqueId = React.useId();
  const chartId = `chart-${id != null ? id : uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ React.createElement(ChartContext.Provider, { value: { config } }, /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(ChartStyle, { id: chartId, config }),
    /* @__PURE__ */ React.createElement(RechartsPrimitive.ResponsiveContainer, null, children)
  ));
};
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
  const colorConfig = React.useMemo(
    () => Object.entries(config).map(([key, value]) => [
      key,
      "color" in value ? { color: value.color } : { theme: value.theme }
    ]),
    [config]
  );
  if (!colorConfig.length) {
    return null;
  }
  const styleContent = Object.entries(THEMES).map(
    ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, config2]) => {
      if (!config2 || typeof config2 !== "object") return null;
      const color = "theme" in config2 && config2.theme ? config2.theme[theme] : "color" in config2 ? config2.color : void 0;
      return color ? `  --color-${key}: ${color};` : null;
    }).filter(Boolean).join("\n")}
}
`
  ).join("\n");
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styleContent;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [styleContent]);
  return null;
};
var ChartTooltip = RechartsPrimitive.Tooltip;
var ChartTooltipContent = ({
  ref,
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) => {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    var _a, _b, _c, _d;
    if (hideLabel != null ? hideLabel : !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${(_b = (_a = labelKey != null ? labelKey : item == null ? void 0 : item.dataKey) != null ? _a : item == null ? void 0 : item.name) != null ? _b : "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? (_d = (_c = config[label]) == null ? void 0 : _c.label) != null ? _d : label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ React.createElement("div", { className: cn("font-medium", labelClassName) }, labelFormatter(value, payload));
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", { className: cn("font-medium", labelClassName) }, value);
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )
    },
    !nestLabel ? tooltipLabel : null,
    /* @__PURE__ */ React.createElement("div", { className: "grid gap-1.5" }, payload.map((item, index) => {
      var _a, _b, _c, _d;
      const key = `${(_b = (_a = nameKey != null ? nameKey : item.name) != null ? _a : item.dataKey) != null ? _b : "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const indicatorColor = (_c = color != null ? color : item.payload.fill) != null ? _c : item.color;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: item.dataKey,
          className: cn(
            "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
            indicator === "dot" && "items-center"
          )
        },
        formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ React.createElement(React.Fragment, null, (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ React.createElement(itemConfig.icon, null) : !hideIndicator && /* @__PURE__ */ React.createElement(
          "div",
          {
            className: cn(
              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
              {
                "h-2.5 w-2.5": indicator === "dot",
                "w-1": indicator === "line",
                "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                "my-0.5": nestLabel && indicator === "dashed"
              }
            ),
            style: {
              "--color-bg": indicatorColor,
              "--color-border": indicatorColor
            }
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: cn(
              "flex flex-1 justify-between leading-none",
              nestLabel ? "items-end" : "items-center"
            )
          },
          /* @__PURE__ */ React.createElement("div", { className: "grid gap-1.5" }, nestLabel ? tooltipLabel : null, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, (_d = itemConfig == null ? void 0 : itemConfig.label) != null ? _d : item.name)),
          item.value && /* @__PURE__ */ React.createElement("span", { className: "text-foreground font-mono font-medium tabular-nums" }, item.value.toLocaleString())
        ))
      );
    }))
  );
};
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegend = RechartsPrimitive.Legend;
var ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  ref
}) => {
  const { config } = useChart();
  if (!(payload == null ? void 0 : payload.length)) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )
    },
    payload.map((item) => {
      var _a;
      const key = `${(_a = nameKey != null ? nameKey : item.dataKey) != null ? _a : "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: item.value,
          className: cn(
            "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          )
        },
        (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ React.createElement(itemConfig.icon, null) : /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "h-2 w-2 shrink-0 rounded-[2px]",
            style: {
              backgroundColor: item.color
            }
          }
        ),
        itemConfig == null ? void 0 : itemConfig.label
      );
    })
  );
};
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || !payload) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent };
//# sourceMappingURL=chart.mjs.map
//# sourceMappingURL=chart.mjs.map