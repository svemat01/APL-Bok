<script lang="ts">
    import { page } from '$app/stores';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import TextInput from '$lib/components/TextInput.svelte';
    import type { PageData } from './$types';
    import AddUserDialog from './AddUserDialog.svelte';

    export let data: PageData;

    import UsersTable from './AplsTable.svelte';

    let searchRaw = $page.url.searchParams.get('search') ?? '';

    let search = '';

    let timer: NodeJS.Timeout;

    $: {
        clearTimeout(timer);

        timer = setTimeout(() => {
            search = searchRaw;
        }, 300);
    }

    let newUserOpen = false;
</script>

{#if newUserOpen}
    <AddUserDialog bind:isOpen={newUserOpen} />
{/if}

<div class="p-2 space-y-3">
    <div class="flex items-end justify-between">
        <div class="flex gap-2">
            <!-- <DebouncedInput bind:value={globalFilter} delay={300} /> -->

            <TextInput label="Search for APL" bind:value={searchRaw} />
        </div>

        <div class="flex gap-2">
            <LinkButton href="/apls/new" text="Add APL" />
        </div>
    </div>

    {#if data.users}
        <UsersTable data={data.users} {search} />
    {:else}
        <div class="p-2">No apls found</div>
    {/if}
</div>
