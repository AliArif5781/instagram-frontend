import Form from "../../../components/Form";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { sendMessageThunk } from "../../../store/message/message.thunk";
import { sendMessageSchema } from "../schema/schema";

const SendMessage = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);

  const handleSendMessage = async (data: Record<string, string>) => {
    await dispatch(
      sendMessageThunk({
        message: data.message,
        receiverId: selectedUser?._id,
      })
    );
  };

  return (
    <div className="p-4 border-t border-gray-800 flex items-center gap-3 flex-shrink-0">
      {/* Wrap Form in full width div */}
      <div className="flex-1">
        <Form
          onSubmit={handleSendMessage}
          schema={sendMessageSchema}
          resetSubmit={true}
        />
      </div>
      <button
        type="submit"
        form="login-form"
        className="bg-[var(--color-blue)] px-4 py-2 rounded-full font-semibold flex-shrink-0 cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
