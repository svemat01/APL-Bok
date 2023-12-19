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

    import type { Report } from './+page.js';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import * as Table from '$lib/components/ui/table';
    import { df } from '$lib/utils/df.js';

    const fuzzyFilter: FilterFn<Report> = (row, columnId, value, addMeta) => {
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

    const columnHelper = createColumnHelper<Report>();

    export let reports: Report[];
    export let aplId: number;

    const defaultColumns = [
        columnHelper.accessor('date', {
            header: 'Date',
            cell: (props) => df.format(props.getValue()),
        }),
        columnHelper.accessor('rating', {
            header: 'Rating',
            cell: (props) => `${props.getValue()}/5`,
        }),
        columnHelper.display({
            header: 'Shift',
            cell: (props) =>
                df.formatRange(props.row.original.shiftStart, props.row.original.shiftEnd),
        }),
    ];

    export let search = '';

    const options = writable<TableOptions<Report>>({
        data: reports,
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

<Table.Root class="">
    <Table.Caption>All Reports</Table.Caption>
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
            <Table.Row on:click={() => goto(`/apls/aplId/${aplId}/reports/${row.original.id}`)}>
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
