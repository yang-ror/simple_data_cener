import { getTodos, getTodoById, addNewTodo, updateTodo, deleteTodo } from '../controllers/todoController'

const routes = (app) => {
    app.route('/todo')
        .get(getTodos)
        .post(addNewTodo)
    
    app.route('/todo/:todoId')
        .get(getTodoById)
        .put(updateTodo)
        .delete(deleteTodo)
}

export default routes;