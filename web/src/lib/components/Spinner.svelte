<script lang="ts">
    // export let color = '#FF3E00';
    // export let unit = 'rem';
    // export let duration = '0.75s';
    export let size = 32;
    export let radius = 3;
    export let pause = false;
</script>

<!-- <div class="w-full h-full border-4 border-blue-500 border-solid rounded-full aspect-square border-r-transparent animate-spin " /> -->

<!-- <svg
    class={`text-blue-500 animate-spin`}
    class:pause
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={size}
    height={size}
>
    <circle
        class={`opacity-25 ${variant === 'thin' ? 'stroke-thin' : ''}`}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
    ></circle>
    <path
        class={`opacity-75 ${variant === 'thin' ? 'stroke-thin' : ''}`}
        fill="currentColor"
        d={`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z`}
        stroke-width={`${variant === 'thin' ? '2' : '4'}`}
    ></path>
</svg> -->
<svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class:pause
    class="text-blue-400"
>
    <circle class="spinner_qM83" cx="4" cy="12" r={radius} />
    <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r={radius} />
    <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r={radius} />
</svg>

<!-- <svg
    width={size}
    height={size}
    stroke="#000"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
>
    <g class="spinner_V8m1" class:pause>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" class:pause></circle>
    </g>
</svg> -->

<style lang="postcss">
    circle {
        animation: spinner_8HQG 1.05s infinite;

        @apply drop-shadow fill-current;
    }
    circle:nth-child(2) {
        animation-delay: 0.1s;
    }
    circle:nth-child(3) {
        animation-delay: 0.2s;
    }
    @keyframes spinner_8HQG {
        0%,
        57.14% {
            animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
            transform: translate(0);
        }
        28.57% {
            animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
            transform: translateY(-6px);
        }
        100% {
            transform: translate(0);
        }
    }

    .pause > circle {
        animation-play-state: paused;
    }
</style>
