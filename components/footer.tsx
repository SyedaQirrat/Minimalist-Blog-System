export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">ABOUT US</h2>
      </div>
      <div className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm sm:text-base font-medium tracking-wide text-gray-800 uppercase mb-8">
              HERE ARE SOME REASONS YOU'LL LOVE WORKING WITH US!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Clean Design</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Uncluttered and readable interface that focuses on content clarity and user experience.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Fast Performance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Optimized for speed with efficient loading and smooth interactions.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Easy Navigation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Intuitive structure that guides users effortlessly through content.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Responsive Layout</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Works seamlessly across all devices and screen sizes.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Engaging Content</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Focus on storytelling and meaningful connections with readers.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Modern Approach</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Contemporary design meets timeless functionality and elegance.
              </p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-white border-t border-gray-100 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Minimalistic Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
