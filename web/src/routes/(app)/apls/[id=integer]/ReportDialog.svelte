<script lang="ts">
    import type { Report } from './+page.js';

    import * as Dialog from '$lib/components/ui/dialog';
    import { df, dfTime } from '$lib/utils/df.js';

    export let report: Report | undefined;

    export let open = false;
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger />
    <Dialog.Content>
        {#if report}
            <Dialog.Header>
                <!-- <Dialog.Title>Rapport för {df.format(report.date.toDate())}</Dialog.Title> -->
                <Dialog.Title>Rapport för {df.format(report.date)}</Dialog.Title>
            </Dialog.Header>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <span class="font-semibold">Betyg</span>
                    <span>{report.rating}/5</span>
                </div>

                <div class="flex flex-col gap-1">
                    <span class="font-semibold">Arbetspass</span>
                    <!-- <span>{dfTime.format(report.shiftStart)}-{dfTime.format(report.shiftEnd)}</span> -->
                    <span>
                        {dfTime.formatRange(report.shiftStart, report.shiftEnd)}
                    </span>
                </div>
            </div>
        {:else}
            <Dialog.Header>
                <Dialog.Title>Något gick fel...</Dialog.Title>
            </Dialog.Header>
        {/if}
    </Dialog.Content>
</Dialog.Root>
