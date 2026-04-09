export const colors = {
    primary: '#404347',
    border: '#C9CFD4',
    white: '#FFFFFF',
    accent: '#2E67D1',
    disabled: '#62686E',
    red: '#ba4747',
    green: '#1B6C42',
    navy: '#1B2A4A',
    lightGray: '#f8f9fb',
    gray: '#6B7280',
    overlay: 'rgba(0,0,0,0.4)',
    black: '#000',
    background: '#F6E8DF'

};


export const fontFamilyTitle = {
    frauncesSemiBold: 'Fraunces_600SemiBold'
}

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
    titleLarge: 32,
    title: 24,
    paragraph: 18,
    paragraphBig: 20,
}

export const iconSizes = {
    small: 20,
    medium: 24,
    large: 48
}

export const textStyles = {
    displayHeader: {
        fontSize: textSizes.title,
        fontFamily: fontFamilyTitle.frauncesSemiBold

    },
    sectionHeader: {
        color: colors.primary,
        paddingBlock: spacing.md,
        fontSize: textSizes.paragraphBig,
        fontWeight: 'bold' as const,
    },
    paragraph: {
        fontSize: textSizes.paragraph,
        color: colors.primary,
    },
    error: {
        color: colors.red
    }
}

export const layoutStyles = {
    generalContainer: {
        padding: spacing.lg,
        flex: 1,
    },
    contentContainer: {
        flex: 1,

    } as const,
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.md
    } as const,

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as const,

    slotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,

    } as const,

    separator: {
        fontSize: 20,
        color: colors.border,
    } as const,

    link: {
        textDecorationLine: 'underline',
        color: colors.accent
    } as const,
}