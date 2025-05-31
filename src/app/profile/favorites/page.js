import FavoritesList from "@/components/favorites/FavoritesList";

export default function FavoritesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">علاقه‌مندی‌های من</h1>
            </div>
            <FavoritesList />
        </div>
    );
} 