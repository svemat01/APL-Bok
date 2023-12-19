<script lang="ts">
    import Icon from '@iconify/svelte';

    import { page } from '$app/stores';

    export let icon: string;
    export let text: string;
    export let href: string;
</script>

<a
    {href}
    class="flex items-center px-4 py-3 text-xl font-normal transition-colors rounded-xl"
    class:active={href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href)}
>
    <Icon {icon} class="w-6 h-6 mr-5" />
    {text}
</a>

<style lang="postcss">
    a.active {
        @apply bg-accent-foreground text-primary;
    }
</style>
