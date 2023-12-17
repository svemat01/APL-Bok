<script lang="ts">
    import { page } from '$app/stores';
    import type { CurrentUser } from '$lib/types/user.js';

    export let currentUser: CurrentUser;
</script>

<div class="flex justify-between px-5 py-4 bg-neutral-50">
    <span class="text-xl font-medium">
        {$page.data.title}
    </span>

    <!-- profile icon -->
    <div class="flex items-center">
        <div class="flex flex-col items-end mr-2">
            <span class="text-lg font-medium text-gray-800">
                {currentUser.firstName}
                {currentUser.lastName}
            </span>
            <span class="text-base font-medium text-gray-500"> </span>
        </div>
    </div>
</div>
