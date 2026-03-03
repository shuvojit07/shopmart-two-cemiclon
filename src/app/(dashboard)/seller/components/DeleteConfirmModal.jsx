export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Delete Product?</h3>
        <p className="mb-6">
          Are you sure you want to delete <strong>{productName}</strong>?<br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-error"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}