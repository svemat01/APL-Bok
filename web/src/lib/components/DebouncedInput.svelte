<script lang="ts">
    import type { FormEventHandler } from 'svelte/elements';

    export let value = '';
    export let delay = 500;

    let timer: NodeJS.Timeout;

    const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
        clearTimeout(timer);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const tempValue = event.currentTarget?.value;

        timer = setTimeout(() => {
            value = tempValue;
        }, delay);
    };
</script>

<input
    type="text"
    {value}
    on:input={handleChange}
    class="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
