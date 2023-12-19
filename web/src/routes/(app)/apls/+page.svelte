<script lang="ts">
    import type { Readable } from 'svelte/store';

    import type { PageData } from './$types';
    import AplsTable from './AplsTable.svelte';

    import { page } from '$app/stores';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import { Input } from '$lib/components/ui/input';

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

    let count: Readable<number>;
</script>

<div class="p-3">
    <Card.Root>
        <Card.Header>
            <div class="flex items-center justify-between">
                <div class="space-y-2">
                    <Card.Title>APLs</Card.Title>
                    <Card.Description>
                        Showing {$count}
                        {$count === 1 ? 'APL' : 'APLs'}
                    </Card.Description>
                </div>

                <div class="flex items-center gap-2">
                    <Input
                        type="text"
                        id="search"
                        bind:value={searchRaw}
                        class="w-fit"
                        placeholder="Search"
                    />
                    <Button size="sm" href="/apls/new">Add APL</Button>
                </div>
            </div>
        </Card.Header>
        <Card.Content class="px-0">
            <AplsTable data={data.apls} {search} bind:count />
        </Card.Content>
    </Card.Root>
</div>
