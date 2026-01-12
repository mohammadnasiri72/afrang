import Container from "../container";

export default function HeaderGallerySkeleton() {
  return (
    <>
      <Container>
        <div className="rounded-[5px] px-3 bg-white py-[10px] my-[25px] flex items-center">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="flex items-center flex-wrap md:flex-nowrap gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-80 mx-auto"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-56 mx-auto"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-28 mx-auto"></div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
