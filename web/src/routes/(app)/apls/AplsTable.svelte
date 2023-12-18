<script lang="ts">
    import { rankItem } from '@tanstack/match-sorter-utils';
    import type { FilterFn } from '@tanstack/svelte-table';
    import {
        createColumnHelper,
        createSvelteTable,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
    } from '@tanstack/svelte-table';
    import type { TableOptions } from '@tanstack/table-core/';
    import { writable } from 'svelte/store';

    import type { APL } from './+page.js';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import * as Table from '$lib/components/ui/table';

    const fuzzyFilter: FilterFn<APL> = (row, columnId, value, addMeta) => {
        // Rank the item
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const itemRank = rankItem(row.getValue(columnId), value);

        // Store the itemRank info
        addMeta({
            itemRank,
        });

        // Return if the item should be filtered in/out
        return itemRank.passed;
    };

    const columnHelper = createColumnHelper<APL>();

    export let data: APL[];

    const defaultColumns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (props) => props.getValue(),
        }),
        columnHelper.accessor('company', {
            header: 'Company',
            cell: (props) => props.getValue(),
        }),
        columnHelper.accessor('user', {
            header: 'Username',
            cell: (props) => props.getValue(),
        }),
        columnHelper.display({
            id: 'count',
            header: (props) => `${props.table.getRowModel().rows.length} users`,
        }),
    ];

    export let search = '';

    const options = writable<TableOptions<APL>>({
        data,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: search,
        },
        globalFilterFn: fuzzyFilter,
        enableGlobalFilter: true,
    });

    $: {
        options.update((current) => ({
            ...current,
            state: {
                ...current.state,
                globalFilter: search,
            },
        }));

        let oldQuery = $page.url.searchParams.toString();

        let query = new URLSearchParams(oldQuery);

        if (search) {
            query.set('search', search);
        }

        console.log(query.toString());

        if (oldQuery !== query.toString()) {
            console.log('goto');
            void goto(`?${query.toString()}`, {
                keepFocus: true,
            });
        }
    }

    const table = createSvelteTable(options);
</script>

<Table.Root>
    <Table.Caption>All APLs</Table.Caption>
    <Table.Header>
        {#each $table.getHeaderGroups() as headerGroup}
            <Table.Row>
                {#each headerGroup.headers as header}
                    <Table.Head>
                        {#if !header.isPlaceholder}
                            <svelte:component
                                this={flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            />
                        {/if}
                    </Table.Head>
                {/each}
            </Table.Row>
        {/each}
    </Table.Header>
    <Table.Body>
        {#each $table.getRowModel().rows as row}
            <Table.Row on:click={() => goto(`/apls/${row.original.id}`)}>
                {#each row.getVisibleCells() as cell}
                    <Table.Cell>
                        <svelte:component
                            this={flexRender(cell.column.columnDef.cell, cell.getContext())}
                        />
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
