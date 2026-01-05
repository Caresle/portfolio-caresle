import { about } from '../constants/about'

function AboutSection() {
  return (
    <div className="h-full flex items-center justify-center p-8 overflow-auto">
      <div className="w-full max-w-3xl bg-portfolio-white dark:bg-portfolio-white rounded-2xl p-10 shadow-lg">
        {/* Header with optional profile image */}
        <div className="flex flex-col items-center mb-8">
          {about.profileImage && (
            <img
              src={about.profileImage}
              alt={about.name}
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
            />
          )}
          <h1 className="text-4xl font-bold text-portfolio-black mb-2">
            {about.name}
          </h1>
          <p className="text-xl text-portfolio-black opacity-80">
            {about.title}
          </p>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-portfolio-black mb-4">About Me</h2>
          <p className="text-portfolio-black leading-relaxed">
            {about.bio}
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-portfolio-black mb-4">Contact</h2>
          <div className="space-y-2 text-portfolio-black">
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a 
                href={`mailto:${about.contact.email}`}
                className="text-portfolio-black hover:opacity-70 transition-opacity underline"
              >
                {about.contact.email}
              </a>
            </p>
            <p>
              <span className="font-medium">Location:</span> {about.contact.location}
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href={about.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-black hover:opacity-70 transition-opacity underline"
              >
                LinkedIn
              </a>
              <a
                href={about.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-black hover:opacity-70 transition-opacity underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Education */}
        {about.education && about.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-portfolio-black mb-4">Education</h2>
            <div className="space-y-3">
              {about.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-medium text-portfolio-black">{edu.degree}</p>
                  <p className="text-portfolio-black opacity-80">{edu.school}</p>
                  <p className="text-sm text-portfolio-black opacity-60">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {about.interests && about.interests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-portfolio-black mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {about.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-portfolio-gray rounded-full text-sm text-portfolio-black"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Download Resume Button */}
        {about.resumeUrl && (
          <div className="flex justify-center mt-8">
            <a
              href={about.resumeUrl}
              download
              className="px-8 py-3 bg-portfolio-black text-portfolio-white rounded-xl hover:opacity-90 transition-opacity font-medium"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutSection
