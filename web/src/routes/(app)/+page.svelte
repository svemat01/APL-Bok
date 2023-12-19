<script lang="ts">
    import type { PageData } from './$types.js';

    import SimpleCard from '$lib/components/SimpleCard.svelte';
    import Spinner from '$lib/components/Spinner.svelte';

    export let data: PageData;

    const { summary } = data;
</script>

<div class="grid flex-1 grid-cols-4 grid-rows-4 gap-4 p-4">
    {#if summary}
        <SimpleCard title="Users" value={summary.users} />
        <SimpleCard title="Companies" value={summary.companies} />
    {:else}
        <Spinner />
    {/if}
</div>
