<script lang="ts">
    import type { PageData } from './$types';

    import * as Table from '$lib/components/ui/table';

    export let data: PageData;

    const { company } = data;
</script>

<div class="p-2 space-y-3">
    <h1 class="text-2xl">{company.name} ({company.location})</h1>

    <div class="space-y-2">
        <h2 class="text-xl">APLs</h2>
        {#if company.apl.length === 0}
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
                    {#each company.apl as apl}
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
        <h2 class="text-xl">Mentors</h2>
        {#if company.mentor.length === 0}
            <p>No Mentors</p>
        {:else}
            <Table.Root>
                <Table.Caption>List of Mentors</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Header>Name</Table.Header>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each company.mentor as mentor}
                        <Table.Row>
                            <Table.Cell>{mentor.name}</Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {/if}
    </div>
</div>
