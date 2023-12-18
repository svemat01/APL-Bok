<script lang="ts">
    import type { PageData } from './$types';
    import CompaniesTable from './CompaniesTable.svelte';

    import { page } from '$app/stores';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';

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

<div class="p-3 space-y-3">
    <div class="flex items-end justify-between">
        <div class="flex gap-2">
            <div class="flex flex-col w-full max-w-sm gap-1.5">
                <Label for="search">Search for company</Label>
                <Input type="text" id="search" bind:value={searchRaw} />
            </div>
        </div>

        <div class="flex gap-2">
            <Button href="/companies/new">Add Company</Button>
        </div>
    </div>

    {#if data.companies}
        <CompaniesTable data={data.companies} {search} />
    {:else}
        <div class="p-2">No companies found</div>
    {/if}
</div>
