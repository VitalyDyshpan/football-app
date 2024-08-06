import type { PrimeVuePTOptions } from "primevue/config";
import type { InputTextPassThroughMethodOptions } from "primevue/inputtext";
import type { StepperPanelPassThroughMethodOptions } from "primevue/stepperpanel";
import type { InputGroupPassThroughOptions } from "primevue/inputgroup";
import type { InputGroupAddonPassThroughOptions } from "primevue/inputgroupaddon";
import type { StepperPassThroughOptions } from "primevue/stepper";

interface PresetPTOptions extends PrimeVuePTOptions {
  inputgroup: InputGroupPassThroughOptions;
  inputgroupaddon: InputGroupAddonPassThroughOptions;
  stepper: StepperPassThroughOptions;
}

const myPreset: PresetPTOptions = {
  button: {
    root(options) {
      return {
        class: [
          "rounded border border-solid transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
          [
            !options.props.text
              ? [
                  {
                    "w-full": !options.props.size,
                  },
                  {
                    "px-[24px] py-[15px] w-full":
                      options.props.size === "large",
                  },
                  {
                    "px-[16px] py-[7px] w-full": options.props.size === "small",
                  },
                ]
              : "p-0 w-fit",
          ],
          {
            "bg-primary":
              !options.props.outlined &&
              !options.props.severity &&
              !options.props.text,
          },
          {
            "border-primary": !options.props.severity && !options.props.text,
          },
          {
            "border-error":
              options.props.severity === "danger" && !options.props.text,
          },
          {
            "bg-error":
              options.props.severity === "danger" &&
              !options.props.outlined &&
              !options.props.text,
          },
          {
            "border-secondary":
              options.props.severity === "info" && !options.props.text,
          },
          {
            "bg-secondary":
              options.props.severity === "info" &&
              !options.props.outlined &&
              !options.props.text,
          },
          {
            "border-transparent bg-transparent": options.props.text,
          },
          {
            "bg-white": options.props.outlined,
          },
        ],
      };
    },
    label(options) {
      return {
        class: [
          "font-bold",
          {
            "text-xs/[12px]": options.props.size === "small",
          },
          {
            "text-base/[18px]": options.props.size === "large",
          },
          {
            "text-white": !options.props.outlined && !options.props.text,
          },
          {
            "text-primary": options.props.outlined && !options.props.severity,
          },
          {
            "text-error":
              (options.props.outlined || options.props.text) &&
              options.props.severity === "danger",
          },
          {
            "text-secondary":
              (options.props.outlined || options.props.text) &&
              options.props.severity === "info",
          },
        ],
      };
    },
    loadingIcon(options) {
      return {
        class: [
          "mr-1 animate-spin",
          {
            "text-white opacity-1":
              !options.props.outlined && !options.props.text,
          },
          {
            "text-primary":
              (options.props.outlined || options.props.text) &&
              !options.props.severity,
          },
          {
            "text-error":
              (options.props.outlined || options.props.text) &&
              options.props.severity === "danger",
          },
          {
            "text-secondary":
              (options.props.outlined || options.props.text) &&
              options.props.severity === "info",
          },
        ],
      };
    },
  },
  inputtext: {
    root(options) {
      return {
        class: [
          "p-[14px] transition-colors transition-transform text-base h-[52px] text-text font-medium focus:bg-white rounded-[8px] border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full group-[.inputgroup]:focus:border-l-stroke group-[.inputgroup]:rounded-l-none",
          [
            !options.props.invalid
              ? [
                  "focus:border-stroke",
                  [
                    options.context.filled
                      ? "border-stroke border-2 group-[.inputgroup]:border-l-stroke"
                      : "border-filling border-2 bg-filling group-[.inputgroup]:border-l-white",
                  ],
                ]
              : [
                  "border-error border",
                  {
                    "pt-[20px] pb-[8px]":
                      options.parent.instance.$name === "FloatLabel" &&
                      options.context.filled,
                  },
                ],
          ],
          {
            "p-filled": options.context.filled,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel",
          },
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.context.filled &&
              !options.props.invalid,
          },
        ],
      };
    },
  },
  inputmask: {
    root(options) {
      return {
        class: [
          "p-[14px] transition-colors transition-transform text-base h-[52px] text-text font-medium focus:bg-white rounded-[8px] border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          [
            !options.props.invalid
              ? [
                  "focus:border-stroke",
                  [
                    options.context.filled
                      ? "border-stroke border-2"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : [
                  "border-error border",
                  {
                    "pt-[20px] pb-[8px]":
                      options.parent.instance.$name === "FloatLabel" &&
                      options.context.filled,
                  },
                ],
          ],
          {
            "p-filled": options.context.filled,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel" &&
              !options.props.invalid,
          },
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.context.filled &&
              !options.props.invalid,
          },
        ],
      };
    },
  },
  password: {
    root: "relative",
    hideIcon: "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer",
    showIcon: "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer",
    input: {
      root(options: InputTextPassThroughMethodOptions) {
        return {
          class: [
            "p-[14px] pr-8 transition-colors transition-transform text-base h-[52px] text-text font-medium focus:bg-white rounded-[8px] border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
            {
              "pt-[20px] pb-[8px]":
                options.parent.instance.$parentInstance.$name ===
                  "FloatLabel" && options.parent.instance.filled,
            },
            [
              !options.props.invalid
                ? [
                    "focus:border-stroke",
                    [
                      options.parent.instance.filled
                        ? "border-stroke border-2"
                        : "border-filling border-2 bg-filling",
                    ],
                  ]
                : [
                    "border-error border",
                    {
                      "pt-[20px] pb-[8px]":
                        options.parent.instance.$name === "FloatLabel" &&
                        options.parent.instance.filled,
                    },
                  ],
            ],
            {
              "p-filled": options.parent.instance.filled,
            },
            {
              "focus:pb-[8px] focus:pt-[20px]":
                options.parent.instance.$parentInstance.$name === "FloatLabel",
            },
            {
              "pt-[20px] pb-[8px]":
                options.parent.instance.$name === "FloatLabel" &&
                options.parent.instance.filled &&
                !options.props.invalid,
            },
            // [options.parent.instance.filled ? "border-stroke border-2 p-filled" : "border-filling border-2 bg-filling"]
          ],
        };
      },
    },
  },
  checkbox: {
    root: "relative inline-flex inline-flex align-bottom w-6 h-6",
    input:
      "appearance-none absolute top-0 left-0 w-full h-full p-0 m-0 opacity-0 z-[1] border border-solid border-primary rounded-[4px] cursor-pointer disabled:cursor-not-allowed",
    box(options) {
      return {
        class: [
          "rounded-[4px] border-2 border-solid border-primary w-6 h-6 transition-all outline-none flex items-center justify-center text-white",
          {
            "bg-primary": options.context.checked,
          },
          {
            "opacity-50": options.context.disabled,
          },
        ],
      };
    },
    icon: "text-white",
  },
  tabview: {
    navContainer: "relative",
    navContent:
      "overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain overscroll-y-auto",
    nav: {
      class: "relative border-b-2 border-solid border-transparent flex",
    },
    tabpanel(options) {
      return {
        header: options.props.pt ?? "py-[14px] w-full text-center",
        headerAction: [
          "font-bold",
          [options.context.active ? "text-text" : "text-additional"],
          [
            options.props.disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer",
          ],
        ],
      };
    },
    inkbar:
      "z-[1] block absolute -bottom-0.5 h-0.5 bg-primary transition-all ease-[cubic-bezier(0.35,0,0.25,1)] duration-300",
    panelContainer: "py-4",
  },
  calendar: {
    root(options) {
      return {
        class: [
          "rounded-[8px] transition-all h-[52px] text-base text-text font-medium inline-flex items-center border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          {
            "bg-white": options.state.focused,
          },
          [
            !options.props.invalid
              ? [
                  {
                    "border-stroke": options.state.focused,
                  },
                  [
                    options.props.modelValue
                      ? "border-stroke border-2"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : ["border-error border"],
          ],
        ],
      };
    },
    input(options) {
      return {
        class: [
          "grow py-4 pl-4 bg-transparent",
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.props.modelValue,
          },
          {
            "p-filled": options.props.modelValue,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel",
          },
        ],
      };
    },
    panel() {
      return {
        class: [
          "border-2 border-solid border-stroke rounded-[8px] !mt-2 bg-white p-2 text-base !max-w-[286px] !min-w-[286px]",
        ],
      };
    },
    header() {
      return {
        class: [
          "flex justify-between items-center pb-2 border-b border-solid border-stroke font-bold",
        ],
      };
    },
    title() {
      return {
        class: ["flex gap-2"],
      };
    },
    table() {
      return {
        class: ["w-full mt-2"],
      };
    },
    tableBody() {
      return {
        class: ["mt-3"],
      };
    },
    dayLabel(options) {
      return {
        class: [
          "flex items-center justify-center rounded-32 w-8 h-8",
          [
            options.context.disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer",
          ],
          {
            "text-[#d7d7d7]": options.context.otherMonth,
          },
          [
            options.context.selected
              ? ["bg-accent_fill border border-solid border-stroke"]
              : { "hover:bg-accent_fill_light": !options.context.disabled },
          ],
        ],
      };
    },
    yearPicker() {
      return {
        class: ["mt-2 flex flex-wrap gap-3"],
      };
    },
    year() {
      return {
        class: ["cursor-pointer"],
      };
    },
    monthPicker() {
      return {
        class: ["mt-2 flex flex-wrap gap-3"],
      };
    },
    month() {
      return {
        class: ["cursor-pointer"],
      };
    },
  },
  dropdown: {
    root(options) {
      return {
        class: [
          "rounded-[8px] transition-colors transition-transform h-[52px] text-base text-text font-medium inline-flex items-center border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          {
            "bg-white": options.state.focused,
          },
          [
            !options.props.invalid
              ? [
                  {
                    "border-stroke": options.state.focused,
                  },
                  [
                    options.props.modelValue != undefined
                      ? "border-stroke border-2"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : ["border-error border"],
          ],
        ],
      };
    },
    input(options) {
      return {
        class: [
          "grow py-4 pl-4",
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.props.modelValue != undefined,
          },
          {
            "p-filled": options.props.modelValue != undefined,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel",
          },
        ],
      };
    },
    trigger(options) {
      return {
        class: [
          "p-4 transition-all duration-300",
          {
            "rotate-180": options.state.overlayVisible,
          },
        ],
      };
    },
    panel() {
      return {
        class: [
          "border-2 border-solid border-stroke rounded-[8px] !mt-2 bg-white overflow-hidden",
        ],
      };
    },
    wrapper(options) {
      return {
        class: [
          "overflow-auto styled-scrollbar",
          {
            "p-focus": options.state.focused,
          },
        ],
      };
    },
    item(options) {
      return {
        class: [
          "px-4 py-3 transition-all",
          [options.context.disabled ? "cursor-not-allowed" : "cursor-pointer"],
          {
            "bg-accent_fill":
              options.context.focused || options.context.selected,
          },
          {
            "hover:bg-accent_fill_light": !options.context.selected,
          },
        ],
      };
    },
    transition() {
      return {
        enterFromClass: "opacity-0",
        enterActiveClass: "transition-opacity",
        leaveToClass: "opacity-0",
        leaveActiveClass: "transition-opacity",
      };
    },
    filterContainer() {
      return {
        class: ["relative px-3 pt-3 pb-2"],
      };
    },
    filterInput() {
      return {
        class: [
          "w-full border border-solid border-stroke bg-filling focus:bg-white rounded-8 h-10 pl-3 pr-10",
        ],
      };
    },
    filterIcon() {
      return {
        class: ["absolute top-[22px] w-5 h-5 right-6"],
      };
    },
    emptyMessage() {
      return {
        class: ["p-3"],
      };
    },
  },
  multiselect: {
    root(options) {
      return {
        class: [
          "rounded-[8px] transition-colors transition-transform h-[52px] text-base text-text font-medium inline-flex items-center border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          [
            options.state.focused ||
            (options.props.modelValue && options.props.modelValue.length)
              ? "bg-white"
              : "bg-filling",
          ],
          [
            !options.props.invalid
              ? [
                  {
                    "border-stroke": options.state.focused,
                  },
                  [
                    options.props.modelValue && options.props.modelValue.length
                      ? "border-stroke border-2 h-fit"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : ["border-error border"],
          ],
        ],
      };
    },
    labelContainer() {
      return {
        class: ["overflow-hidden grow"],
      };
    },
    label(options) {
      return {
        class: [
          "grow py-4 pl-4",
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.props.modelValue?.length,
          },
          {
            "p-filled": options.props.modelValue?.length,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel",
          },
          {
            "truncate mt-2": options.props.modelValue?.length,
          },
        ],
      };
    },
    trigger(options) {
      return {
        class: [
          "p-4 transition-all duration-300",
          {
            "rotate-180": options.state.overlayVisible,
          },
        ],
      };
    },
    panel(options) {
      return {
        class: [
          "border-2 border-solid border-stroke rounded-[8px] bg-white",
          [options.props.modelValue?.length ? "!mt-6" : "!mt-2"],
        ],
      };
    },
    wrapper(options) {
      return {
        class: [
          "overflow-auto",
          {
            "p-focus": options.state.focused,
          },
        ],
      };
    },
    item(options) {
      return {
        class: [
          "px-4 py-3 transition-all hover:bg-accent_fill_light flex gap-2",
          [options.context.disabled ? "cursor-not-allowed" : "cursor-pointer"],
        ],
      };
    },
    transition() {
      return {
        enterFromClass: "opacity-0",
        enterActiveClass: "transition-opacity",
        leaveToClass: "opacity-0",
        leaveActiveClass: "transition-opacity",
      };
    },
    filterContainer() {
      return {
        class: ["relative px-3 pt-3 pb-2"],
      };
    },
    filterInput() {
      return {
        class: [
          "w-full border border-solid border-stroke bg-filling focus:bg-white rounded-8 h-10 pl-3 pr-10",
        ],
      };
    },
    filterIcon() {
      return {
        class: ["absolute top-[22px] w-5 h-5 right-6"],
      };
    },
    emptyMessage() {
      return {
        class: ["p-3"],
      };
    },
    token() {
      return {
        class: [
          "inline-flex px-2 py-1 border border-solid border-stroke rounded-28 items-center w-fit mr-2 last:mr-0",
        ],
      };
    },
    removeTokenIcon() {
      return {
        class: ["w-5 h-5 text-secondary ml-1"],
      };
    },
  },
  textarea: {
    root(options) {
      return {
        class: [
          "p-[16px] transition-colors transition-transform text-base text-text font-medium focus:bg-white rounded-[8px] border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          [
            !options.props.invalid
              ? [
                  "focus:border-stroke",
                  [
                    options.instance.filled
                      ? "border-stroke border-2"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : [
                  "border-error border",
                  {
                    "bg-filling": !options.instance.filled,
                  },
                ],
          ],
          {
            "p-filled": options.instance.filled,
          },
        ],
      };
    },
  },
  inputswitch: {
    root(options) {
      return {
        class: [
          "inline-block group",
          [
            options.attrs?.size && options.attrs?.size === "small"
              ? "w-[39px] h-6"
              : "w-[52px] h-8",
          ],
        ],
      };
    },
    input() {
      return {
        class: [
          "appearance-none absolute top-0 left-0 w-full h-full p-0 m-0 opacity-0 z-[1] border border-solid border-primary rounded-[4px] cursor-pointer disabled:cursor-not-allowed",
        ],
      };
    },
    slider(options) {
      return {
        class: [
          "border-2 border-solid border-secondary duration-200 before:transition-all before:duration-200 transition-all rounded-30 outline-transparent absolute cursor-pointer top-0 left-0 right-0 bottom-0 before:-translate-y-1/2 before:rounded-3xl before:absolute before:top-1/2 before:left-1",
          [
            options.attrs?.size && options.attrs?.size === "small"
              ? [
                  options.context.checked
                    ? "before:translate-x-[12px] before:w-[18px] before:h-[18px] before:bg-white bg-secondary"
                    : "before:bg-secondary before:w-3 before:h-3 bg-white",
                ]
              : [
                  options.context.checked
                    ? "before:translate-x-[18px] before:w-6 before:h-6 before:bg-white bg-secondary"
                    : "before:bg-secondary before:w-4 before:h-4 bg-white",
                ],
          ],
          [
            options.context.disabled
              ? "opacity-50"
              : "group-has-[:hover]:opacity-80",
          ],
        ],
      };
    },
  },
  autocomplete: {
    root(options) {
      return {
        class: [
          "rounded-[8px] transition-colors transition-transform h-[52px] text-base text-text font-medium inline-flex items-center border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
          {
            "bg-white": options.state.focused,
          },
          [
            !options.props.invalid
              ? [
                  {
                    "border-stroke": options.state.focused,
                  },
                  [
                    options.props.modelValue
                      ? "border-stroke border-2"
                      : "border-filling border-2 bg-filling",
                  ],
                ]
              : ["border-error border"],
          ],
        ],
      };
    },
    input(options) {
      return {
        class: [
          "grow py-4 pl-4 pr-2 rounded-28 bg-transparent",
          {
            "pt-[20px] pb-[8px]":
              options.parent.instance.$name === "FloatLabel" &&
              options.props.modelValue,
          },
          {
            "p-filled": options.props.modelValue,
          },
          {
            "focus:pb-[8px] focus:pt-[20px]":
              options.parent.instance.$name === "FloatLabel",
          },
        ],
      };
    },
    loadingIcon() {
      return {
        class: ["mr-3 animate-spin"],
      };
    },
    panel() {
      return {
        class: [
          "border-2 border-solid border-stroke rounded-[8px] !mt-2 bg-white overflow-auto styled-scrollbar",
        ],
      };
    },
    list(options) {
      return {
        class: [
          "overflow-auto",
          {
            "p-focus": options.state.focused,
          },
        ],
      };
    },
    item(options) {
      return {
        class: [
          "px-4 py-3 transition-all",
          [options.context.disabled ? "cursor-not-allowed" : "cursor-pointer"],
          {
            "bg-accent_fill":
              options.context.focused || options.context.selected,
          },
          {
            "hover:bg-accent_fill_light": !options.context.selected,
          },
        ],
      };
    },
    transition() {
      return {
        enterFromClass: "opacity-0",
        enterActiveClass: "transition-opacity",
        leaveToClass: "opacity-0",
        leaveActiveClass: "transition-opacity",
      };
    },
    emptyMessage() {
      return {
        class: ["p-3"],
      };
    },
  },
  inputnumber: {
    input: {
      root(options) {
        return {
          class: [
            "p-[14px] transition-colors transition-transform text-base h-[52px] text-text font-medium focus:bg-white rounded-[8px] border-solid focus:outline-0 disabled:bg-stroke disabled:border-stroke disabled:cursor-not-allowed w-full",
            [
              !options.parent.props.invalid
                ? [
                    "focus:border-stroke",
                    [
                      options.parent.state.d_modelValue !== null
                        ? "border-stroke border-2"
                        : "border-filling border-2 bg-filling",
                    ],
                  ]
                : [
                    "border-error border",
                    {
                      "pt-[20px] pb-[8px]":
                        options.instance.$parentInstance.$parentInstance
                          .$name === "FloatLabel" &&
                        options.parent.state.d_modelValue !== null,
                    },
                  ],
            ],
            {
              "p-filled": options.parent.state.d_modelValue !== null,
            },
            {
              "focus:pb-[8px] focus:pt-[20px]":
                options.instance.$parentInstance.$parentInstance.$name ===
                "FloatLabel",
            },
            {
              "pt-[20px] pb-[8px]":
                options.instance.$parentInstance.$parentInstance.$name ===
                  "FloatLabel" &&
                options.parent.state.d_modelValue !== null &&
                !options.parent.props.invalid,
            },
          ],
        };
      },
    },
  },
  inputgroup: {
    root: "flex items-stretch w-full group inputgroup",
  },
  inputgroupaddon: {
    root: "flex items-center justify-center py-2 px-4 group-has-[:focus]:bg-white group-has-[.p-filled]:bg-white border-filling border-y-2 border-l-2 bg-filling rounded-l-[8px] group-has-[:focus]:border-stroke group-has-[.p-filled]:border-stroke group-has-[.border-error]:!border-error group-has-[.border-error]:border",
  },
  toast: {
    root() {
      return {
        class: [
          "opacity-100 max-w-[350px] w-full whitespace-pre-line break-words",
        ],
      };
    },
    container(options) {
      return {
        class: [
          "rounded-8 mb-4 backdrop-blur-[1.5px] border border-solid",
          {
            "shadow-[0_4px_8px_0_rgba(34,197,94,0.04)] bg-[rgba(240,253,244,0.95)] border-[#bbf7d0] text-[#16a34a]":
              options.props.message?.severity === "success",
          },
          {
            "shadow-[0_4px_8px_0_rgba(239,68,68,0.04)] bg-[rgba(254,242,242,0.95)] border-[#fecaca] text-error":
              options.props.message?.severity === "error",
          },
        ],
      };
    },
    content() {
      return {
        class: ["border p-3 flex items-start"],
      };
    },
    icon(options) {
      return {
        class: [
          "shrink-0 w-5 h-5 text-base",
          {
            "text-[#16a34a]": options.props.message?.severity === "success",
          },
          {
            "text-error": options.props.message?.severity === "error",
          },
        ],
      };
    },
    text() {
      return {
        class: "ml-2 flex-auto",
      };
    },
    summary() {
      return {
        class: "font-medium text-base",
      };
    },
    detail() {
      return {
        class: "text-text text-sm",
      };
    },
    closeButton(options) {
      return {
        class: [
          "w-6 h-6 relative -mt-[25%] -right-1/4 flex items-center justify-center rounded-full transition-colors bg-transparent",
          {
            "text-[#16a34a] outline-[#16a34a] hover:bg-[#dcfce7]":
              options.props.message?.severity === "success",
          },
          {
            "text-error outline-error hover:bg-[#fee2e2]":
              options.props.message?.severity === "error",
          },
        ],
      };
    },
    transition() {
      return {
        enterFromClass: "opacity-0 translate-y-20",
        enterActiveClass: "transition duration-300",
        leaveToClass: "opacity-0",
        leaveActiveClass: "absolute w-full transition-opacity duration-300",
        moveClass: "transition-all duration-300",
      };
    },
  },
  dialog: {
    mask(options) {
      return {
        class: [
          [
            options.props.visible
              ? "animate-overlayFadeEnter"
              : "animate-overlayFadeLeave",
          ],
        ],
      };
    },
    root: "bg-white px-6 py-10 rounded-28 shadow-[0_4px_40px_0_rgba(0,0,0,0.1)] relative",
    closeButton:
      "absolute top-6 right-6 text-secondary transition hover:opacity-80",
    transition: {
      enterFromClass: "opacity-0 scale-50",
      enterActiveClass: "transition duration-300",
      leaveToClass: "opacity-0 scale-50",
      leaveActiveClass: "transition duration-300",
    },
  },
  carousel: {
    container: "relative flex",
    previousButton(options) {
      return {
        class:
          "absolute transition left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-solid border-stroke w-10 h-10 rounded flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:hidden hover:bg-filling z-10",
        "data-test": options.attrs["previous-data-test"],
      };
    },
    previousButtonIcon() {
      return {
        class: "text-stroke",
      };
    },
    nextButton(options) {
      return {
        class:
          "absolute transition right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white border border-solid border-stroke w-10 h-10 rounded flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:hidden hover:bg-filling z-10",
        "data-test": options.attrs["next-data-test"],
      };
    },
    nextButtonIcon() {
      return {
        class: "text-stroke",
      };
    },
    itemsContent() {
      return {
        class: "overflow-hidden w-full",
      };
    },
    itemsContainer: "flex",
    item(options) {
      return {
        class: "grow shrink-0",
        style: {
          flexBasis: `${100 / options.state.d_numVisible}%`,
        },
      };
    },
  },
  stepper: {
    root() {
      return {
        class: "flex flex-col gap-6",
      };
    },
    nav() {
      return {
        class: "flex justify-between",
      };
    },
    stepperpanel: {
      header: "flex flex-auto items-center last-of-type:flex-initial",
      action(options: StepperPanelPassThroughMethodOptions) {
        return {
          class: [
            "rounded-full w-6 h-6 transition",
            [options.context.active ? "bg-secondary" : "bg-accent_fill"],
          ],
        };
      },
      number(options: StepperPanelPassThroughMethodOptions) {
        return {
          class: [
            "text-xs transition",
            [options.context.active ? "text-white" : "text-additional"],
          ],
        };
      },
      separator(options: StepperPanelPassThroughMethodOptions) {
        return {
          class: [
            "border-b-2 border-dashed w-full flex-1 inline-block transition",
            [
              options.context.highlighted
                ? "border-secondary"
                : "border-accent_fill",
            ],
          ],
        };
      },
    },
  },
  avatar: {
    root(options) {
      return {
        class: [
          "inline-flex items-center justify-center overflow-hidden",
          [options.props.shape === "circle" ? "rounded-full" : "rounded-lg"],
          {
            "w-[120px] h-[120px] text-[60px]": options.props.size === "xlarge",
          },
          {
            "w-[80px] h-[80px] text-[40px]": options.props.size === "large",
          },
          {
            "w-[40px] h-[40px] text-[20px]":
              !options.props.size || options.props.size === "normal",
          },
          {
            "bg-filling": !options.props.image,
          },
        ],
      };
    },
    image(options) {
      return {
        class: [
          "h-full w-full object-cover",
          [options.props.shape === "circle" ? "rounded-full" : "rounded-lg"],
        ],
      };
    },
  },
  tag: {
    root(options) {
      return {
        class: [
          "inline-flex items-center justify-center py-1 px-2 text-[10px]/[14px] rounded-100 w-fit opacity-60",
          {
            "bg-primary": !options.props.severity,
          },
          {
            "bg-error": options.props.severity === "danger",
          },
        ],
      };
    },
    value() {
      return {
        class: "font-bold text-white",
      };
    },
  },
  datatable: {
    root: {
      class: "w-full"
    },
    table: {
      class: "w-full"
    },
    headerRow: {
      class: "h-[48px]"
    },
    bodyRow: {
      class: [
        "h-[46px] odd:bg-filling"
      ]
    }
  },
  column:{
    headerCell: () => {
      return {
        class: [
          "text-left text-base text-additional font-medium first:pl-4 last:pr-4"
        ]
      };
    },
    bodyCell: () => {
      return {
        class: [
          "text-left text-base font-medium first:pl-4 first:rounded-l-8 last:pr-4 last:rounded-r-8"
        ]
      };
    }
  },
};
export default myPreset;
