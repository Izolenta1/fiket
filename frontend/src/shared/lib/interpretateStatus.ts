export function interpretateStatus(status: string): string {
    switch (status) {
        case "COMPLETED":
            return "Завершен"
        case "IN_PROGRESS":
            return "Выходит"
        case "EXCEPTED":
            return "Приостановлен"
        default:
            return "Ошибка интерпретации"
    }
}