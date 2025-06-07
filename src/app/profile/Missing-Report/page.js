import ReportLossForm from "@/components/profile/ReportLossForm";
import { getCategory } from "@/services/Category/categoryService";

export default async function ReportLossPage() {
    const categories = await getCategory({
        TypeId: 4,
        LangCode: "fa",
        IsHome: 1,
      });
      
    return (
        <ReportLossForm categories={categories} />
    );
} 