const url = "http://localhost:7247/api/Task";

export async function fetchTasks() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        throw error;
    }
}

export async function addTask(text: string) {
    try {
        const response = await fetch(`${url}?text=${encodeURIComponent(text)}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        throw error;
    }
}

export async function updateTask(id: string, text: string) {
    try {
        const response = await fetch(`${url}/${id}?newText=${encodeURIComponent(text)}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        throw error;
    }
}

export async function toggleTask(id: string) {
    try {
        const response = await fetch(`${url}/${id}/toggle`, { method: "PUT" });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Ошибка при изменении статуса задачи:", error);
        throw error;
    }
}

export async function deleteTask(id: string) {
    try {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        throw error;
    }
}
