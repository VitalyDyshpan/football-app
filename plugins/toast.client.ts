import { useToast } from "primevue/usetoast";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin(() => {
  const toast = useToast();
  return {
    provide: {
      toast,
    },
  };
});
