<script lang="ts">
    import { fade } from 'svelte/transition';

    import type { PageData } from './$types.js';

    import { navigating } from '$app/stores';
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import Spinner from '$lib/components/Spinner.svelte';

    export let data: PageData;

    const { currentUser } = data;
</script>

<div class="flex h-screen">
    <Sidebar />
    <div class="relative flex flex-col flex-1 min-h-screen md:h-screen">
        <!-- <Topbar {currentUser} /> -->

        <!-- <div class="relative flex-1"> -->
        {#if $navigating}
            <div
                class="absolute inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur"
                transition:fade={{ duration: 200 }}
            >
                <Spinner size={64} />
            </div>
        {/if}
        <slot />
        <!-- </div> -->
    </div>
</div>

<!-- <style lang="postcss">
    .grid {
        grid-template-columns: 240px 1fr;
        grid-template-rows: 64px 1fr;
    }

    /* Sidebar */
    .grid > :global(:nth-child(1)) {
        grid-row: span 2;
    }
</style> -->
