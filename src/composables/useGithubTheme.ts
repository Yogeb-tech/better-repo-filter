import { createLogger } from "@/utils/logger";
import { onMounted, ref } from "vue";

const logger = createLogger("useGitHubTheme");
const currentTheme = ref<"light" | "dark">("light");

// Type guard to validate theme
function isValidTheme(theme: unknown): theme is "light" | "dark" {
  return theme === "light" || theme === "dark";
}

export function useGitHubTheme() {
  // Load initial theme from storage
  const loadTheme = async (): Promise<void> => {
    try {
      const result = await browser.storage.local.get("githubTheme");

      // Validate and set the theme
      if (result.githubTheme && isValidTheme(result.githubTheme)) {
        currentTheme.value = result.githubTheme;
      } else {
        currentTheme.value = "light"; // default fallback
      }

      applyThemeToDocument(currentTheme.value);
      logger.debug(`Loaded theme from storage: ${currentTheme.value}`);
    } catch (error) {
      logger.error("Failed to load theme from storage:", error);
      currentTheme.value = "light";
      applyThemeToDocument("light");
    }
  };

  // Apply theme to document
  const applyThemeToDocument = (theme: "light" | "dark"): void => {
    // Remove existing theme classes
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${theme}`);
  };

  // Listen for theme changes from content script
  const setupThemeListener = (): void => {
    browser.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "local" && changes.githubTheme) {
        const newTheme = changes.githubTheme.newValue;

        // Validate the new theme value
        if (isValidTheme(newTheme)) {
          logger.debug(`Theme changed in storage: ${newTheme}`);
          currentTheme.value = newTheme;
          applyThemeToDocument(newTheme);
        } else {
          logger.warn(`Invalid theme value received: ${newTheme}`);
        }
      }
    });
  };

  onMounted(() => {
    loadTheme();
    setupThemeListener();
  });

  return {
    currentTheme,
    loadTheme,
  };
}
