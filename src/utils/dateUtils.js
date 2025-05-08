import moment from 'moment-jalaali';

export const formatPersianDate = (dateString) => {
  try {
    // تبدیل رشته تاریخ به آبجکت moment
    const [day, month, year] = dateString.split('/').map(Number);
    const date = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD');
    
    // تبدیل به فرمت مورد نظر
    return date.format('jD jMMMM jYYYY');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // در صورت خطا، تاریخ اصلی برگردانده می‌شود
  }
}; 