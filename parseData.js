function parseDate(date) {
    let arr = date.split(".");
    // танцы с бубном, время корявое в js никто не отменял
    return new Date(arr[2], arr[1] - 1, arr[0]);
}


module.exports = { parseDate }