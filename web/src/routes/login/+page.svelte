<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import { superForm, setError, setMessage } from 'sveltekit-superforms/client';
    import type { PageData } from './$types.js';
    import { _setupSchema } from './+page.js';
    import { fetchApi } from '$lib';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: _setupSchema,
        onUpdate: async ({ form }) => {
            const response = await fetchApi('/api/login', {
                method: 'POST',
                body: {
                    username: form.data.username,
                    password: form.data.password,
                },
                credentials: 'include',
            });

            if (response.data) {
                setMessage(form, 'Success! Redirecting...');
                console.log('response.data', response.data);

                const redirect = $page.url.searchParams.get('redirect') ?? '/';
                if (
                    redirect.startsWith('/') &&
                    !redirect.startsWith('//') &&
                    !redirect.slice(1).includes(':')
                ) {
                    await goto(redirect);
                } else {
                    await goto('/');
                }
            } else {
                const {
                    // status,
                    value: { message },
                } = response.error;

                if (message === 'Invalid username or password') {
                    setError(form, 'username', message);
                    setError(form, 'password', message);
                } else {
                    setMessage(form, `Error: ${message}`);
                }
            }
        },
    });
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold text-gray-900">Welcome to APL-Bok</h1>
    {#if $message}<h3>{$message}</h3>{/if}
    <form
        class="flex flex-col items-center justify-center w-full max-w-md mt-4 space-y-4"
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

        <!-- password and password confirm -->
        <TextInput
            label="Password"
            type="password"
            bind:value={$form.password}
            errors={$errors.password}
            constraints={$constraints.password}
            aria-invalid={$errors.password ? 'true' : undefined}
        />

        <button
            type="submit"
            class="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Login
        </button>
    </form>
</div>
