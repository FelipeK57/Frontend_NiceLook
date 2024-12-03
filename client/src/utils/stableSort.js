/**
 * Ordena un array de forma estable, manteniendo el orden original de elementos iguales.
 *
 * @param {Array} array - El array a ordenar.
 * @returns {Array} - El array ordenado de forma estable.
 */
export function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}