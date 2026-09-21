export function interpretateListName(name: string): string {
    switch (name) {
        case "READ":
            return "Прочитано"
        case "READING":
            return "Читаю"
        case "PENDING":
            return "Отложено"
        case "PLANNED":
            return "Запланировано"
        case "FAVORITE":
            return "Избранное"
        default:
            return name
    }
}