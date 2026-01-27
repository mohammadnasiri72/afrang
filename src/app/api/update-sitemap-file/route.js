// app/api/update-sitemap-file/route.js
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    
    // دریافت XML از request body
    const xmlText = await request.text();
    
    // بررسی وجود داده
    if (!xmlText || xmlText.trim().length === 0) {
      console.error('❌ داده خالی دریافت شد');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'داده XML دریافت نشد'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );
    }
    
    // بررسی اینکه واقعاً XML است
    if (!xmlText.includes('<?xml') && !xmlText.includes('<urlset')) {
      console.error('❌ داده XML نامعتبر است');
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'داده دریافتی فرمت XML معتبر ندارد',
          sample: xmlText.substring(0, 200)
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );
    }
    
    // مسیر فایل در public
    const publicDir = path.join(process.cwd(), '');
    const filePath = path.join(publicDir, 'sitemap.xml');
    
    // اطمینان از وجود پوشه public
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // ذخیره فایل
    fs.writeFileSync(filePath, xmlText, 'utf8');
    
    // اطلاعات اضافی
    const urlCount = (xmlText.match(/<url>/g) || []).length;
   
    
    // پاسخ موفق
    return new Response(
      JSON.stringify({
        success: true,
        message: 'فایل sitemap.xml با موفقیت ذخیره شد',
        size: xmlText.length,
        urlCount: urlCount,
        filePath: '/sitemap.xml',
        url: '/sitemap.xml',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
    
  } catch (error) {
    console.error('❌ خطا در ذخیره فایل:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'خطا در ذخیره فایل'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}