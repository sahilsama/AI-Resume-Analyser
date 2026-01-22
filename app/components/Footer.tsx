import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-amber-300 font-modern-antiqua">AI Resume Analyser</h3>
            <p className="text-gray-300 mb-4">
              Get AI-powered feedback on your resume. Improve your ATS score, optimize content,
              and land your dream job with intelligent resume analysis.
            </p>
            <p className="text-sm text-gray-400">
              Powered by advanced AI technology for accurate resume evaluation and personalized improvement suggestions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-300 hover:text-amber-300 transition-colors">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-300 hover:text-amber-300 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li>ATS Score Analysis</li>
              <li>Content Optimization</li>
              <li>Skills Assessment</li>
              <li>Structure Review</li>
              <li>Tone & Style Check</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2026 AI Resume Analyser. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer