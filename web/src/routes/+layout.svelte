<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

    import '../app.pcss';
    import { browser } from '$app/environment';

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    });
</script>

<QueryClientProvider client={queryClient}>
    <slot />
</QueryClientProvider>

<!-- <div class="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[100px_1fr]">
  <Sidebar />
  <Topbar />
  <slot />
</div> -->
