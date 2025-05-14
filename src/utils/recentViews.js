const MAX_RECENT_VIEWS = 9; // حداکثر تعداد بازدیدهای ذخیره شده

export const addToRecentViews = (productId) => {
    try {
        // خواندن بازدیدهای قبلی
        const storedViews = localStorage.getItem('recentViews');
        let recentViews = storedViews ? JSON.parse(storedViews) : [];

        // حذف محصول از لیست قبلی (اگر وجود داشت)
        recentViews = recentViews.filter(id => id !== productId);

        // اضافه کردن محصول جدید به ابتدای لیست
        recentViews.unshift(productId);

        // محدود کردن تعداد بازدیدها به 9 تا
        if (recentViews.length > MAX_RECENT_VIEWS) {
            recentViews = recentViews.slice(0, MAX_RECENT_VIEWS);
        }

        // ذخیره در localStorage
        localStorage.setItem('recentViews', JSON.stringify(recentViews));
    } catch (error) {
        console.error('Error saving recent views:', error);
    }
};

export const getRecentViews = () => {
    try {
        const storedViews = localStorage.getItem('recentViews');
        return storedViews ? JSON.parse(storedViews) : [];
    } catch (error) {
        console.error('Error getting recent views:', error);
        return [];
    }
};

export const clearRecentViews = () => {
    try {
        localStorage.removeItem('recentViews');
    } catch (error) {
        console.error('Error clearing recent views:', error);
    }
}; 