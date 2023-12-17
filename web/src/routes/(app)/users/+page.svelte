<script lang="ts">
    import { page } from '$app/stores';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import TextInput from '$lib/components/TextInput.svelte';
    import type { PageData } from './$types';
    import AddUserDialog from './AddUserDialog.svelte';

    export let data: PageData;

    import UsersTable from './UsersTable.svelte';

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

            <TextInput label="Search for user" bind:value={searchRaw} />
        </div>

        <div class="flex gap-2">
            <!-- <Button text="Add User" on:click={() => (newUserOpen = true)} /> -->
            <LinkButton href="/users/new" text="Add User" />
        </div>
    </div>

    {#if data.users}
        <UsersTable data={data.users} {search} />
    {:else}
        <div class="p-2">No users found</div>
    {/if}
</div>
