type Props = {
  id: string;
  date: string;
  amount: string;
  status: string;
  subscription: string;
};

const PaymentRow = ({ name, value }: { name: string; value: string }) => {
  return (
    <tr>
      <td className="px-1 font-medium">{name}</td>
      <td className="px-1 text-right italic">{value}</td>
    </tr>
  );
};

const PaymentContainer = ({
  id,
  date,
  amount,
  status,
  subscription,
}: Props) => {
  return (
    <div className="animated-inactive mb-5 w-full rounded-md bg-gray-1 p-3 text-black">
      <table className="w-full">
        <tbody>
          <PaymentRow name="ID" value={id}></PaymentRow>
          <PaymentRow name="Date" value={date}></PaymentRow>
          <PaymentRow name="Amount" value={amount}></PaymentRow>
          <PaymentRow name="Status" value={status}></PaymentRow>
          <PaymentRow name="Subscription" value={subscription}></PaymentRow>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentContainer;
