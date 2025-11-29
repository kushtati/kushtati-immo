import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

/**
 * COMPOSANT PAGE CONTACT
 * Formulaire de contact, informations et carte de localisation
 */
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Informations de contact
  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+224 623 93 63 13', '+224 620 11 22 33'],
      action: 'tel:+224623936313'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['ib362392@gmail.com', 'contact@kushtati-immo.com'],
      action: 'mailto:ib362392@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Kaloum, Conakry', 'République de Guinée'],
      action: null
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun - Ven: 8h - 18h', 'Sam: 9h - 14h'],
      action: null
    }
  ];

  return (
    <section id="contact" className="relative py-20 min-h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
            Contactez-Nous
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Notre équipe est à votre écoute. N'hésitez pas à nous contacter pour toute question 
            ou demande d'information sur nos propriétés.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-brand-primary mb-6">
                Envoyez-nous un Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Message Envoyé !
                  </h3>
                  <p className="text-green-700">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nom Complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                        placeholder="+224 xxx xx xx xx"
                      />
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    >
                      <option value="general">Question Générale</option>
                      <option value="property">Information sur une Propriété</option>
                      <option value="visit">Demande de Visite</option>
                      <option value="sell">Vendre une Propriété</option>
                      <option value="rent">Louer une Propriété</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  {/* Bouton */}
                  <button
                    type="submit"
                    className="w-full bg-brand-accent text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send size={20} />
                    Envoyer le Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-accent/10 p-3 rounded-full flex-shrink-0">
                      <Icon className="text-brand-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-primary mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-slate-600 text-sm mb-1">
                          {info.action ? (
                            <a 
                              href={info.action}
                              className="hover:text-brand-accent transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carte (placeholder) */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-slate-200 h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Carte de localisation</p>
                  <p className="text-xs">Kaloum, Conakry</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-brand-primary text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Besoin d'aide immédiate ?</h3>
              <p className="text-slate-200 text-sm mb-4">
                Notre équipe est disponible par téléphone du lundi au samedi.
              </p>
              <a 
                href="tel:+224623936313"
                className="block bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors text-center"
              >
                <Phone size={18} className="inline mr-2" />
                Appeler Maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
