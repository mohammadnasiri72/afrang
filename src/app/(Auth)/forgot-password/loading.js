function loading() {
  return (
    <>
      <div className="fixed inset-0 bg-[#fff] flex items-center justify-center !z-[10000000000000] transition-opacity duration-300">
        <div className="w-8 h-8 border-4 border-[#d1182b] border-t-transparent rounded-full animate-spin" />
      </div>
    </>
  );
}

export default loading;
