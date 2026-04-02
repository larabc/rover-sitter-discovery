export const colors = {
    primary: '#404347',
    border: '#C9CFD4',
    white: '#FFFFFF',
    accent: '#2e67d1',
    disabled: '#62686E'
};

export const spacing = {
    sm: 8,
    md: 12,
    lg: 16,
};

export const borderRadius = {
    pill: 24,
    card: 8,
};

export const textSizes = {
    title: 24,
    paragraph: 16,
}

export const textStyles = {
    displayHeader: {
        fontSize: textSizes.title,
        fontWeight: 'bold' as const,
    },
    sectionHeader: {
        color: colors.primary,
        fontWeight: 'bold' as const,
    },
    paragraph: {
        fontSize: textSizes.paragraph,
        color: colors.primary,
    },
}

export const layoutStyles = {
    generalContainer: {
        padding: spacing.lg,
        flex: 1,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as const,
}