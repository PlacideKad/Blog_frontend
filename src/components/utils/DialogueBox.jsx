const ConfirmDialog = ({ open_, onClose_, onConfirm_, title_, message_ }) => {
  if (!open_) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 w-screen h-screen z-50">
      <div className="bg-fuchsia-50 rounded-lg shadow-lg p-6 w-8/10 md:w-5/10 max-w-170">
        <h2 className="text-lg font-semibold mb-3">{title_}</h2>
        <p className="text-sm text-gray-700 mb-6">{message_}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose_}
            className="px-4 py-2 bg-neutral-200 rounded-md hover:bg-neutral-300 transition-all duration-100 ease-in">
            Annuler
          </button>

          <button
            onClick={() => {
              onConfirm_();
              onClose_();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-100 ease-in">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
