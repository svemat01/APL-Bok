<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import { superForm, setMessage } from 'sveltekit-superforms/client';
    import type { PageData } from './$types.js';
    import { _newCompanySchema } from './+page.js';
    import { fetchApi } from '$lib';
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: _newCompanySchema,
        onUpdate: async ({ form }) => {
            const response = await fetchApi('/api/admin/companies/', {
                method: 'POST',
                body: {
                    name: form.data.name,
                    location: form.data.location,
                },
            });

            if (response.data) {
                setMessage(form, 'Account created successfully');
                await goto(`/companies/${response.data.id}`);
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
            label="Name"
            bind:value={$form.name}
            errors={$errors.name}
            constraints={$constraints.name}
            aria-invalid={$errors.name ? 'true' : undefined}
        />

        <!-- Location -->
        <TextInput
            label="Location"
            bind:value={$form.location}
            errors={$errors.location}
            constraints={$constraints.location}
            aria-invalid={$errors.location ? 'true' : undefined}
        />

        <Button text="Create Company" type="submit" />
    </form>
</div>
