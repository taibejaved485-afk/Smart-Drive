export default function BookingForm() {
  return (
    <section id="contact" className="py-20 bg-navy-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Book Your Lesson</h2>
        <form className="bg-white p-8 rounded-2xl shadow-xl text-navy-900 grid gap-6">
          <input type="text" placeholder="Full Name" className="w-full p-4 border border-gray-200 rounded-lg" />
          <input type="tel" placeholder="Phone Number" className="w-full p-4 border border-gray-200 rounded-lg" />
          <select className="w-full p-4 border border-gray-200 rounded-lg">
            <option>Select Course</option>
          </select>
          <button className="bg-amber-500 text-navy-900 py-4 rounded-lg font-bold">Submit Request</button>
        </form>
      </div>
    </section>
  );
}
