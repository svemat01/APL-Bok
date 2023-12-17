<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import { superForm, setMessage } from 'sveltekit-superforms/client';
    import type { PageData } from './$types.js';
    import { _newUserSchema } from './+page.js';
    import { fetchApi } from '$lib';
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: _newUserSchema,
        onUpdate: async ({ form }) => {
            const response = await fetchApi('/api/admin/users/', {
                method: 'POST',
                body: {
                    firstName: form.data.firstName,
                    lastName: form.data.lastName,
                    username: form.data.username,
                    password: form.data.password,
                    permissions: form.data.permissions,
                },
            });

            if (response.data) {
                setMessage(form, 'Account created successfully');
                await goto(`/users/${response.data.id}`);
            } else {
                switch (response.error.status) {
                    default:
                        setMessage(form, 'An unknown error occurred');
                        break;
                }
            }
        },
    });
</script>

<div class="p-2 space-y-4">
    {#if $message}<h3>{$message}</h3>{/if}
    <form
        class="flex flex-col items-center justify-center w-full max-w-md space-y-4"
        method="POST"
        use:enhance
    >
        <TextInput
            label="Username"
            bind:value={$form.username}
            errors={$errors.username}
            constraints={$constraints.username}
            aria-invalid={$errors.username ? 'true' : undefined}
        />

        <!-- first and last name -->
        <TextInput
            label="First Name"
            bind:value={$form.firstName}
            errors={$errors.firstName}
            constraints={$constraints.firstName}
            aria-invalid={$errors.firstName ? 'true' : undefined}
        />

        <TextInput
            label="Last Name"
            bind:value={$form.lastName}
            errors={$errors.lastName}
            constraints={$constraints.lastName}
            aria-invalid={$errors.lastName ? 'true' : undefined}
        />

        <!-- password and password confirm -->
        <TextInput
            label="Password"
            type="text"
            bind:value={$form.password}
            errors={$errors.password}
            constraints={$constraints.password}
            aria-invalid={$errors.password ? 'true' : undefined}
        />

        <Button text="Create Account" type="submit" />
    </form>
</div>
