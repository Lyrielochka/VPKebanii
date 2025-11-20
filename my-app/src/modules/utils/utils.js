export const loadCartFromLocalStorage = (key = '') => {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export const saveCart = (key = '', obj = { count: 0, result: {}}) => {
    const {count, item } = obj;
    const data = loadCartFromLocalStorage('');
    data.push({count, item});
    localStorage.setItem(key, JSON.stringify(data))
}