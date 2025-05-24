export const clearStateMiddleware = store => next => action => {
    // اگر action مربوط به خروج کاربر یا پاک کردن state باشد
    if (action.type === 'CLEAR_STATE') {
        // پاک کردن state از localStorage
        localStorage.removeItem('reduxState');
    }
    return next(action);
}; 