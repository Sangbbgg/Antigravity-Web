import { Mail, Github, Linkedin } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 flex flex-col items-center space-y-6">
          {/* Profile Picture/Avatar */}
          <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg border-4 border-blue-400">
            JD
          </div>

          {/* Name and Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-blue-300">John Doe</h1>
            <p className="text-xl text-gray-300">Lead Frontend Developer</p>
          </div>

          {/* Bio */}
          <p className="text-center text-lg max-w-2xl leading-relaxed text-gray-200">
            Passionate about crafting intuitive and performant user experiences. With over 8 years of experience, I specialize in modern web technologies, particularly Next.js and Tailwind CSS. I thrive on solving complex UI challenges and building scalable, maintainable applications.
          </p>

          {/* Social/Contact Links */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <a href="mailto:john.doe@example.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2" aria-label="Email John Doe">
              <Mail size={24} />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2" aria-label="John Doe's GitHub profile">
              <Github size={24} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2" aria-label="John Doe's LinkedIn profile">
              <Linkedin size={24} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}