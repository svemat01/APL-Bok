<script lang="ts">
    import * as Select from '$lib/components/ui/select';
    const array = Array.from({ length: 40 });
</script>

<Select.Root>
    <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="Select an option" />
    </Select.Trigger>
    <Select.Content class="max-h-[60rem]">
        <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {#each array as option}
                <Select.Item value={option}>{option}</Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
    <Select.Input name="optionSelect" />
</Select.Root>
