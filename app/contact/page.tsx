import React from 'react'

const Contact = () => {
  return (
      <section className="h-[100vh] flex justify-center items-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have feedback, questions, or suggestions? Drop us an email at 
            <a href="mailto:support@linkleaf.com" className="text-emerald-300 hover:text-emerald-400 ml-2 no-underline">
               support@linkleaf.com
            </a>.
          </p>
          {/* <p className="mt-4 text-gray-600 dark:text-gray-300">
            Follow us on social media for updates and new features:
          </p>
          <p className="mt-2">
            <a href="https://twitter.com/linkleaf" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800">Twitter</a> |
            <a href="https://instagram.com/linkleaf" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800">Instagram</a> |
            <a href="https://facebook.com/linkleaf" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800">Facebook</a>
          </p> */}
        </div>
      </section>
  )
}

export default Contact