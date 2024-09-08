

type NotificationProps = {
    message: string;
  };
export default function Notification({ message }:NotificationProps) {
    return (
      <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded shadow">
        {message}
      </div>
    );
  }
  