<script lang="ts">
    export let text = 'Button';
    export let href = '';
    export let variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
    export let size: 'small' | 'medium' | 'large' = 'small';
</script>

<a
    class="
        px-4 py-2 font-bold text-white
        {variant === 'primary' && 'bg-blue-500 hover:bg-blue-700'}
        {variant === 'secondary' && 'bg-gray-500 hover:bg-gray-700'}
        {variant === 'success' && 'bg-green-500 hover:bg-green-700'}
        {variant === 'danger' && 'bg-red-500 hover:bg-red-700'}
        {size === 'small' && 'text-sm'}
        {size === 'medium' && 'text-base'}
        {size === 'large' && 'text-lg'}
        rounded
    "
    {href}
>
    {text}
</a>
