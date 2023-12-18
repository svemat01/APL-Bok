<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import { superForm, setMessage } from 'sveltekit-superforms/client';
    import type { PageData } from './$types.js';
    import { _newAplSchema } from './+page.js';
    import { fetchApi } from '$lib';
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: _newAplSchema,
        onUpdate: async ({ form }) => {
            const response = await fetchApi('/api/admin/apls/', {
                method: 'POST',
                body: {
                    name: form.data.name,
                    companyId: form.data.companyId,
                    startDate: form.data.startDate.getTime(),
                    endDate: form.data.endDate.getTime(),
                },
            });

            if (response.data) {
                setMessage(form, 'APL created successfully');
                await goto(`/apls/${response.data.id}`);
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

        <select
            class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
            bind:value={$form.companyId}
            aria-invalid={$errors.companyId ? 'true' : undefined}
        >
            <option value="">Select a company</option>
            {#each data.companies as company}
                <option value={company.id}>{company.name}</option>
            {/each}
        </select>

        <Button text="Create Account" type="submit" />
    </form>
</div>
