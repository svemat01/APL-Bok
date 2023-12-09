<script>
  import Topbar from "$lib/components/Topbar.svelte";
  import "../app.pcss";
  import Sidebar from "../lib/components/Sidebar.svelte";
</script>

<div class="flex min-h-screen">
	<Sidebar />
	<div class="flex flex-1 flex-col">
		<Topbar />
		<slot />
	</div>
</div>

<!-- <div class="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[100px_1fr]">
  <Sidebar />
  <Topbar />
  <slot />
</div> -->
