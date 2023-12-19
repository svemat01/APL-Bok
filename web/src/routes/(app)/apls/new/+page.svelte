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
            if (!form.valid) return;

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

<div class="p-3 space-y-4">
    <Form.Root controlled {form} schema={_newAplSchema} let:config>
        <Form.Field {config} name="name">
            <Form.Item>
                <Form.Label>Name</Form.Label>
                <Form.Input />
                <Form.Validation />
            </Form.Item>
        </Form.Field>

        <Form.Field {config} name="companyId">
            <Form.Item class="">
                <Form.Label>Company</Form.Label>
                <Form.Select>
                    <Form.SelectTrigger placeholder="Select a company" />
                    <Form.SelectContent class="h-64">
                        {#each data.companies as company}
                            <Form.SelectItem value={company.id}>{company.name}</Form.SelectItem>
                        {/each}
                    </Form.SelectContent>
                </Form.Select>
                <Form.Validation />
            </Form.Item>
        </Form.Field>

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
                                'pl-4 justify-start text-left font-normal space-x-2',
                                !value && 'text-muted-foreground',
                            )}
                        >
                            <span>
                                {#if value?.start && value?.end}
                                    <!-- {#if value.end}
                                        {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                                            value.end.toDate(getLocalTimeZone()),
                                        )}
                                    {:else}
                                        {df.format(value.start.toDate(getLocalTimeZone()))}
                                    {/if} -->
                                    {df.formatRange(
                                        value.start.toDate(getLocalTimeZone()),
                                        value.end.toDate(getLocalTimeZone()),
                                    )}
                                {:else}
                                    Pick a date
                                {/if}
                            </span>
                            <CalendarIcon class="w-4 h-4 ml-auto opacity-50" />
                        </Popover.Trigger>
                    </Form.Control>
                    <Popover.Content class="w-auto p-0" side="top">
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
