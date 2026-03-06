<script setup>
import { inject, onMounted, ref } from "vue";

const githubService = inject("githubService");
const user = ref(null);

onMounted(async () => {
  if (!githubService) return;
  try {
    user.value = await githubService.getUser();
  } catch (err) {
    console.error("Failed to fetch user", err);
  }
});

function openOptions() {
  chrome.runtime.openOptionsPage();
}
</script>

<template>
  <div class="github-extension-panel">
    <h3>GitHub Extension</h3>
    <div v-if="githubService">
      <div v-if="user">
        Logged in as: <strong>{{ user.login }}</strong>
      </div>
      <div v-else>Loading user...</div>
    </div>
    <div v-else>
      <p>No GitHub token found.</p>
      <button @click="openOptions">Set Token</button>
    </div>
  </div>
</template>

<style scoped>
.github-extension-panel {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  margin: 8px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
</style>
