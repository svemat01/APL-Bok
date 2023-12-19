<script lang="ts" generics="TData extends unknown">
    import { createSvelteTable, flexRender } from '@tanstack/svelte-table';
    import type { Row, TableOptions } from '@tanstack/table-core/';
    import { derived } from 'svelte/store';
    import type { Writable } from 'svelte/store';

    import * as Table from '$lib/components/ui/table';

    // ==================
    // Table Options
    // ==================

    export let options: Writable<TableOptions<TData>>;

    const table = createSvelteTable(options);

    export const count = derived(table, ($table) => $table.getRowModel().rows.length);

    // ==================
    // Variables
    // ==================

    export let caption: string | undefined = undefined;
    export let noResultsText = 'No results matched your query';
    export let emptyText = 'No data available';

    export let onRowClick: ((row: Row<TData>) => void) | undefined = undefined;
</script>

<Table.Root>
    {#if caption}
        <Table.Caption>{caption}</Table.Caption>
    {/if}
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
            <Table.Row on:click={() => onRowClick && onRowClick(row)}>
                {#each row.getVisibleCells() as cell}
                    <Table.Cell>
                        <svelte:component
                            this={flexRender(cell.column.columnDef.cell, cell.getContext())}
                        />
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
        {#if $count === 0}
            <Table.Row>
                <Table.Cell colspan={$options.columns.length}>
                    {#if $options.data.length === 0}
                        {emptyText}
                    {:else}
                        {noResultsText}
                    {/if}
                </Table.Cell>
            </Table.Row>
        {/if}
    </Table.Body>
</Table.Root>
