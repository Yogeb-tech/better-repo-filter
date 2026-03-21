<script setup lang="ts">
import { CONSTANTS } from "@/constants/constants";
</script>
<template>
  <div class="github-extension-panel">
    <p>No GitHub token found.</p>
    <p>
      <a :href="CONSTANTS.GITHUB_GENERATE_KEY"
        >} target="_blank" rel="noopener" > Generate a token
      </a>
      with <code>repo</code> and <code>read:user</code> scopes. Then reload the
      page.
    </p>
  </div>
</template>
<style scoped>
.github-extension-panel {
  background: var(--bg-primary);
  padding: 16px;
  font-family: var(--font-mono);
  font-size: var(--font-base);
  color: var(--text-primary);
  max-width: 400px;
  margin: 0 auto;
}

.github-extension-panel h3 {
  margin: 0 0 16px 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

.github-extension-panel p {
  margin: 8px 0;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
