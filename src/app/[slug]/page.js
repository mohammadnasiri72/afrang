import { getItemByUrl } from "@/services/Item/item";
import { notFound } from "next/navigation";

export default async function DynamicPage({ params }) {
  try {
    const data = await getItemByUrl(params.slug);
    console.log(data);
    
    if (!data) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 z-50 relative">
        <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    notFound();
  }
} 