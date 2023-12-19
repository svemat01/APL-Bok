<script lang="ts">
    import { superForm, setError, setMessage } from 'sveltekit-superforms/client';

    import type { PageData } from './$types.js';
    import { _setupSchema } from './+page.js';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';
    import TextInput from '$lib/components/TextInput.svelte';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(data.form, {
        SPA: true,
        validators: _setupSchema,
        onUpdate: async ({ form }) => {
            if (form.data.password !== form.data.confirmPassword) {
                setError(form, 'password', 'Passwords do not match');
                setError(form, 'confirmPassword', 'Passwords do not match');

                return;
            }

            if (!form.valid) return;

            const response = await fetchApi('/api/setup', {
                method: 'POST',
                body: {
                    firstName: form.data.firstName,
                    lastName: form.data.lastName,
                    username: form.data.username,
                    password: form.data.password,
                    setupPassword: form.data.setupPassword,
                },
            });

            if (response.data) {
                setMessage(form, 'Account created successfully');
            } else {
                switch (response.error.status) {
                    case 400:
                        setError(form, 'setupPassword', 'Invalid setup password');
                        break;
                    case 412:
                        setError(form, 'setupPassword', 'Setup is already done');
                        setTimeout(() => {
                            void goto('/login');
                        }, 2000);
                        break;

                    default:
                        setMessage(form, 'An unknown error occurred');
                        break;
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

        <TextInput
            label="Confirm Password"
            type="password"
            bind:value={$form.confirmPassword}
            errors={$errors.confirmPassword}
            constraints={$constraints.confirmPassword}
            aria-invalid={$errors.confirmPassword ? 'true' : undefined}
        />

        <!-- Setup Password, this can be found in the console out of APL-Bok -->
        <TextInput
            label="Setup Password"
            note="This password can be found in the console out of APL-Bok"
            bind:value={$form.setupPassword}
            errors={$errors.setupPassword}
            constraints={$constraints.setupPassword}
            aria-invalid={$errors.setupPassword ? 'true' : undefined}
        />

        <button
            type="submit"
            class="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Submit
        </button>
    </form>
</div>
