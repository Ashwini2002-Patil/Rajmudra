const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-brand-700">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
    <p className="text-sm font-medium">{label}</p>
  </div>
)

export default Loader
