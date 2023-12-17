<script>
    export let isOpen = false;
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800 bg-opacity-90">
    <div
        class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        class:mobileFullScreen={!isOpen}
    >
        <slot />
    </div>
</div>

<style>
    .mobileFullScreen {
        @media (max-width: 640px) {
            height: 95vh;
            width: 95vw;
        }
        @media (min-width: 641px) {
            height: auto;
            width: auto;
        }
    }
</style>
