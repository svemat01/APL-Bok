<script lang="ts">
    import { page } from '$app/stores';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import TextInput from '$lib/components/TextInput.svelte';
    import type { PageData } from './$types';
    import CompaniesTable from './CompaniesTable.svelte';

    export let data: PageData;

    let searchRaw = $page.url.searchParams.get('search') ?? '';

    let search = '';

    let timer: NodeJS.Timeout;

    $: {
        clearTimeout(timer);

        timer = setTimeout(() => {
            search = searchRaw;
        }, 300);
    }
</script>

<div class="p-2 space-y-3">
    <div class="flex items-end justify-between">
        <div class="flex gap-2">
            <!-- <DebouncedInput bind:value={globalFilter} delay={300} /> -->

            <TextInput label="Search for companies" bind:value={searchRaw} />
        </div>

        <div class="flex gap-2">
            <!-- <Button text="Add User" on:click={() => (newUserOpen = true)} /> -->
            <LinkButton href="/companies/new" text="Add Company" />
        </div>
    </div>

    {#if data.companies}
        <CompaniesTable data={data.companies} {search} />
    {:else}
        <div class="p-2">No companies found</div>
    {/if}
</div>
