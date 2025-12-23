import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import Navigation from './components/user/Navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      title: "Email",
      content: "dusanmilekic0511@gmail.com",
      link: "mailto:dusanmilekic0511@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-400" />,
      title: "Phone",
      content: "+381 61 234-1748",
      link: "tel:+381612341748"
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: "Location",
      content: "Serbia",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      url: "https://github.com/Dusan-Milekic"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://rs.linkedin.com/in/dusan-milekic/en"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900">
      {/*Navigation*/ }
      <Navigation/>
      {/* Hero Section */}
      <section className="relative bg-neutral-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 text-center group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-neutral-400 hover:text-indigo-400 transition-colors duration-300 break-all"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-neutral-400">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-neutral-800 p-10 rounded-xl border border-neutral-700">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Connect With Me
          </h2>
          <p className="text-neutral-400 mb-8">
            Follow me on social media for updates and projects
          </p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 p-4 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 group"
                aria-label={social.name}
              >
                <div className="text-neutral-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}