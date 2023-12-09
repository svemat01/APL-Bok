<script lang="ts">
  import TiPointOfInterest from "svelte-icons/ti/TiPointOfInterest.svelte";
  import TiThLarge from "svelte-icons/ti/TiThLarge.svelte";
  import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte'
</script>

<div class="flex flex-col bg-neutral-900 text-neutral-200 p-4 min-w-[15%]">
  <div class="flex flex-col">
    <div class="w-20 h-20 mx-auto">
      <TiPointOfInterest />
    </div>
    <h1 class="text-3xl font-medium text-center">APL-Bok</h1>
  </div>

  <div class="flex flex-col gap-2 mt-6">
    <!-- loop -->
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each { length: 3 } as _,i}
      <a
        href="/dashboard"
        class="flex items-center px-4 text-xl font-normal hover:bg-neutral-700"
      >
        <div class="w-8 h-8 mr-5"><TiThLarge /></div>
        Dashboard
      </a>
    {/each}
  </div>

  <div class="flex flex-col mt-auto">
    <!-- <a href="/logout" class="px-4 py-2 hover:bg-neutral-700">Logga ut</a> -->
    <a href="/logout">
        <div class="flex items-center px-4 hover:bg-neutral-700">
            <div class="w-6 h-6 mr-5"><FaSignOutAlt /></div>
            Logga ut
        </div>
    </a>
  </div>
</div>
