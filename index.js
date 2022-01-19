/**
 * @param {string} date - дата отсчета
 * @param {
 *  Array<{
 *    name: string,
 *    birthdate: string,
 *  }>
 * } phoneList - список друзей из телефонной книги
 * @returns {
 *  Array<{
 *    name: string,
 *    birthdate: string,
 *  }>
 * }
 */
export function getNextBirthdays(date, phoneList) {

}

/**
 * @param {
 *  Array<{
 *    name: string,
 *    birthdate: string,
 *  }>
 * } phoneList - список друзей из телефонной книги
 * @returns {
 *  Array<{
 *    month: string,
 *    friends: Array<{
 *      name: string,
 *      birthdate: string,
 *    }>
 *  }>
 * }
 * 
 */
export function getMonthsList(phoneList) {

}

/**
 * @param {
 *  Array<{
 *    name: string,
 *    birthdate: string,
 *    wishList: Array<{
 *      title: string,
 *      price: number
 *    }>
 *  }>
 * } phoneList - список друзей из телефонной книги
 * @returns {
 *  {
 *    friendsList: Array<{
 *      name: string,
 *      birthdate: string,
 *      present: {
 *        title: string,
 *        price: number,
 *      },
 *    }>,
 *    totalPrice: number
 *  }>
 * }}
 */
export function getMinimumPresentsPrice(phoneList) {

}


/* Добавлен комментарий для теста */
