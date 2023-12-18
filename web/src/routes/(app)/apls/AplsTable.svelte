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
    import TBodyCell from '$lib/components/Table/TBodyCell.svelte';
    import TBodyRow from '$lib/components/Table/TBodyRow.svelte';
    import THead from '$lib/components/Table/THead.svelte';
    import THeadRow from '$lib/components/Table/THeadRow.svelte';
    import THeaderCell from '$lib/components/Table/THeaderCell.svelte';
    import Table from '$lib/components/Table/Table.svelte';

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

<Table>
    <THead>
        {#each $table.getHeaderGroups() as headerGroup}
            <THeadRow>
                {#each headerGroup.headers as header}
                    <THeaderCell>
                        {#if !header.isPlaceholder}
                            <svelte:component
                                this={flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            />
                        {/if}
                    </THeaderCell>
                {/each}
            </THeadRow>
        {/each}
    </THead>
    <tbody>
        {#each $table.getRowModel().rows as row}
            <TBodyRow on:click={() => goto(`/apl/${row.original.id}`)}>
                {#each row.getVisibleCells() as cell}
                    <TBodyCell>
                        <svelte:component
                            this={flexRender(cell.column.columnDef.cell, cell.getContext())}
                        />
                    </TBodyCell>
                {/each}
            </TBodyRow>
        {/each}
    </tbody>
</Table>
