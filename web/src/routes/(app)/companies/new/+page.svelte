<script lang="ts">
    import type { FormOptions } from 'formsnap';
    import { setMessage } from 'sveltekit-superforms/client';

    import type { PageData } from './$types.js';
    import { _newCompanySchema } from './+page.js';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';
    import * as Form from '$lib/components/ui/form';

    export let data: PageData;

    const options: FormOptions<typeof _newCompanySchema> = {
        SPA: true,
        validators: _newCompanySchema,
        onUpdate: async ({ form }) => {
            if (!form.valid) return;

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
    };
</script>

<div class="p-2 space-y-4">
    <Form.Root {options} form={data.form} schema={_newCompanySchema} let:config>
        <Form.Field {config} name="name">
            <Form.Item>
                <Form.Label>Name</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="location">
            <Form.Item>
                <Form.Label>Location</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Button>Create Company</Form.Button>
    </Form.Root>
</div>
