const ScrollRestoration = () => {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }
                `,
            }}
        />
    )
}

export { ScrollRestoration }