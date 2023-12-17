<script lang="ts">
    export let title: string;
    export let value: string | number;

    let clazz = '';
    export { clazz as class };
</script>

<div class={'bg-neutral-100 flex flex-col gap-2 p-4 rounded-2xl ' + clazz}>
    <h1 class="text-xl font-normal">{title}</h1>
    <h2 class="text-5xl font-normal">{value}</h2>
</div>
