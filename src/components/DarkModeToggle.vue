<template>
    <div>
        <div>
            <button
            id="toggleBtn"
            class="mx-10 ease-in-out transition-all duration-150 focus:outline-none flex-shrink-0 text-xl py-1 px-2 font-semibold tracking-widest"
            @click="toggleDark"
            v-on:submit.prevent
          ><i class="dark:text-white fa fa-solid fa-toggle-off"></i>
            </button>
          </div>
    </div>
</template>

<script>
import "@/assets/css/tailwind.css";

export default {
  name: "DarkModeToggle",
  data() {
    return {
      isDark: true
    };
  },
  methods: {
    toggleDark: async function() {
      this.isDark = !this.isDark;
      this.$emit("update:parent", this.isDark);
    }
  }
}
</script>