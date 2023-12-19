<script lang="ts">
    import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
    import type { TableOptions } from '@tanstack/table-core';
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';

    import type { PageData } from './$types';
    import type { APL } from './+page.js';

    import { goto } from '$app/navigation';
    import TTable from '$lib/components/TTable.svelte';
    import * as Card from '$lib/components/ui/card';
    import * as Table from '$lib/components/ui/table';
    import { df } from '$lib/utils/df.js';

    export let data: PageData;

    const { user, permissions } = data;

    const aplColumnHelper = createColumnHelper<APL>();

    const aplsTableOptions: Writable<TableOptions<APL>> = writable({
        data: user.apl,
        columns: [
            aplColumnHelper.accessor('name', {
                header: 'Name',
                cell: (props) => props.getValue(),
            }),
            aplColumnHelper.accessor('company', {
                header: 'Company',
                cell: (props) => props.getValue(),
            }),
            aplColumnHelper.display({
                header: 'Period',
                cell: (props) =>
                    df.formatRange(
                        new Date(props.row.original.startDate),
                        new Date(props.row.original.endDate),
                    ),
            }),
        ],
        getCoreRowModel: getCoreRowModel(),
    });
</script>

<div class="p-2 space-y-3">
    <h1 class="text-2xl">{user.firstName} {user.lastName} ({user.username})</h1>

    <details class="flex flex-wrap">
        <summary class="flex gap-2 select-none">
            <h2 class="text-xl">Permissions</h2>
            <span class="transition-transform">▼</span>
        </summary>
        {#each Object.entries(permissions) as [permission, value]}
            <label class="inline-flex items-center mt-3 mr-4">
                <input
                    type="checkbox"
                    class="w-5 h-5 text-blue-500 form-checkbox"
                    checked={value}
                />
                <span class="ml-2 text-gray-700">{permission}</span>
            </label>
        {/each}
    </details>

    <Card.Root>
        <Card.Header>
            <Card.Title>APLs</Card.Title>
        </Card.Header>
        <Card.Content class="px-0">
            <TTable
                options={aplsTableOptions}
                onRowClick={(row) => goto(`/apls/${row.original.id}`)}
                caption="All APLs"
            />
        </Card.Content>
    </Card.Root>

    <div class="space-y-2">
        <!-- <h2 class="text-xl">APLs</h2>
        {#if user.apl.length === 0}
            <p>No APLs</p>
        {:else}
            <Table.Root>
                <Table.Caption>List of APLs</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Name</Table.Head>
                        <Table.Head>Start Date</Table.Head>
                        <Table.Head>End Date</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each user.apl as apl}
                        <Table.Row>
                            <Table.Cell>{apl.name}</Table.Cell>
                            <Table.Cell>{apl.startDate}</Table.Cell>
                            <Table.Cell>{apl.endDate}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {/if} -->
    </div>

    <div class="space-y-2">
        <h2 class="text-xl">Groups</h2>
        {#if user.groups.length === 0}
            <p>No Groups</p>
        {:else}
            <Table.Root>
                <Table.Caption>List of Groups</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Header>Name</Table.Header>
                        <Table.Header>ID</Table.Header>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each user.groups as group}
                        <Table.Row>
                            <Table.Cell>{group.name}</Table.Cell>
                            <Table.Cell>{group.id}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {/if}
    </div>
</div>

<style lang="postcss">
    details[open] summary span {
        transform: rotate(180deg);
    }
</style>
