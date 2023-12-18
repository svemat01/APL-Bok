<script lang="ts">
    import Icon from '@iconify/svelte';

    import SidebarItem from './SidebarItem.svelte';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';
    // import TiPointOfInterest from "svelte-icons/ti/TiPointOfInterest.svelte";
    // import TiThLarge from "svelte-icons/ti/TiThLarge.svelte";
    // import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte'

    const logout = async () => {
        const result = await fetchApi('/api/logout', {
            method: 'POST',
        });

        if (result.status === 200) {
            await goto('/login');
        }
    };
</script>

<div class="sm:flex flex-col bg-neutral-900 text-neutral-200 p-4 min-w-[15%] hidden">
    <div class="flex flex-col">
        <div class="w-20 h-20 mx-auto">
            <!-- <TiPointOfInterest /> -->
            <Icon icon="typcn:point-of-interest" class="w-20 h-20 mx-auto" />
        </div>
        <h1 class="text-3xl font-medium text-center">APL-Bok</h1>
    </div>

    <div class="flex flex-col gap-3 mt-6">
        <!-- Dashboard -->
        <SidebarItem icon="fa-solid:th-list" text="Dashboard" href="/" />
        <!-- Companies -->
        <SidebarItem icon="fa-solid:building" text="Företag" href="/companies" />
        <!-- Users -->
        <SidebarItem icon="fa-solid:users" text="Användare" href="/users" />
        <!-- APLs -->
        <SidebarItem icon="fa-solid:calendar" text="APL" href="/apls" />
        <!-- Settings -->
        <SidebarItem icon="fa-solid:cog" text="Inställningar" href="/settings" />
    </div>

    <div class="flex flex-col mt-auto">
        <button type="button" on:click={logout}>
            <div class="flex items-center px-4 hover:bg-neutral-700">
                <!-- <div class="w-6 h-6 mr-5"><FaSignOutAlt /></div> -->
                <Icon icon="fa:sign-out" class="w-6 h-6 mr-5" />
                Logga ut
            </div>
        </button>
    </div>
</div>
