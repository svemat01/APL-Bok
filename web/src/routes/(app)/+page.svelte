<script lang="ts">
    import { fetchApi } from '$lib';
    import SimpleCard from '$lib/components/SimpleCard.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import { assertApiResponse } from '$lib/util/apiHelpers.js';
    import { createQuery } from '@tanstack/svelte-query';

    const summaryQuery = createQuery({
        queryKey: ['summary'],
        queryFn: async () => {
            const { data, error } = await fetchApi('/api/admin/summary', {});

            assertApiResponse(error);

            return data;
        },
        // enabled: false,
    });
</script>

<div class="grid flex-1 grid-cols-4 grid-rows-4 gap-4 p-4">
    {#if $summaryQuery.isLoading}
        <!-- <SimpleCard title="Users" value={$summaryQuery.data.users} />
    <SimpleCard title="Posts" value={$summaryQuery.data.posts} />
    <SimpleCard title="Comments" value={$summaryQuery.data.comments} />
    <SimpleCard title="Categories" value={$summaryQuery.data.categories} /> -->
    {:else if $summaryQuery.isError}
        <p>{$summaryQuery.error.message}</p>
    {:else if $summaryQuery.isSuccess}
        <SimpleCard title="Users" value={$summaryQuery.data.users} />
        <SimpleCard title="Companies" value={$summaryQuery.data.companies} />
    {/if}

    <Spinner />
</div>
