<script lang="ts">
    import type { InputConstraint } from 'sveltekit-superforms';

    export let value: string;
    export let label: string | undefined = undefined;
    export let note: string | undefined = undefined;
    export let errors: string[] | undefined = undefined;
    export let constraints: InputConstraint | undefined = undefined;
</script>

<label class="flex flex-col w-full">
    {#if label}<span class="mb-1 text-sm">{label}</span>{/if}
    <input
        type="text"
        bind:value
        aria-invalid={errors ? 'true' : undefined}
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...constraints}
        {...$$restProps}
    />
    {#if note}<span class="mt-1 text-sm text-gray-500">{note}</span>{/if}
    {#if errors}<span class="text-sm text-red-500">{errors}</span>{/if}
</label>
