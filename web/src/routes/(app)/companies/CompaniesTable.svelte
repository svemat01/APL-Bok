<script lang="ts">
    import { writable } from 'svelte/store';
    import type { FilterFn } from '@tanstack/svelte-table';
    import {
        createColumnHelper,
        createSvelteTable,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
    } from '@tanstack/svelte-table';
    import type { TableOptions } from '@tanstack/table-core/';
    import Table from '$lib/components/Table/Table.svelte';
    import THead from '$lib/components/Table/THead.svelte';
    import THeaderCell from '$lib/components/Table/THeaderCell.svelte';
    import TBodyRow from '$lib/components/Table/TBodyRow.svelte';
    import TBodyCell from '$lib/components/Table/TBodyCell.svelte';
    import THeadRow from '$lib/components/Table/THeadRow.svelte';
    import type { Company } from './+page.js';
    import { goto } from '$app/navigation';
    import { rankItem } from '@tanstack/match-sorter-utils';
    import { page } from '$app/stores';

    const fuzzyFilter: FilterFn<Company> = (row, columnId, value, addMeta) => {
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

    const columnHelper = createColumnHelper<Company>();

    export let data: Company[];

    const defaultColumns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (props) => props.getValue(),
        }),
        columnHelper.accessor('location', {
            header: 'Location',
            cell: (props) => props.getValue(),
        }),
        columnHelper.display({
            id: 'count',
            header: (props) => `${props.table.getRowModel().rows.length} users`,
        }),
    ];

    export let search = '';

    const options = writable<TableOptions<Company>>({
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
            <TBodyRow on:click={() => goto(`/companies/${row.original.id}`)}>
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
