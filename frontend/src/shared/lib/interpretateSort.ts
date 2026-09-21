export function interpretateSort(sort: string): string {
    switch(sort) {
        case "Популярные":
            return `&views_sort=desc`
        case "Не популярные":
            return `&views_sort=asc`
        case "Новые":
            return `&date_sort=desc`
        case "Старые":
            return `&date_sort=asc`
        case "С высоким рейтингом":
            return `&rating_sort=desc`
        case "С низким рейтингом":
            return `&rating_sort=asc`
        default:
            return ""
    }
}