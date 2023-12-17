<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { user } = data;
    //     {
    //     id: number;
    //     username: string;
    //     firstName: string;
    //     lastName: string;
    //     permissions: string;
    // } | null
</script>

<div class="flex items-center justify-center p-2">
    {#if user}
        <div class="p-6 bg-white rounded-lg shadow-lg">
            <h1 class="mb-4 text-2xl font-bold">User Details</h1>
            <p><span class="font-bold">ID:</span> {user.id}</p>
            <p><span class="font-bold">Username:</span> {user.username}</p>
            <p><span class="font-bold">First Name:</span> {user.firstName}</p>
            <p><span class="font-bold">Last Name:</span> {user.lastName}</p>
            <p><span class="font-bold">Permissions:</span> {user.permissions}</p>
        </div>
    {:else}
        <p>No user data available.</p>
    {/if}
</div>
