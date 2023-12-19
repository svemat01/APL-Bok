<script lang="ts">
    export let title: string;
    export let value: string | number;
    import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="p-6">
    <h1 class="text-xl font-normal">{title}</h1>
    <h2 class="text-5xl font-normal">{value}</h2>
</Card.Root>
