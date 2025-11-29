import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { 
  Home, FileText, CreditCard, Wrench, MessageSquare, 
  Calendar, CheckCircle, AlertCircle, Download, Send,
  X, Building2, Smartphone, Wallet
} from 'lucide-react';

// Types
interface Property {
  id: string;
  title: string;
  location: string;
  monthlyRent: number;
  landlord: string;
  landlordPhone: string;
  landlordEmail: string;
  contractStart: string;
  contractEnd: string;
  deposit: number;
  address: string;
}

interface Payment {
  id: string;
  month: string;
  amount: number;
  status: 'payé' | 'en attente' | 'en retard';
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'en cours' | 'résolu' | 'en attente';
  date: string;
  priority: 'haute' | 'moyenne' | 'basse';
}

const TenantDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'maintenance' | 'contract' | 'messages'>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([
    { id: '1', month: 'Décembre 2024', amount: 3500000, status: 'en attente', dueDate: '2024-12-05' },
    { id: '0', month: 'Janvier 2025', amount: 3500000, status: 'en attente', dueDate: '2025-01-05' },
    { id: '2', month: 'Novembre 2024', amount: 3500000, status: 'payé', dueDate: '2024-11-05', paidDate: '2024-11-03', paymentMethod: 'Carte bancaire', transactionId: 'TX-1730678400000-CARTE' },
    { id: '3', month: 'Octobre 2024', amount: 3500000, status: 'payé', dueDate: '2024-10-05', paidDate: '2024-10-04', paymentMethod: 'Orange Money', transactionId: 'TX-1728086400000-ORANGE' },
    { id: '4', month: 'Septembre 2024', amount: 3500000, status: 'payé', dueDate: '2024-09-05', paidDate: '2024-09-02', paymentMethod: 'MTN Money', transactionId: 'TX-1725408000000-MTN' },
    { id: '5', month: 'Août 2024', amount: 3500000, status: 'payé', dueDate: '2024-08-05', paidDate: '2024-08-01', paymentMethod: 'Virement bancaire', transactionId: 'TX-1722470400000-VIREMENT' },
  ]);

  // Données mockées du locataire
  const tenantProperty: Property = {
    id: '1',
    title: 'Appartement 3 pièces - Kaloum',
    location: 'Kaloum, Conakry',
    monthlyRent: 3500000,
    landlord: 'Ibrahim Sow',
    landlordPhone: '+224 623 93 63 13',
    landlordEmail: 'ib362392@gmail.com',
    contractStart: '2024-01-01',
    contractEnd: '2025-12-31',
    deposit: 7000000,
    address: 'Avenue de la République, Immeuble moderne, 3ème étage'
  };

  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: '1',
      title: 'Fuite d\'eau dans la salle de bain',
      description: 'Le robinet de la douche fuit légèrement',
      status: 'en cours',
      date: '2024-11-20',
      priority: 'haute'
    },
    {
      id: '2',
      title: 'Ampoule grillée dans le couloir',
      description: 'L\'ampoule du couloir principal ne fonctionne plus',
      status: 'résolu',
      date: '2024-11-10',
      priority: 'basse'
    },
    {
      id: '3',
      title: 'Problème de climatisation',
      description: 'La climatisation de la chambre fait du bruit',
      status: 'en attente',
      date: '2024-11-25',
      priority: 'moyenne'
    }
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'GNF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const nextPaymentDue = paymentHistory.find(p => p.status === 'en attente');
  const totalPaid = paymentHistory.filter(p => p.status === 'payé').reduce((sum, p) => sum + p.amount, 0);
  const pendingMaintenance = maintenanceRequests.filter(r => r.status !== 'résolu').length;

  // Fonction pour générer un reçu PDF
  const generateReceipt = (payment: Payment) => {
    const pdf = new jsPDF();
    const currentDate = new Date();
    
    // Configuration des couleurs
    const primaryColor: [number, number, number] = [51, 65, 85];
    const accentColor: [number, number, number] = [245, 158, 11];
    const lightGray: [number, number, number] = [241, 245, 249];
    
    // En-tête avec logo
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, 210, 50, 'F');
    
    // Logo K
    const logoScale = 0.3;
    const logoX = 15;
    const logoY = 12;
    
    pdf.setLineWidth(2.5);
    pdf.setDrawColor(255, 255, 255);
    pdf.line(logoX + 25*logoScale, logoY + 15*logoScale, logoX + 25*logoScale, logoY + 85*logoScale);
    pdf.setDrawColor(217, 151, 6);
    pdf.line(logoX + 25*logoScale, logoY + 50*logoScale, logoX + 65*logoScale, logoY + 15*logoScale);
    pdf.line(logoX + 45*logoScale, logoY + 32.5*logoScale, logoX + 75*logoScale, logoY + 85*logoScale);
    pdf.setDrawColor(255, 255, 255);
    pdf.line(logoX + 65*logoScale, logoY + 15*logoScale, logoX + 85*logoScale, logoY + 15*logoScale);
    
    // Texte KUSHTATI Immo
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KUSHTATI', 45, 23);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Immo', 45, 33);
    
    // Titre du document
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RECU DE PAIEMENT', 195, 25, { align: 'right' });
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`N° ${payment.transactionId || 'N/A'}`, 195, 35, { align: 'right' });
    
    let yPos = 65;
    
    // Informations du reçu
    pdf.setFillColor(...lightGray);
    pdf.roundedRect(15, yPos, 180, 85, 3, 3, 'F');
    
    yPos += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...accentColor);
    pdf.text('DETAILS DU PAIEMENT', 20, yPos);
    
    yPos += 12;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...primaryColor);
    
    const details = [
      ['Date de paiement:', payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR')],
      ['Periode:', payment.month],
      ['Montant paye:', formatPrice(payment.amount)],
      ['Moyen de paiement:', payment.paymentMethod || 'Non specifie'],
      ['N° de transaction:', payment.transactionId || 'N/A'],
      ['Statut:', 'PAYE']
    ];
    
    details.forEach(([label, value]) => {
      pdf.text(label, 25, yPos);
      pdf.setFont('helvetica', 'bold');
      if (label === 'Montant paye:') {
        pdf.setTextColor(...accentColor);
        pdf.setFontSize(14);
      }
      pdf.text(value, 110, yPos);
      if (label === 'Montant paye:') {
        pdf.setFontSize(11);
        pdf.setTextColor(...primaryColor);
      }
      pdf.setFont('helvetica', 'normal');
      yPos += 9;
    });
    
    yPos += 8;
    
    // Informations locataire et propriété
    pdf.setFillColor(...lightGray);
    pdf.roundedRect(15, yPos, 180, 60, 3, 3, 'F');
    
    yPos += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...accentColor);
    pdf.text('INFORMATIONS', 20, yPos);
    
    yPos += 12;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Locataire:', 25, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Tenant - Kushtati Immo', 25, yPos + 5);
    
    yPos += 15;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Proprietaire:', 25, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(tenantProperty.landlord, 25, yPos + 5);
    pdf.text(tenantProperty.landlordPhone, 25, yPos + 10);
    
    yPos += 20;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Propriete:', 25, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(tenantProperty.title, 25, yPos + 5);
    pdf.text(tenantProperty.location, 25, yPos + 10);
    
    yPos += 25;
    
    // Note légale
    pdf.setFillColor(220, 252, 231);
    pdf.roundedRect(15, yPos, 180, 15, 3, 3, 'F');
    yPos += 6;
    pdf.setFontSize(9);
    pdf.setTextColor(22, 101, 52);
    pdf.setFont('helvetica', 'bold');
    pdf.text('NOTE:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('Ce recu confirme le paiement du loyer. Conservez-le precieusement.', 20, yPos + 5);
    
    // Pied de page
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(15, 275, 195, 275);
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KUSHTATI IMMO', 105, 281, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.text('Conakry, Guinee - Gestion Immobiliere', 105, 285, { align: 'center' });
    pdf.text('Email: ib362392@gmail.com | Tel: +224 623 93 63 13 | GitHub: kushtati', 105, 289, { align: 'center' });
    
    pdf.setFontSize(7);
    pdf.text(`(c) ${currentDate.getFullYear()} Kushtati Immo - Document genere le ${currentDate.toLocaleDateString('fr-FR')}`, 105, 293, { align: 'center' });
    
    // Télécharger le PDF
    pdf.save(`Recu-Paiement-${payment.month.replace(/\s/g, '-')}-${payment.transactionId || Date.now()}.pdf`);
  };

  // Fonction pour ouvrir le modal de paiement
  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  // Fonction pour traiter le paiement
  const handleProcessPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Veuillez sélectionner un moyen de paiement');
      return;
    }

    if (!selectedPayment) return;

    setIsProcessing(true);

    // Simulation du traitement selon le moyen de paiement
    setTimeout(() => {
      let message = '';
      
      switch (selectedPaymentMethod) {
        case 'carte':
          message = `✓ Paiement de ${formatPrice(selectedPayment.amount)} effectué par carte bancaire\n\nTransaction approuvée\nNuméro de confirmation: CB-${Date.now()}\n\nUn reçu vous a été envoyé par email.`;
          break;
        case 'virement':
          message = `✓ Instructions de virement envoyées\n\nMontant: ${formatPrice(selectedPayment.amount)}\nBénéficiaire: ${tenantProperty.landlord}\n\nVeuillez effectuer le virement et conserver votre preuve de paiement.\nLe statut sera mis à jour après réception.`;
          break;
        case 'orange':
          message = `✓ Demande de paiement Orange Money envoyée\n\nMontant: ${formatPrice(selectedPayment.amount)}\nNuméro: ${tenantProperty.landlordPhone}\n\nVérifiez votre téléphone pour confirmer la transaction avec votre code PIN.`;
          break;
        case 'mtn':
          message = `✓ Demande de paiement MTN Money envoyée\n\nMontant: ${formatPrice(selectedPayment.amount)}\nNuméro: ${tenantProperty.landlordPhone}\n\nVérifiez votre téléphone pour confirmer la transaction avec votre code PIN.`;
          break;
        case 'paypal':
          message = `✓ Redirection vers PayPal en cours...\n\nMontant: ${formatPrice(selectedPayment.amount)}\n\nVous allez être redirigé vers la page de paiement sécurisé PayPal.`;
          // Simulation de redirection PayPal
          setTimeout(() => {
            window.open('https://www.paypal.com', '_blank');
          }, 1000);
          break;
        case 'especes':
          message = `✓ Paiement en espèces enregistré\n\nMontant: ${formatPrice(selectedPayment.amount)}\n\nN'oubliez pas de demander un reçu lors de la remise des espèces à votre propriétaire.\n\nContact: ${tenantProperty.landlord}\nTél: ${tenantProperty.landlordPhone}`;
          break;
        default:
          message = 'Méthode de paiement non reconnue';
      }

      // Mettre à jour le statut du paiement et générer le reçu pour TOUS les moyens de paiement
      const transactionId = `TX-${Date.now()}-${selectedPaymentMethod.toUpperCase()}`;
      const paymentMethodNames: Record<string, string> = {
        'carte': 'Carte bancaire',
        'virement': 'Virement bancaire',
        'orange': 'Orange Money',
        'mtn': 'MTN Money',
        'paypal': 'PayPal',
        'especes': 'Especes'
      };
      
      // Créer le paiement mis à jour avec le statut "payé"
      const updatedPayment = {
        ...selectedPayment,
        status: 'payé' as const,
        paidDate: new Date().toISOString().split('T')[0],
        paymentMethod: paymentMethodNames[selectedPaymentMethod],
        transactionId: transactionId
      };
      
      // Mettre à jour l'historique des paiements
      setPaymentHistory(prev => 
        prev.map(p => p.id === selectedPayment.id ? updatedPayment : p)
      );
      
      // Générer automatiquement le reçu pour tous les moyens de paiement
      setTimeout(() => {
        generateReceipt(updatedPayment);
      }, 500);

      setIsProcessing(false);
      alert(message);
      setShowPaymentModal(false);
      setSelectedPaymentMethod('');
      setSelectedPayment(null);
    }, 2000); // Délai de simulation de 2 secondes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-primary mb-2">
                Tableau de Bord Locataire
              </h1>
              <p className="text-slate-600">
                Bienvenue sur votre espace personnel
              </p>
            </div>
            <Home className="text-brand-accent" size={48} />
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CreditCard size={32} />
              <span className="text-amber-100 text-sm">Loyer mensuel</span>
            </div>
            <p className="text-3xl font-bold">{formatPrice(tenantProperty.monthlyRent)}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle size={32} />
              <span className="text-green-100 text-sm">Total payé</span>
            </div>
            <p className="text-3xl font-bold">{formatPrice(totalPaid)}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Wrench size={32} />
              <span className="text-blue-100 text-sm">Demandes en cours</span>
            </div>
            <p className="text-3xl font-bold">{pendingMaintenance}</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-brand-accent border-b-2 border-brand-accent bg-amber-50'
                  : 'text-slate-600 hover:text-brand-accent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home size={20} />
                Vue d'ensemble
              </div>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'payments'
                  ? 'text-brand-accent border-b-2 border-brand-accent bg-amber-50'
                  : 'text-slate-600 hover:text-brand-accent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard size={20} />
                Paiements
              </div>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'maintenance'
                  ? 'text-brand-accent border-b-2 border-brand-accent bg-amber-50'
                  : 'text-slate-600 hover:text-brand-accent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wrench size={20} />
                Maintenance
              </div>
            </button>
            <button
              onClick={() => setActiveTab('contract')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'contract'
                  ? 'text-brand-accent border-b-2 border-brand-accent bg-amber-50'
                  : 'text-slate-600 hover:text-brand-accent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={20} />
                Mon Contrat
              </div>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'text-brand-accent border-b-2 border-brand-accent bg-amber-50'
                  : 'text-slate-600 hover:text-brand-accent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={20} />
                Messages
              </div>
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="p-8">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary mb-6">Vue d'ensemble</h2>

                {/* Prochain paiement */}
                {nextPaymentDue && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="text-amber-600 flex-shrink-0" size={32} />
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900 text-lg mb-2">
                          Prochain paiement à effectuer
                        </h3>
                        <p className="text-amber-800 mb-3">
                          {nextPaymentDue.month} - {formatPrice(nextPaymentDue.amount)}
                        </p>
                        <p className="text-sm text-amber-700">
                          Date limite : {new Date(nextPaymentDue.dueDate).toLocaleDateString('fr-FR')}
                        </p>
                        <button 
                          onClick={() => handlePaymentClick(nextPaymentDue)}
                          className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                        >
                          Payer maintenant
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Informations logement */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-brand-primary text-lg mb-4">Mon logement</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Adresse</p>
                      <p className="font-semibold text-slate-800">{tenantProperty.title}</p>
                      <p className="text-slate-600">{tenantProperty.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-slate-500">Loyer mensuel</p>
                        <p className="font-bold text-brand-accent">
                          {formatPrice(tenantProperty.monthlyRent)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Caution versée</p>
                        <p className="font-semibold text-slate-800">
                          {formatPrice(tenantProperty.deposit)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact propriétaire */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-brand-primary text-lg mb-4">Mon propriétaire</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-800">{tenantProperty.landlord}</p>
                    <p className="text-slate-600">{tenantProperty.landlordPhone}</p>
                    <p className="text-slate-600">{tenantProperty.landlordEmail}</p>
                    <button className="mt-3 bg-brand-accent hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
                      <Send size={18} />
                      Contacter
                    </button>
                  </div>
                </div>

                {/* Demandes de maintenance récentes */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-brand-primary text-lg mb-4">
                    Demandes de maintenance récentes
                  </h3>
                  <div className="space-y-3">
                    {maintenanceRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{request.title}</p>
                          <p className="text-sm text-slate-500">{request.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            request.status === 'résolu'
                              ? 'bg-green-100 text-green-700'
                              : request.status === 'en cours'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Paiements */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-brand-primary">Historique des paiements</h2>
                  <button 
                    onClick={() => {
                      // Générer PDF de l'historique complet
                      const pdf = new jsPDF();
                      const currentDate = new Date();
                      
                      // En-tête avec logo
                      pdf.setFillColor(241, 245, 249);
                      pdf.rect(0, 0, 210, 50, 'F');
                      
                      // Logo K
                      pdf.setFillColor(245, 158, 11);
                      pdf.circle(20, 20, 8, 'F');
                      pdf.setTextColor(255, 255, 255);
                      pdf.setFontSize(16);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('K', 20, 23, { align: 'center' });
                      
                      // Titre
                      pdf.setTextColor(51, 65, 85);
                      pdf.setFontSize(20);
                      pdf.text('HISTORIQUE DES PAIEMENTS', 35, 20);
                      
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(100, 116, 139);
                      pdf.text(`Date d'emission : ${currentDate.toLocaleDateString('fr-FR')}`, 35, 28);
                      pdf.text('Locataire - Kushtati Immo', 35, 35);
                      
                      // Infos propriété
                      pdf.setFillColor(241, 245, 249);
                      pdf.roundedRect(15, 55, 180, 35, 3, 3, 'F');
                      
                      pdf.setFontSize(12);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(51, 65, 85);
                      pdf.text('Informations du logement', 20, 65);
                      
                      pdf.setFontSize(9);
                      pdf.setFont('helvetica', 'normal');
                      pdf.text(`Adresse : ${tenantProperty.address}`, 20, 73);
                      pdf.text(`Loyer mensuel : ${formatPrice(tenantProperty.monthlyRent)}`, 20, 80);
                      pdf.text(`Proprietaire : ${tenantProperty.landlord}`, 120, 73);
                      pdf.text(`Contact : ${tenantProperty.landlordPhone}`, 120, 80);
                      
                      // Tableau des paiements
                      let yPos = 100;
                      
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('Historique des Paiements', 15, yPos);
                      yPos += 8;
                      
                      // En-têtes du tableau
                      pdf.setFillColor(245, 158, 11);
                      pdf.rect(15, yPos, 180, 10, 'F');
                      
                      pdf.setFontSize(9);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(255, 255, 255);
                      pdf.text('Periode', 18, yPos + 7);
                      pdf.text('Montant', 70, yPos + 7);
                      pdf.text('Date limite', 105, yPos + 7);
                      pdf.text('Date paiement', 140, yPos + 7);
                      pdf.text('Statut', 175, yPos + 7);
                      yPos += 12;
                      
                      // Données
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(51, 65, 85);
                      
                      paymentHistory.forEach((payment, index) => {
                        // Alternance de couleur
                        if (index % 2 === 0) {
                          pdf.setFillColor(248, 250, 252);
                          pdf.rect(15, yPos - 5, 180, 10, 'F');
                        }
                        
                        pdf.setFontSize(8);
                        pdf.text(payment.month, 18, yPos + 2);
                        pdf.text(formatPrice(payment.amount), 70, yPos + 2);
                        pdf.text(new Date(payment.dueDate).toLocaleDateString('fr-FR'), 105, yPos + 2);
                        
                        if (payment.paidDate) {
                          pdf.text(new Date(payment.paidDate).toLocaleDateString('fr-FR'), 140, yPos + 2);
                        } else {
                          pdf.text('-', 140, yPos + 2);
                        }
                        
                        // Statut avec couleur
                        if (payment.status === 'payé') {
                          pdf.setTextColor(22, 163, 74);
                          pdf.text('Paye', 175, yPos + 2);
                        } else {
                          const isPastDue = new Date(payment.dueDate) < new Date();
                          if (isPastDue) {
                            pdf.setTextColor(220, 38, 38);
                            pdf.text('En retard', 175, yPos + 2);
                          } else {
                            pdf.setTextColor(234, 179, 8);
                            pdf.text('En attente', 175, yPos + 2);
                          }
                        }
                        pdf.setTextColor(51, 65, 85);
                        
                        yPos += 10;
                        
                        if (yPos > 260) {
                          pdf.addPage();
                          yPos = 20;
                        }
                      });
                      
                      // Résumé financier
                      yPos += 10;
                      if (yPos > 240) {
                        pdf.addPage();
                        yPos = 20;
                      }
                      
                      pdf.setFillColor(241, 245, 249);
                      pdf.roundedRect(15, yPos, 180, 35, 3, 3, 'F');
                      
                      yPos += 10;
                      pdf.setFontSize(12);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('Resume Financier', 20, yPos);
                      
                      yPos += 10;
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      
                      const totalPaid = paymentHistory.filter(p => p.status === 'payé').length;
                      const totalPending = paymentHistory.filter(p => p.status === 'en attente').length;
                      const totalAmount = paymentHistory.filter(p => p.status === 'payé').reduce((sum, p) => sum + p.amount, 0);
                      
                      pdf.text(`Total paiements effectues : ${totalPaid} mois`, 20, yPos);
                      yPos += 7;
                      pdf.text(`Montant total paye : ${formatPrice(totalAmount)}`, 20, yPos);
                      yPos += 7;
                      pdf.setTextColor(234, 179, 8);
                      pdf.text(`Paiements en attente : ${totalPending} mois`, 20, yPos);
                      pdf.setTextColor(51, 65, 85);
                      
                      // Pied de page
                      pdf.setDrawColor(226, 232, 240);
                      pdf.setLineWidth(0.5);
                      pdf.line(15, 275, 195, 275);
                      
                      pdf.setFontSize(8);
                      pdf.setTextColor(100, 116, 139);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('KUSHTATI IMMO', 105, 281, { align: 'center' });
                      
                      pdf.setFont('helvetica', 'normal');
                      pdf.text('Conakry, Guinee - Gestion Immobiliere', 105, 285, { align: 'center' });
                      pdf.text('Email: ib362392@gmail.com | Tel: +224 623 93 63 13 | GitHub: kushtati', 105, 289, { align: 'center' });
                      
                      pdf.setFontSize(7);
                      pdf.text(`(c) ${currentDate.getFullYear()} Kushtati Immo - Document genere le ${currentDate.toLocaleDateString('fr-FR')}`, 105, 293, { align: 'center' });
                      
                      // Télécharger le PDF
                      pdf.save(`Kushtati-Historique-Paiements-Locataire-${currentDate.getFullYear()}.pdf`);
                    }}
                    className="bg-brand-accent hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Download size={18} />
                    Télécharger l'historique
                  </button>
                </div>

                {/* Info paiement en avance */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-blue-900 text-sm">
                    💡 <strong>Astuce :</strong> Vous pouvez payer vos loyers à l'avance pour éviter les retards et bénéficier d'une meilleure gestion de votre budget.
                  </p>
                </div>

                <div className="space-y-3">
                  {paymentHistory.map((payment) => {
                    const isPastDue = new Date(payment.dueDate) < new Date() && payment.status === 'en attente';
                    const isAdvancePayment = new Date(payment.dueDate) > new Date() && payment.status === 'en attente';
                    
                    return (
                    <div
                      key={payment.id}
                      className={`bg-white border-2 rounded-xl p-5 hover:border-brand-accent transition-all ${
                        isPastDue ? 'border-red-300 bg-red-50' : isAdvancePayment ? 'border-blue-300 bg-blue-50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="text-brand-accent" size={20} />
                            <p className="font-bold text-slate-800">{payment.month}</p>
                          </div>
                          <p className="text-sm text-slate-600 mb-1">
                            Date limite : {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                          </p>
                          {payment.paidDate && (
                            <p className="text-sm text-green-600">
                              Payé le : {new Date(payment.paidDate).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          {payment.paymentMethod && (
                            <p className="text-xs text-slate-500 mt-1">
                              Moyen: {payment.paymentMethod}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-brand-primary mb-2">
                            {formatPrice(payment.amount)}
                          </p>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                              payment.status === 'payé'
                                ? 'bg-green-100 text-green-700'
                                : isPastDue
                                ? 'bg-red-100 text-red-700'
                                : isAdvancePayment
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {payment.status === 'payé' 
                              ? 'payé' 
                              : isPastDue 
                              ? 'en retard' 
                              : isAdvancePayment
                              ? 'paiement anticipé'
                              : 'en attente'}
                          </span>
                        </div>
                      </div>
                      {payment.status === 'en attente' && (
                        <>
                          {isAdvancePayment && (
                            <div className="mt-3 bg-blue-100 border border-blue-300 rounded-lg p-3">
                              <p className="text-sm text-blue-800">
                                ⏰ Paiement anticipé pour {payment.month} - Échéance : {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          )}
                          {isPastDue && (
                            <div className="mt-3 bg-red-100 border border-red-300 rounded-lg p-3">
                              <p className="text-sm text-red-800 font-semibold">
                                ⚠️ Paiement en retard ! Veuillez régulariser au plus vite.
                              </p>
                            </div>
                          )}
                          <button 
                            onClick={() => handlePaymentClick(payment)}
                            className={`mt-4 w-full text-white py-2 rounded-lg font-semibold transition-all ${
                              isPastDue 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : isAdvancePayment
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-amber-600 hover:bg-amber-700'
                            }`}
                          >
                            {isAdvancePayment ? 'Payer en avance' : 'Payer maintenant'}
                          </button>
                        </>
                      )}
                      {payment.status === 'payé' && payment.transactionId && (
                        <button 
                          onClick={() => generateReceipt(payment)}
                          className="mt-4 w-full bg-brand-primary hover:bg-slate-800 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Download size={18} />
                          Télécharger le reçu
                        </button>
                      )}
                    </div>
                  );
                  })}
                </div>
              </div>
            )}

            {/* Maintenance */}
            {activeTab === 'maintenance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-brand-primary">Demandes de maintenance</h2>
                  <button className="bg-brand-accent hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold transition-all">
                    Nouvelle demande
                  </button>
                </div>

                <div className="space-y-4">
                  {maintenanceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-brand-accent transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Wrench className="text-brand-accent" size={24} />
                            <h3 className="font-bold text-lg text-slate-800">{request.title}</h3>
                          </div>
                          <p className="text-slate-600 mb-3">{request.description}</p>
                          <p className="text-sm text-slate-500">
                            Créée le : {new Date(request.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              request.status === 'résolu'
                                ? 'bg-green-100 text-green-700'
                                : request.status === 'en cours'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {request.status}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              request.priority === 'haute'
                                ? 'bg-red-100 text-red-700'
                                : request.priority === 'moyenne'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {request.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contrat */}
            {activeTab === 'contract' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary mb-6">Mon contrat de location</h2>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Propriété</p>
                      <p className="font-bold text-slate-800 text-lg">{tenantProperty.title}</p>
                      <p className="text-slate-600">{tenantProperty.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Propriétaire</p>
                      <p className="font-semibold text-slate-800">{tenantProperty.landlord}</p>
                      <p className="text-slate-600">{tenantProperty.landlordPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Date de début</p>
                      <p className="font-semibold text-slate-800">
                        {new Date(tenantProperty.contractStart).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Date de fin</p>
                      <p className="font-semibold text-slate-800">
                        {new Date(tenantProperty.contractEnd).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Loyer mensuel</p>
                      <p className="font-bold text-brand-accent text-xl">
                        {formatPrice(tenantProperty.monthlyRent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Caution</p>
                      <p className="font-semibold text-slate-800">
                        {formatPrice(tenantProperty.deposit)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-300">
                    <button className="bg-brand-accent hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                      <Download size={20} />
                      Télécharger le contrat PDF
                    </button>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3">Conditions du contrat</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Durée du bail : 2 ans</li>
                    <li>• Paiement du loyer : Le 5 de chaque mois</li>
                    <li>• Charges incluses : Eau, ordures ménagères</li>
                    <li>• Charges non incluses : Électricité, Internet</li>
                    <li>• Préavis de départ : 3 mois</li>
                    <li>• Restitution caution : Sous 2 mois après état des lieux de sortie</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary mb-6">Messages</h2>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
                  <MessageSquare className="mx-auto text-amber-600 mb-4" size={48} />
                  <p className="text-amber-900 font-semibold mb-2">Messagerie disponible prochainement</p>
                  <p className="text-amber-700 text-sm">
                    En attendant, vous pouvez contacter votre propriétaire par téléphone ou email.
                  </p>
                  <div className="mt-6 space-y-2">
                    <p className="text-slate-700">
                      <strong>{tenantProperty.landlord}</strong>
                    </p>
                    <p className="text-slate-600">{tenantProperty.landlordPhone}</p>
                    <p className="text-slate-600">{tenantProperty.landlordEmail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de paiement */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-brand-primary">Effectuer un paiement</h2>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod('');
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Récapitulatif du paiement */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                <h3 className="font-bold text-brand-primary mb-4">Détails du paiement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Période :</span>
                    <span className="font-semibold text-slate-800">{selectedPayment.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date limite :</span>
                    <span className="font-semibold text-slate-800">
                      {new Date(selectedPayment.dueDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-amber-300">
                    <span className="text-lg font-bold text-brand-primary">Montant total :</span>
                    <span className="text-2xl font-bold text-brand-accent">
                      {formatPrice(selectedPayment.amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sélection du moyen de paiement */}
              <div>
                <h3 className="font-bold text-brand-primary mb-4">Choisissez un moyen de paiement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Carte bancaire */}
                  <button
                    onClick={() => setSelectedPaymentMethod('carte')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'carte'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-brand-accent" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">Carte bancaire</p>
                        <p className="text-xs text-slate-500">Visa, Mastercard</p>
                      </div>
                    </div>
                  </button>

                  {/* Virement bancaire */}
                  <button
                    onClick={() => setSelectedPaymentMethod('virement')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'virement'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="text-brand-accent" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">Virement</p>
                        <p className="text-xs text-slate-500">Transfert bancaire</p>
                      </div>
                    </div>
                  </button>

                  {/* Orange Money */}
                  <button
                    onClick={() => setSelectedPaymentMethod('orange')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'orange'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-orange-500" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">Orange Money</p>
                        <p className="text-xs text-slate-500">Paiement mobile</p>
                      </div>
                    </div>
                  </button>

                  {/* MTN Mobile Money */}
                  <button
                    onClick={() => setSelectedPaymentMethod('mtn')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'mtn'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-yellow-500" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">MTN Money</p>
                        <p className="text-xs text-slate-500">Paiement mobile</p>
                      </div>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => setSelectedPaymentMethod('paypal')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'paypal'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="text-blue-600" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">PayPal</p>
                        <p className="text-xs text-slate-500">Paiement en ligne</p>
                      </div>
                    </div>
                  </button>

                  {/* Espèces */}
                  <button
                    onClick={() => setSelectedPaymentMethod('especes')}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      selectedPaymentMethod === 'especes'
                        ? 'border-brand-accent bg-amber-50'
                        : 'border-slate-200 hover:border-brand-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="text-green-600" size={32} />
                      <div className="text-left">
                        <p className="font-bold text-slate-800">Espèces</p>
                        <p className="text-xs text-slate-500">Remise en main propre</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Informations supplémentaires selon le moyen de paiement */}
              {selectedPaymentMethod === 'carte' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h4 className="font-bold text-slate-900 mb-3">Informations de carte bancaire</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Numéro de carte</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Date d'expiration</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">🔒 Paiement sécurisé - Vos données sont protégées</p>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'virement' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Informations bancaires</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Bénéficiaire :</strong> {tenantProperty.landlord}</p>
                    <p><strong>Banque :</strong> Société Générale de Banques en Guinée</p>
                    <p><strong>IBAN :</strong> GN12 3456 7890 1234 5678 9012</p>
                    <p><strong>Référence :</strong> {selectedPayment.month}</p>
                  </div>
                </div>
              )}

              {(selectedPaymentMethod === 'orange' || selectedPaymentMethod === 'mtn') && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">Instructions de paiement mobile</h4>
                  <div className="text-sm text-yellow-800 space-y-1">
                    <p>1. {selectedPaymentMethod === 'orange' ? 'Composez #144#' : 'Composez *146#'} sur votre téléphone</p>
                    <p>2. Sélectionnez "Transfert d'argent"</p>
                    <p>3. Entrez le numéro : {tenantProperty.landlordPhone}</p>
                    <p>4. Montant : {formatPrice(selectedPayment.amount)}</p>
                    <p>5. Confirmez avec votre code PIN</p>
                    <p className="mt-2 font-semibold">Ou cliquez sur "Confirmer" pour recevoir une notification de paiement</p>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'paypal' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Paiement PayPal</h4>
                  <p className="text-sm text-blue-800">
                    Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.
                  </p>
                </div>
              )}

              {selectedPaymentMethod === 'especes' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-bold text-green-900 mb-2">Paiement en espèces</h4>
                  <p className="text-sm text-green-800">
                    Veuillez contacter votre propriétaire pour convenir d'un rendez-vous pour la remise des espèces.
                    Un reçu vous sera fourni.
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedPaymentMethod('');
                    setSelectedPayment(null);
                  }}
                  disabled={isProcessing}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    isProcessing
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  Annuler
                </button>
                <button
                  onClick={handleProcessPayment}
                  disabled={!selectedPaymentMethod || isProcessing}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    selectedPaymentMethod && !isProcessing
                      ? 'bg-brand-accent hover:bg-amber-600 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Traitement...
                    </span>
                  ) : (
                    'Confirmer le paiement'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboardPage;
