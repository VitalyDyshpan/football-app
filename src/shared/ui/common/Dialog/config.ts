import type { ConfirmDialogPassThroughOptions } from "primevue/confirmdialog";

export const confirmDialogPt: ConfirmDialogPassThroughOptions = {
  root() {
    return {
      class: "gap-10 max-w-[480px] w-full",
    };
  },
  header() {
    return {
      class: "text-center",
    };
  },
  title() {
    return {
      class: "text-text text-xxl font-bold",
    };
  },
  content(options) {
    return {
      class: [
        "text-center",
        {
          hidden: !options.instance.$parentInstance.message,
        },
      ],
    };
  },
  message() {
    return {
      class: "text-base text-text",
    };
  },
  footer() {
    return {
      class: "flex gap-4 items-center justify-between",
    };
  },
  rejectButton: {
    root(options) {
      return {
        class:
          "bg-transparent rounded border border-solid transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-primary px-[24px] py-[15px] w-full",
        "data-test":
          options.instance.$parentInstance.$params.attrs.rejectDataTest,
      };
    },
    label() {
      return {
        class: "text-primary text-base/[18px]",
      };
    },
  },
  acceptButton: {
    root(options) {
      return {
        "data-test":
          options.instance.$parentInstance.$params.attrs.acceptDataTest,
        class:
          "bg-primary rounded border border-solid transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-primary px-[24px] py-[15px] w-full",
      };
    },
    label() {
      return {
        class: "text-white text-base/[18px]",
      };
    },
  },
  closeButton(options) {
    return {
      "data-test": options.attrs.closeDataTest,
    };
  },
};

export const dialogPt: ConfirmDialogPassThroughOptions = {
  root() {
    return {
      class: "gap-10 max-w-[576px] w-full",
    };
  },
  header() {
    return {
      class: " text-center",
    };
  },
  title() {
    return {
      class: "text-text text-xxl font-bold",
    };
  },
  content() {
    return {
      class: "text-center",
    };
  },
};
