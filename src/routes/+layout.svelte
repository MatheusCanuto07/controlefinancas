<script lang="ts">
  import type { LayoutProps } from './$types';
  import "../app.css";
  let { data, children }: LayoutProps = $props();
</script>

<div class="h-screen overflow-y-auto">
  {@render children()}
</div>