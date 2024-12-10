import chroma from 'chroma-js'

interface ColorPalette {
    [key: string]: string
}

export function generateTailwindPalette(hexColor: string): ColorPalette {
    const base = chroma(hexColor)
    const isLight = base.luminance() > 0.5

    // Helper function to ensure colors don't go to pure white or black
    const clampColor = (color: chroma.Color): chroma.Color => {
        const rgb = color.rgb()
        return chroma(rgb.map((v) => Math.max(5, Math.min(250, v))))
    }

    const generateShade = (lightness: number): string => {
        let color: chroma.Color
        if (isLight) {
            color = base.set('hsl.l', lightness / 100)
        } else {
            color = chroma.mix(base, 'white', lightness / 100, 'hsl')
        }
        return clampColor(color).hex()
    }

    const shades: [number, number][] = [
        [50, 97],
        [100, 94],
        [200, 86],
        [300, 74],
        [400, 60],
        [500, 45],
        [600, 36],
        [700, 26],
        [800, 18],
        [900, 12],
        [950, 8]
    ]

    return shades.reduce((palette, [shade, lightness]) => {
        palette[shade] = generateShade(lightness)
        return palette
    }, {} as ColorPalette)
}

