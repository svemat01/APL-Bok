<script lang="ts">
    import TBodyCell from '$lib/components/Table/TBodyCell.svelte';
    import TBodyRow from '$lib/components/Table/TBodyRow.svelte';
    import THead from '$lib/components/Table/THead.svelte';
    import THeadRow from '$lib/components/Table/THeadRow.svelte';
    import THeaderCell from '$lib/components/Table/THeaderCell.svelte';
    import Table from '$lib/components/Table/Table.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { user, permissions } = data;
    // {
    //     id: number;
    //     username: string;
    //     firstName: string;
    //     lastName: string;
    //     apl: {
    //         name: string;
    //         id: number;
    //         startDate: number;
    //         endDate: number;
    //     }[];
    //     permissions: string;
    //     groups: {
    //         name: string;
    //         id: number;
    //     }[];
    // }
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
            <Table>
                <THead>
                    <THeadRow>
                        <THeaderCell>Name</THeaderCell>
                        <THeaderCell>ID</THeaderCell>
                        <THeaderCell>Start Date</THeaderCell>
                        <THeaderCell>End Date</THeaderCell>
                    </THeadRow>
                </THead>
                <tbody>
                    {#each user.apl as apl}
                        <TBodyRow>
                            <TBodyCell>{apl.name}</TBodyCell>
                            <TBodyCell>{apl.id}</TBodyCell>
                            <TBodyCell>{apl.startDate}</TBodyCell>
                            <TBodyCell>{apl.endDate}</TBodyCell>
                        </TBodyRow>
                    {/each}
                </tbody>
            </Table>
        {/if}
    </div>

    <div class="space-y-2">
        <h2 class="text-xl">Groups</h2>
        {#if user.groups.length === 0}
            <p>No Groups</p>
        {:else}
            <Table>
                <THead>
                    <THeadRow>
                        <THeaderCell>Name</THeaderCell>
                        <THeaderCell>ID</THeaderCell>
                    </THeadRow>
                </THead>
                <tbody>
                    {#each user.groups as group}
                        <tr>
                            <td>{group.name}</td>
                            <td>{group.id}</td>
                        </tr>
                    {/each}

                    <TBodyRow>
                        <TBodyCell>Yeet</TBodyCell>
                        <TBodyCell>Yeet</TBodyCell>
                    </TBodyRow>
                </tbody>
            </Table>
        {/if}
    </div>
</div>

<style lang="postcss">
    details[open] summary span {
        transform: rotate(180deg);
    }
</style>
