<script lang="ts">
    import type { PageData } from './$types';

    import TBodyCell from '$lib/components/Table/TBodyCell.svelte';
    import TBodyRow from '$lib/components/Table/TBodyRow.svelte';
    import THead from '$lib/components/Table/THead.svelte';
    import THeadRow from '$lib/components/Table/THeadRow.svelte';
    import THeaderCell from '$lib/components/Table/THeaderCell.svelte';
    import Table from '$lib/components/Table/Table.svelte';

    export let data: PageData;

    const { company } = data;
    // {
    //     id: number;
    //     location: string;
    //     name: string;
    //     apl: {
    //         id: number;
    //         name: string;
    //         startDate: string;
    //         endDate: string;
    //     }[];
    //     mentor: {
    //         id: number;
    //         name: string;
    //     }[];
    // }
</script>

<div class="p-2 space-y-3">
    <h1 class="text-2xl">{company.name} ({company.location})</h1>

    <div class="space-y-2">
        <h2 class="text-xl">APLs</h2>
        {#if company.apl.length === 0}
            <p>No APLs</p>
        {:else}
            <Table>
                <THead>
                    <THeadRow>
                        <THeaderCell>Name</THeaderCell>
                        <THeaderCell>Start Date</THeaderCell>
                        <THeaderCell>End Date</THeaderCell>
                    </THeadRow>
                </THead>
                {#each company.apl as apl}
                    <TBodyRow>
                        <TBodyCell>{apl.name}</TBodyCell>
                        <TBodyCell>{apl.startDate}</TBodyCell>
                        <TBodyCell>{apl.endDate}</TBodyCell>
                    </TBodyRow>
                {/each}
            </Table>
        {/if}
    </div>

    <div class="space-y-2">
        <h2 class="text-xl">Mentors</h2>
        {#if company.mentor.length === 0}
            <p>No Mentors</p>
        {:else}
            <Table>
                <THead>
                    <THeadRow>
                        <THeaderCell>Name</THeaderCell>
                    </THeadRow>
                </THead>
                {#each company.mentor as mentor}
                    <TBodyRow>
                        <TBodyCell>{mentor.name}</TBodyCell>
                    </TBodyRow>
                {/each}
            </Table>
        {/if}
    </div>
</div>

<style lang="postcss">
    details[open] summary span {
        transform: rotate(180deg);
    }
</style>
