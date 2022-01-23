interface toDo {
    body: string
    id: number
    title: string
    userId: number
}

export function getTodosByCount(count) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=${count}`)
        .then<toDo[]>(response => response.json())
        .then(toDo => {
            if (count > 100) {
                console.warn('max count 100')
            }
            return toDo

        })
}

