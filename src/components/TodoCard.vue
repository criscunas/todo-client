<template>
    <div class="bg-white p-4 shadow-xl border border-transparent rounded-xl">
        <div class="flex items-center justify-between">
            <h1 class="text-gray-700 text-base font-semibold">Description</h1>
        </div>
        <p class="mt-2 text-gray-800 text-sm">{{description}}</p>

        <slot name="edit" />
    </div>
</template>

<script>

    export default {
        name: "TodoCard",

        props: {
            description: {
                type: String,
            },
            status: {
                type: String,
            }
        },
    }
</script>