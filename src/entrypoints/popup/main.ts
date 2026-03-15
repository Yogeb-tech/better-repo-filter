import { useGitHubTheme } from "@/composables/useGithubTheme";
import "@picocss/pico/css/pico.min.css";
import { createApp } from "vue";
import "../../assets/theme.css";
import App from "./App.vue";
import "./style.css";

// TODO:
// Put the injectedHTML to the right side of the website
// Check to see if it turns into scroll bar upon too many lists
// Fix Github auto detect theme not working it probably shouldn't just be handled in main
// Auto open to get token if there is no token in main.ts
// Add proper handling when user hasn't submitted the token. Notify the user in the injectedHTML that it needs a token
// Add prompt for user to reload the page upon entering token for plugin to work

const { loadTheme } = useGitHubTheme();

// Load theme before mounting app
loadTheme()
  .then(() => {
    createApp(App).mount("#app");
  })
  .catch((error: any) => {
    console.error("Failed to load theme, mounting with default:", error);
    createApp(App).mount("#app");
  });
