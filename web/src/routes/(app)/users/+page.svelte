<script lang="ts">
    import { page } from '$app/stores';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import type { PageData } from './$types';

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
</script>

<div class="p-2 space-y-3">
    <div class="flex items-end justify-between">
        <div class="flex gap-2">
            <div class="flex flex-col w-full max-w-sm gap-1.5">
                <Label for="search">Search for user</Label>
                <Input type="text" id="search" bind:value={searchRaw} />
            </div>
        </div>

        <div class="flex gap-2">
            <Button href="/users/new">Add User</Button>
        </div>
    </div>

    {#if data.users}
        <UsersTable data={data.users} {search} />
    {:else}
        <div class="p-2">No users found</div>
    {/if}
</div>
