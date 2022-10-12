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
                           <p v-show="formError" class="text-red-500">Required field</p>
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
                        @delete-todo="onDeleteTodo"
                        @update-todo="onUpdateTodo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TodoSection from '@/components/TodoSection.vue'

export default {

    components : {
        TodoSection,
    },

    data() {
        return {
            todos: [],
            completed: [],

            values: {
                description: '',
            },

            formError: false,
        }
    },

    created() {
        this.getTodos()
    },

    methods: {
        getTodos() {
            this.$axios.get('/todo/all').then(({data}) => {
                this.todos = data.payload.filter((item) => item.is_completed === false)
                this.completed = data.payload.filter((item) => item.is_completed === true)
            }).catch((error) => {
                console.log(error)
            })
        },
        createTodo() {
            if (!this.values.description) {
                this.formError = true
            }

            else {
                this.formError = false

                this.$axios.post('/todo/create', {
                    description: this.values.description
                }).then(({data}) => {
                    this.todos = data.todos.filter((item) => item.is_completed === false)
                    this.values.description = ''
                }).catch((error) => {
                    console.log(error)
                })
            }
        },

        onDeleteTodo({id, status}) {
            this.$axios.delete(`/todo/delete/${id}`).then(() => {
                if (status === false) {
                    this.todos = this.todos.filter(item => item.id !== id)
                }
                if(status === true) {
                    this.completed = this.completed.filter(item => item.id !== id)
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        onUpdateTodo({id}) {
            this.$axios.put(`/todo/update/${id}`).then(() => {
                let updated = this.todos.find(item => item.id === id)
                updated.is_completed = true
                this.completed.push(updated)
                this.todos = this.todos.filter(item => item.id !== id)
            }).catch((error) => {
                console.log(error)
            })
        }
    }


}
</script>

