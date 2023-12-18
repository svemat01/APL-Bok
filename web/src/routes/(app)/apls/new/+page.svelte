<script lang="ts">
    import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date';
    import type { DateRange } from 'bits-ui';
    import { CalendarIcon } from 'lucide-svelte';
    import { setMessage, superForm } from 'sveltekit-superforms/client';

    import type { PageData } from './$types.js';
    import { _newAplSchema } from './+page.js';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';
    import { buttonVariants } from '$lib/components/ui/button';
    import * as Form from '$lib/components/ui/form';
    import * as Popover from '$lib/components/ui/popover';
    import { RangeCalendar } from '$lib/components/ui/range-calendar';
    import { cn } from '$lib/utils/index.js';

    export let data: PageData;

    // const options: FormOptions<typeof _newAplSchema> = ;

    const form = superForm(data.form, {
        SPA: true,
        validators: _newAplSchema,
        onUpdate: async ({ form }) => {
            const [startRaw, endRaw] = form.data.date.split(',');
            const startDate = new Date(startRaw).getTime();
            const endDate = new Date(endRaw).getTime();

            const response = await fetchApi('/api/admin/apls/', {
                method: 'POST',
                body: {
                    name: form.data.name,
                    companyId: form.data.companyId,
                    startDate,
                    endDate,
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

    const { form: formStore } = form;

    const df = new DateFormatter('en-US', {
        dateStyle: 'long',
    });

    let value: DateRange | undefined = $formStore.date
        ? {
              start: parseDate($formStore.date.split(',')[0]),
              end: parseDate($formStore.date.split(',')[1]),
          }
        : undefined;
</script>

<div class="p-2 space-y-4">
    <!-- {#if $message}<h3>{$message}</h3>{/if}
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
    </form> -->

    <Form.Root controlled {form} schema={_newAplSchema} let:config>
        <Form.Field {config} name="name">
            <Form.Item>
                <Form.Label>Name</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="companyId">
            <Form.Item>
                <Form.Label>Company</Form.Label>
                <!-- <select
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    bind:value={$form.companyId}
                    aria-invalid={$errors.companyId ? 'true' : undefined}
                >
                    <option value="">Select a company</option>
                    {#each data.companies as company}
                        <option value={company.id}>{company.name}</option>
                    {/each}
                </select> -->
                <Form.Select>
                    <Form.SelectTrigger placeholder="Select a company" />
                    <Form.SelectContent>
                        {#each data.companies as company}
                            <Form.SelectItem value={company.id}>{company.name}</Form.SelectItem>
                        {/each}
                    </Form.SelectContent>
                </Form.Select>
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <!-- <Form.Field {config} name="startDate">
            <Form.Item>
                <Form.Label>Start Date</Form.Label>
                <Form.Input type="date" />
                <Form.Validation />
            </Form.Item>
        </Form.Field> -->

        <Form.Field {config} name="date">
            <Form.Item>
                <Form.Label>End Date</Form.Label>
                <Popover.Root>
                    <Form.Control id="dob" let:attrs>
                        <Popover.Trigger
                            id="dob"
                            {...attrs}
                            class={cn(
                                buttonVariants({ variant: 'outline' }),
                                'w-[280px] pl-4 justify-start text-left font-normal',
                                !value && 'text-muted-foreground',
                            )}
                        >
                            {#if value && value.start}
                                {#if value.end}
                                    {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                                        value.end.toDate(getLocalTimeZone()),
                                    )}
                                {:else}
                                    {df.format(value.start.toDate(getLocalTimeZone()))}
                                {/if}
                            {:else}
                                Pick a date
                            {/if}
                            <CalendarIcon class="w-4 h-4 ml-auto opacity-50" />
                        </Popover.Trigger>
                    </Form.Control>
                    <Popover.Content class="w-auto p-0" side="top">
                        <!-- <Calendar
                            bind:value
                            bind:placeholder
                            minValue={new CalendarDate(1900, 1, 1)}
                            maxValue={today(getLocalTimeZone())}
                            calendarLabel="Date of birth"
                            initialFocus
                            onValueChange={(v) => {
                                if (v) {
                                    $formStore.dob = v.toString();
                                } else {
                                    $formStore.dob = '';
                                }
                            }}
                        /> -->
                        <RangeCalendar
                            bind:value
                            initialFocus
                            numberOfMonths={2}
                            placeholder={value?.start}
                            onValueChange={(v) => {
                                if (v.start && v.end) {
                                    $formStore.date = `${v.start.toString()},${v.end.toString()}`;
                                } else {
                                    $formStore.date = '';
                                }
                            }}
                        />
                    </Popover.Content>
                </Popover.Root>
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Button>Create APL</Form.Button>
    </Form.Root>
</div>
