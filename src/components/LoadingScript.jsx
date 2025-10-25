import Loading from "./Loading";

// components/LoadingScript.tsx
export default function LoadingScript() {
  return (
    <>
      {/* کامپوننت لودینگ شما - hidden به صورت پیش‌فرض */}
      <div id="custom-loading" style={{ display: "none" }}>
        {/* اینجا کامپوننت لودینگ خودتون رو قرار بدید */}
        <Loading />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const loadingElement = document.getElementById('custom-loading');
              
              function showLoading() {
                if (loadingElement) {
                  loadingElement.style.display = 'block';
                }
              }
              
              function hideLoading() {
                if (loadingElement) {
                  loadingElement.style.display = 'none';
                }
              }
              
              // مدیریت کلیک روی لینک‌ها
              document.addEventListener('click', function(e) {
                const target = e.target.closest('a');
                if (target && 
                    target.href && 
                    !target.href.startsWith('javascript:') &&
                    target.target !== '_blank' &&
                    !target.hasAttribute('download')) {
                  
                  showLoading();
                  
                 hideLoading()
                }
              });
              
              // وقتی صفحه کامل لود شد
              window.addEventListener('load', hideLoading);
            });
          `,
        }}
      />
    </>
  );
}
