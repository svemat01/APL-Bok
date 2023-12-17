<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Dialog from '$lib/components/Dialog.svelte';
    import TextInput from '$lib/components/TextInput.svelte';

    export let isOpen = false;
</script>

<Dialog bind:isOpen>
    <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold">Add User</h1>
            <Button text="Close" on:click={() => (isOpen = false)} />
        </div>

        <div class="flex flex-col gap-2">
            <TextInput label="First Name" value="" />
            <TextInput label="Last Name" value="" />
            <TextInput label="Username" value="" />
            <TextInput label="Password" value="" />
        </div>

        <div class="flex justify-end">
            <Button text="Add User" />
        </div>
    </div>
</Dialog>
