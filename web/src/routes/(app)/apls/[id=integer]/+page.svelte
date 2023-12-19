<script lang="ts">
    import Icon from '@iconify/svelte';
    import { parseAbsoluteToLocal } from '@internationalized/date';
    import { createColumnHelper, getCoreRowModel } from '@tanstack/svelte-table';
    import type { TableOptions } from '@tanstack/svelte-table';
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';

    import type { PageData } from './$types';
    import type { Report } from './+page.js';
    import ReportDialog from './ReportDialog.svelte';

    import TTable from '$lib/components/TTable.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
    import { df } from '$lib/utils/df.js';

    export let data: PageData;

    const { apl } = data;

    const startTime = parseAbsoluteToLocal(apl.startDate);
    const endTime = parseAbsoluteToLocal(apl.endDate);

    const now = new Date();

    const before = new Date();
    before.setHours(before.getHours() - 2);

    const reports = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        date: now,
        rating: 5,
        shiftEnd: now,
        shiftStart: before,
    }));

    const reportColumnHelper = createColumnHelper<Report>();

    const reportsTableOptions: Writable<TableOptions<Report>> = writable({
        data: reports,
        columns: [
            reportColumnHelper.accessor('date', {
                header: 'Date',
                cell: (props) => df.format(props.getValue()),
            }),
            reportColumnHelper.accessor('rating', {
                header: 'Rating',
                cell: (props) => `${props.getValue()}/5`,
            }),
            reportColumnHelper.display({
                header: 'Shift',
                cell: (props) =>
                    df.formatRange(props.row.original.shiftStart, props.row.original.shiftEnd),
            }),
        ],
        getCoreRowModel: getCoreRowModel(),
    });

    let report: Report | undefined;
    let open = false;
</script>

<ReportDialog {report} bind:open />

<div class="flex flex-col h-full gap-3 p-3 md:flex-row bg-neutral-100">
    <div class="flex flex-col gap-3">
        <Card.Root>
            <Card.Header>
                <Card.Title>APL</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="flex items-center gap-2">
                    <!-- name -->
                    <Icon icon="fa-solid:th-list" class="w-5 h-5" />
                    <p class="text-lg font-medium">{apl.name}</p>
                </div>
                <div class="flex items-center gap-2">
                    <Icon icon="fa-solid:building" class="w-5 h-5" />
                    <p class="text-lg">{apl.company.name}</p>
                </div>
                <div class="flex items-center gap-2">
                    <Icon icon="fa-solid:user" class="w-5 h-5" />
                    <p class="text-lg">{apl.user.firstName} {apl.user.lastName}</p>
                </div>
                <div class="flex items-center gap-2">
                    <Icon icon="fa-solid:calendar" class="w-5 h-5" />
                    <p class="text-lg">{df.formatRange(startTime.toDate(), endTime.toDate())}</p>
                </div>
            </Card.Content>
        </Card.Root>

        <Card.Root>
            <Card.Header>
                <Card.Title>Status</Card.Title>
            </Card.Header>
            <Card.Content>
                <!-- Should show reports count, the current status aka upcoming current past, how many days it spans -->
                <div class="flex items-center gap-2">
                    <Icon icon="fa-solid:chart-bar" class="w-5 h-5" />
                    <p class="text-lg">
                        {apl.report.length} rapporter
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <Icon icon="fa-solid:calendar" class="w-5 h-5" />
                    <p class="text-lg">
                        {now < startTime.toDate()
                            ? 'Kommande'
                            : now > endTime.toDate()
                              ? 'Avslutad'
                              : 'Pågående'}
                    </p>
                </div>
            </Card.Content>
        </Card.Root>
    </div>

    <Card.Root class="flex-1">
        <Card.Header>
            <Card.Title>Rapporter</Card.Title>
        </Card.Header>
        <Card.Content>
            <!-- <ReportsTable {reports} aplId={apl.id} /> -->
            <TTable
                options={reportsTableOptions}
                caption="All Reports"
                onRowClick={(row) => {
                    report = row.original;
                    open = true;
                }}
            />
        </Card.Content>
    </Card.Root>
</div>
