<template>
    <div class="bg-neutral-800">
        <div class="p-4 min-h-screen max-w-5xl md:p-6 m-auto">

            <h1 class="text-gray-50 font-medium text-3xl underline underline-offset-4">Todo App for Trusty.care</h1>

            <div class="mt-12">
                <div class="flex flex-col max-w-xs mx-auto">
                    <label class="text-white text-lg font-semibold">Enter task description</label>
                    <textarea
                        v-model="values.description"
                        class="mt-4 p-2 border border-slate-300 max-w-xs max-h-44 rounded-lg"
                    />
                    <div class="flex justify-between my-4">
                        <div>
                           <p v-show="values.error" class="text-red-500">Required field</p>
                        </div>
                        <button @click="createTodo" class="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded">
                            Submit
                        </button>
                    </div>
                </div>

                <div class="mt-12">
                    <h1 class="text-3xl font-semibold text-gray-50 underline underline-offset-4 mb-8">My todos</h1>
                    <TodoSection
                        :finished="completed"
                        :inProgress="todos"
                        @delete-todo="deleteTodo"
                        @update-todo="updateTodo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import TodoSection from './components/TodoSection.vue';
    import { ref, onMounted } from 'vue';
    import { inject } from 'vue'

    const axios = inject('axios')

    const values = ref({
        description: '',
        error: false
    })

    let todos = ref([])
    let completed = ref([])


    const createTodo = () => {
        const {value} = values

        if (!value.description) {
            return value.error = true
        }

        else {
            value.error = false

            axios.post('/todo/create', {
                description: value.description
            }).then(({data}) => {
                console.log(data)
                todos.value = data.todos.filter((item) => item.is_completed === false)
                completed.value = data.todos.filter((item) => item.is_completed === true)

            }).catch((error) => {
                console.log(error)
            })

        }
    }

    const getTodos = () => {
        return axios.get('/todo/all').then(({data}) => {
            completed.value = data.payload.filter((item) => item.is_completed === true)
            todos.value = data.payload.filter((item) => item.is_completed === false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteTodo = ({id, status}) => {
        axios.delete(`/todo/delete/${id}`).then(() => {
            if (status === false) {
                todos.value = todos.value.filter(item => item.id !== id)
            }
            if(status === true) {
                completed.value = completed.value.filter(item => item.id !== id)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateTodo = ({id}) => {
        axios.put(`/todo/update/${id}`).then(() => {
            let updated = todos.value.find(item => item.id === id)
            updated.is_completed = true
            completed.value.push(updated)
            todos.value = todos.value.filter(item => item.id !== id)
        }).catch((error) => {
            console.log(error)
        })
    }

    onMounted(() => {
        getTodos()
    })

</script>


