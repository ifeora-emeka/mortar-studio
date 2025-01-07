/**
 * Extracts a hex color code from a given string.
 *
 * This function searches for a hex color code in the input string, extracts the first occurrence,
 * trims any surrounding whitespace, and validates the extracted hex color code.
 *
 * @param {string} input - The input string containing the hex color code.
 * @returns {string | null} The extracted and validated hex color code, or null if no valid hex color code is found.
 */
export function extractHexColorFromAnyString(input: string): string | null {
    const hexColorPattern = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/;
    const match = input.match(hexColorPattern);
    if (match) {
        const hexColor = match[0].trim();
        return hexColor;
    }
    return null;
}
