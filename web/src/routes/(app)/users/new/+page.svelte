<script lang="ts">
    import type { FormOptions } from 'formsnap';
    import { setMessage } from 'sveltekit-superforms/client';

    import type { PageData } from './$types.js';
    import { _newUserSchema } from './+page.js';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';
    import * as Form from '$lib/components/ui/form';

    export let data: PageData;

    // const { form, errors, message, constraints, enhance } = superForm(data.form, );
    const options: FormOptions<typeof _newUserSchema> = {
        SPA: true,
        validators: _newUserSchema,
        onUpdate: async ({ form }) => {
            if (!form.valid) return;

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
    };
</script>

<div class="p-2 space-y-4">
    <Form.Root {options} form={data.form} schema={_newUserSchema} let:config>
        <Form.Field {config} name="username">
            <Form.Item>
                <Form.Label>Username</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="firstName">
            <Form.Item>
                <Form.Label>First Name</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="lastName">
            <Form.Item>
                <Form.Label>Last Name</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="password">
            <Form.Item>
                <Form.Label>Password</Form.Label>
                <Form.Input type="password" />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Button>Create User</Form.Button>
    </Form.Root>
</div>
