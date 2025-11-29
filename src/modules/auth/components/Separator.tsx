const Separator = () => {
  return (
    <div
      className="flex items-center my-6"
      role="separator"
      aria-label="Or separator"
    >
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-xs font-semibold text-gray-500">OR</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Separator;
