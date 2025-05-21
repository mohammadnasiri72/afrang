import dynamic from 'next/dynamic';

const AddressList = dynamic(() => import("@/components/profile/address/AddressList"));

export default function AddressesPage() {
  return <AddressList />;
} 