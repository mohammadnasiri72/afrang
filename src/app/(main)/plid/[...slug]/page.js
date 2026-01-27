import BoxShowInformationBank from "./BoxShowInformationBank";

export default async function PaymentLinkPage(props) {
  const params = await props.params;
  const slug = await params;
  const id = Number(slug.slug[0]);
  

  return (
    <>
      <BoxShowInformationBank id={id}/>
    </>
  );
}
