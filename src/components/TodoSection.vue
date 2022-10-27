<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6 md:pr-4">
            <p class="text-white text-lg font-semibold">In progress</p>
            <div v-if="!inProgress.length" class="mt-4 text-indigo-400 font-semibold">No todos created.</div>
            <div v-if="inProgress" class="mt-4 flex flex-col gap-4">
                <TodoCard v-for="todo in inProgress" :key="todo.id" :description="todo.description">
                    <template #edit>
                        <div class="flex justify-end gap-2 mt-4">
                            <button @click="deleteTodo(todo.id, todo.is_completed)" class="bg-red-500 hover:bg-red-600 rounded px-2 py-1 text-white text-xs">
                                Delete
                            </button>
                            <button @click="updateTodo(todo.id)" class="bg-emerald-500 hover:bg-emerald-600 rounded px-2 py-1 text-white text-xs">
                                Mark Completed
                            </button>
                        </div>
                    </template>
                </TodoCard>
            </div>
        </div>
        <div class="col-span-12 mt-16 md:mt-0 md:col-span-6 md:pl-4">
            <p class="text-white text-lg font-semibold">Finished</p>
            <div v-if="inProgress" class="mt-4 flex flex-col gap-4">
                <TodoCard v-for="todo in finished" :key="todo.id" :description="todo.description">
                    <template #edit>
                        <div class="flex justify-end mt-4">
                            <button @click="deleteTodo(todo.id, todo.is_completed)" class="bg-red-500 hover:bg-red-600 rounded px-2 py-1 text-white text-xs">
                                Remove
                            </button>
                        </div>
                    </template>
                </TodoCard>
            </div>
        </div>
    </div>
</template>

<script setup>

    import TodoCard from './TodoCard.vue';

    defineProps({
        inProgress: Object,
        finished: Object,
    })

    const emit = defineEmits([
        'delete-todo',
        'update-todo'
    ])

    const deleteTodo = (id, status) => {
        emit('delete-todo', {
            id: id,
            status: status
        })
    }

    const updateTodo = (id) => {
        emit('update-todo', {
            id: id
        })
    }

</script>