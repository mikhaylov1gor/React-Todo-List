const url = "http://localhost:7247/api/Task";

export async function fetchTasks(){
    const response = await fetch(url,{
        method: "GET",
        headers: {
            'Accept': 'text/plain',
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function addTask(text: string){
    try {
        const response = await fetch(`${url}?text=${encodeURIComponent(text)}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
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
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        throw error;
    }
}

export async function toggleTask(id: string) {
    await fetch(`${url}/${id}/toggle`, { method: "PUT" });
}

export async function deleteTask(id: string) {
    await fetch(`${url}/${id}`, { method: "DELETE" });
}