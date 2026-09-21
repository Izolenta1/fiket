export function formatAccessibility(cost_type: string): string {
    switch (cost_type) {
        case "FREE":
            return "Доступно бесплатно"
        case "SUBSCRIPTION":
            return "Доступно по подписке"
        case "PAID":
            return "Доступно платно"
        default:
            return "Ошибка доступа"
    }
}