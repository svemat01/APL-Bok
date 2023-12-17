<script lang="ts">
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte';
    import type { User } from './+page.js';

    export let user: User;
</script>

<div class="flex gap-2">
    <Button text="Edit" on:click={() => goto(`/users/${user.id}`)} />
</div>
