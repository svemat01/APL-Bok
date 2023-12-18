<script lang="ts">
    import type { PageData } from './$types';

    import * as Table from '$lib/components/ui/table';

    export let data: PageData;

    const { user, permissions } = data;
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

    <div class="space-y-2">
        <h2 class="text-xl">APLs</h2>
        {#if user.apl.length === 0}
            <p>No APLs</p>
        {:else}
            <Table.Root>
                <Table.Caption>List of APLs</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Header>Name</Table.Header>
                        <Table.Header>Start Date</Table.Header>
                        <Table.Header>End Date</Table.Header>
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
        {/if}
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
