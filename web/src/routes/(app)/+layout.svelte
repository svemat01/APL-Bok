<script lang="ts">
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import Topbar from '$lib/components/Topbar.svelte';
    import type { PageData } from './$types.js';

    export let data: PageData;

    const { currentUser } = data;
</script>

<div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-1 overflow-y-auto">
        <Topbar {currentUser} />
        <slot />
    </div>
</div>
