'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import MemoryGame from '@/components/Games/MemoryGame'
import Chatbot from '@/components/Chatbot'
import { 
  GraduationCap, 
  Award, 
  Star, 
  Briefcase, 
  Rocket, 
  Bot, 
  Users,
  Code,
  Database,
  Cpu,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github
} from 'lucide-react'

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* About Section */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gradient mb-6">About Me</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              I'm a graduate student pursuing my M.S. in Electrical and Computer Engineering at the University of Oklahoma, 
              with a strong foundation in Computer Science and Mathematics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: 'M.S. ECE', subtitle: 'University of Oklahoma' },
              { icon: Award, title: '3.7 GPA', subtitle: "Dean's List" },
              { icon: Star, title: '$4,000 Award', subtitle: 'Young Aurora' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <item.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gradient text-center mb-16"
          >
            Professional Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: 'Graduate Research Assistant',
                company: 'University of Oklahoma – School of Electrical and Computer Engineering',
                period: 'Aug 2025 - Present',
                description: 'Sponsored through research assistantship to support faculty-led projects in sensing systems and software',
                achievements: [
                  'Developed iOS and Android applications to interface with BLE-based hardware',
                  'Conducted data analytics and visualization for real-time sensor measurements'
                ]
              },
              {
                title: 'Undergraduate Research Assistant',
                company: 'University of Oklahoma – School of Electrical and Computer Engineering',
                period: 'Jun 2024 - Aug 2024',
                description: 'Methane (CH4) Monitoring and Environmental Gas Emissions',
                achievements: [
                  'Actively engaged in comprehensive project focused on monitoring methane emissions',
                  'Building and designing CH4 sensor device with software components',
                  'Hardware and software integration for precise data collection and analysis'
                ]
              },
              {
                title: 'Data Science Intern',
                company: 'NovelSoft — Mongolia, Ulaanbaatar',
                period: 'May 2023 - Jan 2024',
                achievements: [
                  'Assisted in implementing machine learning models to solve real-world business problems',
                  'Led creation of custom database system tailored to organizational needs',
                  'Developed chatbot leveraging OpenAI API for automated customer queries'
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-4 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <span className="text-blue-600 font-medium">{job.period}</span>
                  </div>
                  <h4 className="text-lg text-slate-700 mb-3">{job.company}</h4>
                  {job.description && (
                    <p className="text-slate-600 mb-4">{job.description}</p>
                  )}
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-slate-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold gradient-text text-center mb-12"
          >
            Leadership & Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: 'NexLuSense',
                role: 'Founder and Software Lead',
                description: 'Co-founded a startup focused on intelligent sensing and mobility platforms. Leading software development across web and mobile platforms.',
                tags: ['Startup', 'Mobile Development', 'Web Development'],
                link: 'https://nexlusense.com'
              },
              {
                icon: Bot,
                title: 'OKE Ride',
                role: 'Autonomous Platform',
                description: 'Engineering an autonomous three-legged scooter platform with vision and GPS-based navigation technologies.',
                tags: ['Autonomous Systems', 'Computer Vision', 'GPS Navigation']
              },
              {
                icon: Users,
                title: 'OU AI and ML Club',
                role: 'Executive',
                description: 'Served as Head of OU Computer Science Club, managing events and student engagement.',
                tags: ['Leadership', 'Community', 'Events']
              },
              {
                icon: Globe,
                title: 'OU Free Food',
                role: 'Creator',
                description: 'Lightweight site for OU students to discover free food events with list/week/month views, advanced filters, local submissions, and a GitHub Actions scraper importing OU Engage events. Deployed on GitHub Pages with zero server maintenance.',
                tags: ['Next.js', 'GitHub Pages', 'GitHub Actions', 'Calendar', 'Scraper'],
                link: 'https://bekmj.github.io/OUFreeFood/'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover-lift"
              >
                <project.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-blue-500 font-medium mb-3">{project.role}</p>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Visit Website
                    <Globe className="ml-2 h-4 w-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold gradient-text text-center mb-12"
          >
            Skills & Certifications
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Programming Languages</h3>
              <div className="space-y-4">
                {[
                  { name: 'Python', level: 95 },
                  { name: 'Java', level: 90 },
                  { name: 'JavaScript', level: 85 },
                  { name: 'R', level: 80 },
                  { name: 'SQL', level: 90 },
                  { name: 'Dart', level: 75 }
                ].map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tools & Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Tools & Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Database, name: 'Firebase' },
                  { icon: Globe, name: 'Google Cloud' },
                  { icon: Cpu, name: 'BLE' },
                  { icon: Code, name: 'Git' },
                  { icon: Database, name: 'REST APIs' },
                  { icon: Code, name: 'React' }
                ].map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover-lift"
                  >
                    <tool.icon className="h-6 w-6 text-blue-500" />
                    <span className="font-medium">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Machine Learning Specialization',
                'Prompt Engineering',
                'LangChain for LLM',
                'GenAI and Transformers'
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg hover-lift"
                >
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span className="font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Interactive Games</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience my technical skills through interactive games and demonstrations. 
              These showcase my ability to create engaging user experiences with modern web technologies.
            </p>
          </motion.div>
          
          <MemoryGame />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold gradient-text text-center mb-12"
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                { icon: Phone, title: 'Phone', value: '(405) 981-8456' },
                { icon: Mail, title: 'Email', value: 'Bek@ou.edu' },
                { icon: MapPin, title: 'Location', value: 'Norman, OK' }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <contact.icon className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">{contact.title}</h4>
                    <p className="text-gray-600">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
              <div className="space-y-4">
                {[
                  { icon: Linkedin, name: 'LinkedIn', href: '#' },
                  { icon: Github, name: 'GitHub', href: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover-lift group"
                  >
                    <social.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-8 text-center">
          <p>&copy; 2024 Bilguunzaya Mijiddorj. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
