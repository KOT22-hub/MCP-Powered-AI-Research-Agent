export function calculate(expression: string): number {
    // Temporary simple calculator.
    // We will replace this with a safer implementation later.

    return Function(`"use strict"; return (${expression})`)();
}