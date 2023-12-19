<script lang="ts">
    import Icon from '@iconify/svelte';

    import SidebarItem from './SidebarItem.svelte';

    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib';

    const logout = async () => {
        const result = await fetchApi('/api/logout', {
            method: 'POST',
        });

        if (result.status === 200) {
            await goto('/login');
        }
    };

    const routes: {
        href: string;
        icon: string;
        text: string;
    }[] = [
        {
            href: '/',
            icon: 'fa-solid:th-list',
            text: 'Dashboard',
        },
        {
            href: '/companies',
            icon: 'fa-solid:building',
            text: 'Företag',
        },
        {
            href: '/users',
            icon: 'fa-solid:users',
            text: 'Användare',
        },
        {
            href: '/apls',
            icon: 'fa-solid:calendar',
            text: 'APL',
        },
        {
            href: '/settings',
            icon: 'fa-solid:cog',
            text: 'Inställningar',
        },
    ];
</script>

<div class="sm:flex flex-col bg-neutral-900 text-neutral-200 p-4 min-w-[13%] hidden">
    <div class="flex flex-col">
        <div class="w-20 h-20 mx-auto">
            <!-- <TiPointOfInterest /> -->
            <Icon icon="typcn:point-of-interest" class="w-20 h-20 mx-auto" />
        </div>
        <h1 class="text-3xl font-medium text-center">APL-Bok</h1>
    </div>

    <div class="flex flex-col gap-3 mt-6">
        {#each routes as route}
            <SidebarItem {...route} />
        {/each}
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
