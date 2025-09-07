export default function FooterPage ( ){
    return(
        <>
        <footer id="contact" className="bg-green-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8 text-center">
          <p className="mb-2 text-lg">© 2025 AgriTrace. All rights reserved.</p>
          <p className="text-green-200">
            For inquiries, please contact us at:{" "}
            <a
              href="mailto:support@agritrace.com"
              className="font-semibold hover:underline"
            >
              support@agritrace.com
            </a>
          </p>
        </div>
      </footer>
        </>
    )
}