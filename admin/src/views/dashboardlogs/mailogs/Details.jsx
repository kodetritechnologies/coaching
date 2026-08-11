
function Details() {
  const email = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    subject: "Regarding Project Collaboration",
    content:
      "Hello, I wanted to discuss a potential collaboration opportunity with your company. Let me know when you are available for a quick call. Looking forward to hearing from you soon.",
    date: "17 Aug 2025, 04:15 PM",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-semibold">📧 Email Details</h2>
          <span className="text-sm opacity-90">{email.date}</span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* From Info */}
          <div className="border-b pb-4">
            <p className="text-gray-800 text-lg font-medium">
              {email.name}{" "}
              <span className="text-gray-500">&lt;{email.email}&gt;</span>
            </p>
            <p className="text-gray-600 text-sm mt-1">📞 {email.phone}</p>
          </div>

          {/* Subject */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {email.subject}
            </h3>
          </div>

          {/* Content */}
          <div className="bg-gray-50 border rounded-lg p-5 text-gray-700 leading-relaxed shadow-sm">
            {email.content}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button className="px-5 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium">
            Reply
          </button>
          <button className="px-5 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
