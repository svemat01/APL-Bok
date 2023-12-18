<script lang="ts">
    import Icon from '@iconify/svelte';

    import { page } from '$app/stores';

    export let icon: string;
    export let text: string;
    export let href: string;
</script>

<a
    {href}
    class="flex items-center px-4 text-xl font-normal hover:bg-neutral-700"
    class:active={href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href)}
>
    <Icon {icon} class="w-6 h-6 mr-5" />
    {text}
</a>

<style lang="postcss">
    a.active {
        @apply text-blue-300;
    }
</style>
