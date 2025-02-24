import TodoList from "./components/Todo/TodoList.tsx";
import ErrorWrapper from "./components/ErrorWrapper/ErrorWrapper.tsx";

function App(){
    return (
        <ErrorWrapper>
            <TodoList />
        </ErrorWrapper>
    );
}

export default App;