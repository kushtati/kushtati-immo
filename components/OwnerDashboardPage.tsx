import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { 
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Upload,
  Clock,
  Send,
  Settings,
  Bell,
  BarChart3
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'disponible' | 'loué' | 'vendu';
  tenant?: string;
  lastPayment?: string;
  unpaidMonths?: number;
  contractEndDate?: string;
}

interface Contract {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenant: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'actif' | 'expiré' | 'résilié';
}

interface Maintenance {
  id: string;
  propertyId: string;
  propertyTitle: string;
  type: string;
  description: string;
  cost: number;
  date: string;
  status: 'en_attente' | 'en_cours' | 'terminé';
}

interface OwnerDashboardPageProps {
  onAddProperty: () => void;
}

/**
 * Tableau de bord propriétaire
 */
export const OwnerDashboardPage: React.FC<OwnerDashboardPageProps> = ({ onAddProperty }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'payments' | 'contracts' | 'maintenance' | 'reports'>('overview');

  // Données de démonstration
  const myProperties: Property[] = [
    {
      id: '1',
      title: 'Villa Moderne Kaloum',
      location: 'Kaloum, Conakry',
      price: 5000000,
      status: 'loué',
      tenant: 'Mamadou Diallo',
      lastPayment: '2025-11-01',
      unpaidMonths: 0
    },
    {
      id: '2',
      title: 'Appartement Matam',
      location: 'Matam, Conakry',
      price: 3500000,
      status: 'loué',
      tenant: 'Aissatou Bah',
      lastPayment: '2025-09-15',
      unpaidMonths: 2,
      contractEndDate: '2026-08-15'
    },
    {
      id: '3',
      title: 'Bureau Centre-Ville',
      location: 'Almamya, Kaloum',
      price: 4000000,
      status: 'disponible'
    },
    {
      id: '4',
      title: 'Villa Kipé',
      location: 'Kipé, Ratoma',
      price: 6500000,
      status: 'loué',
      tenant: 'Ibrahima Sylla',
      lastPayment: '2025-11-05',
      unpaidMonths: 0,
      contractEndDate: '2026-12-31'
    }
  ];

  // Contrats
  const contracts: Contract[] = [
    {
      id: 'C1',
      propertyId: '1',
      propertyTitle: 'Villa Moderne Kaloum',
      tenant: 'Mamadou Diallo',
      tenantPhone: '+224 623 45 67 89',
      startDate: '2024-10-01',
      endDate: '2026-09-30',
      monthlyRent: 5000000,
      deposit: 10000000,
      status: 'actif'
    },
    {
      id: 'C2',
      propertyId: '2',
      propertyTitle: 'Appartement Matam',
      tenant: 'Aissatou Bah',
      tenantPhone: '+224 657 89 01 23',
      startDate: '2024-08-15',
      endDate: '2026-08-15',
      monthlyRent: 3500000,
      deposit: 7000000,
      status: 'actif'
    },
    {
      id: 'C3',
      propertyId: '4',
      propertyTitle: 'Villa Kipé',
      tenant: 'Ibrahima Sylla',
      tenantPhone: '+224 620 11 22 33',
      startDate: '2025-01-01',
      endDate: '2026-12-31',
      monthlyRent: 6500000,
      deposit: 13000000,
      status: 'actif'
    }
  ];

  // Maintenance
  const maintenanceList: Maintenance[] = [
    {
      id: 'M1',
      propertyId: '1',
      propertyTitle: 'Villa Moderne Kaloum',
      type: 'Plomberie',
      description: 'Réparation fuite salle de bain',
      cost: 500000,
      date: '2025-11-20',
      status: 'terminé'
    },
    {
      id: 'M2',
      propertyId: '2',
      propertyTitle: 'Appartement Matam',
      type: 'Électricité',
      description: 'Remplacement tableau électrique',
      cost: 1200000,
      date: '2025-11-25',
      status: 'en_cours'
    },
    {
      id: 'M3',
      propertyId: '4',
      propertyTitle: 'Villa Kipé',
      type: 'Peinture',
      description: 'Rénovation façade extérieure',
      cost: 3500000,
      date: '2025-12-01',
      status: 'en_attente'
    }
  ];

  const stats = {
    totalProperties: myProperties.length,
    rentedProperties: myProperties.filter(p => p.status === 'loué').length,
    availableProperties: myProperties.filter(p => p.status === 'disponible').length,
    monthlyRevenue: myProperties
      .filter(p => p.status === 'loué')
      .reduce((sum, p) => sum + p.price, 0),
    unpaidAmount: myProperties
      .filter(p => p.unpaidMonths && p.unpaidMonths > 0)
      .reduce((sum, p) => sum + (p.price * (p.unpaidMonths || 0)), 0)
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'GNF',
      minimumFractionDigits: 0
    }).format(price).replace(/\s/g, ' ');
  };

  return (
    <section className="relative py-20 min-h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-5xl font-serif font-bold text-brand-primary mb-4">
              Tableau de Bord Propriétaire
            </h1>
            <p className="text-slate-600 text-lg">
              Gérez vos propriétés et suivez vos revenus
            </p>
          </div>
          <button
            onClick={onAddProperty}
            className="mt-4 md:mt-0 bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Ajouter une propriété
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total propriétés */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Home className="text-blue-600" size={24} />
              </div>
              <span className="text-sm font-semibold text-slate-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-brand-primary mb-1">
              {stats.totalProperties}
            </h3>
            <p className="text-slate-600 text-sm">Propriétés</p>
          </div>

          {/* Propriétés louées */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <span className="text-sm font-semibold text-slate-500">Louées</span>
            </div>
            <h3 className="text-3xl font-bold text-green-600 mb-1">
              {stats.rentedProperties}
            </h3>
            <p className="text-slate-600 text-sm">Propriétés occupées</p>
          </div>

          {/* Revenus mensuels */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-brand-accent/10 p-3 rounded-lg">
                <TrendingUp className="text-brand-accent" size={24} />
              </div>
              <span className="text-sm font-semibold text-slate-500">Revenus</span>
            </div>
            <h3 className="text-2xl font-bold text-brand-primary mb-1">
              {formatPrice(stats.monthlyRevenue)}
            </h3>
            <p className="text-slate-600 text-sm">Par mois</p>
          </div>

          {/* Impayés */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <span className="text-sm font-semibold text-slate-500">Impayés</span>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-1">
              {formatPrice(stats.unpaidAmount)}
            </h3>
            <p className="text-slate-600 text-sm">À recouvrer</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-têtes d'onglets */}
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'properties'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Propriétés
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'contracts'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Contrats
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'payments'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Paiements
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'maintenance'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex-1 min-w-[120px] py-4 px-3 text-sm font-bold transition-colors ${
                activeTab === 'reports'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Rapports
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary mb-4">
                  Activité récente
                </h2>
                
                {/* Alertes impayés */}
                {myProperties.filter(p => p.unpaidMonths && p.unpaidMonths > 0).length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-red-800 mb-2">Attention : Impayés détectés</h3>
                        <ul className="space-y-1">
                          {myProperties
                            .filter(p => p.unpaidMonths && p.unpaidMonths > 0)
                            .map(property => (
                              <li key={property.id} className="text-red-700 text-sm">
                                <strong>{property.title}</strong> - {property.tenant} : {property.unpaidMonths} mois impayés
                                ({formatPrice(property.price * (property.unpaidMonths || 0))})
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Propriétés disponibles */}
                {stats.availableProperties > 0 && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Home className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-blue-800 mb-2">
                          {stats.availableProperties} propriété(s) disponible(s)
                        </h3>
                        <p className="text-blue-700 text-sm">
                          Pensez à promouvoir vos propriétés pour trouver des locataires rapidement.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mes Propriétés */}
            {activeTab === 'properties' && (
              <div className="space-y-4">
                {myProperties.map(property => (
                  <div key={property.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-brand-primary">
                            {property.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            property.status === 'loué' 
                              ? 'bg-green-100 text-green-700'
                              : property.status === 'disponible'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {property.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-2">{property.location}</p>
                        <p className="text-brand-accent font-bold text-lg">
                          {formatPrice(property.price)}/mois
                        </p>
                        {property.tenant && (
                          <p className="text-sm text-slate-500 mt-2">
                            Locataire : <strong>{property.tenant}</strong>
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={20} />
                        </button>
                        <button className="p-2 text-brand-accent hover:bg-amber-50 rounded-lg transition-colors">
                          <Edit size={20} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paiements */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-brand-primary">
                    Suivi des paiements
                  </h2>
                  <button 
                    onClick={() => {
                      // Générer PDF de l'historique des paiements
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
                      pdf.text('Kushtati Immo - Gestion Immobiliere', 35, 35);
                      
                      // Tableau des paiements
                      let yPos = 60;
                      
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(51, 65, 85);
                      pdf.text('Recapitulatif des Paiements', 15, yPos);
                      yPos += 10;
                      
                      // En-têtes du tableau
                      pdf.setFillColor(245, 158, 11);
                      pdf.rect(15, yPos, 180, 10, 'F');
                      
                      pdf.setFontSize(9);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(255, 255, 255);
                      pdf.text('Propriete', 18, yPos + 7);
                      pdf.text('Locataire', 75, yPos + 7);
                      pdf.text('Loyer', 125, yPos + 7);
                      pdf.text('Statut', 160, yPos + 7);
                      yPos += 12;
                      
                      // Données
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(51, 65, 85);
                      
                      myProperties.filter(p => p.status === 'loué').forEach((property, index) => {
                        // Alternance de couleur
                        if (index % 2 === 0) {
                          pdf.setFillColor(248, 250, 252);
                          pdf.rect(15, yPos - 5, 180, 10, 'F');
                        }
                        
                        pdf.setFontSize(8);
                        pdf.text(property.title.substring(0, 25), 18, yPos + 2);
                        pdf.text(property.tenant || 'N/A', 75, yPos + 2);
                        pdf.text(formatPrice(property.price), 125, yPos + 2);
                        
                        if (property.unpaidMonths && property.unpaidMonths > 0) {
                          pdf.setTextColor(220, 38, 38);
                          pdf.text(`${property.unpaidMonths} mois impaye(s)`, 160, yPos + 2);
                        } else {
                          pdf.setTextColor(22, 163, 74);
                          pdf.text('A jour', 160, yPos + 2);
                        }
                        pdf.setTextColor(51, 65, 85);
                        
                        yPos += 10;
                        
                        if (yPos > 270) {
                          pdf.addPage();
                          yPos = 20;
                        }
                      });
                      
                      // Résumé financier
                      yPos += 15;
                      if (yPos > 250) {
                        pdf.addPage();
                        yPos = 20;
                      }
                      
                      pdf.setFillColor(241, 245, 249);
                      pdf.roundedRect(15, yPos, 180, 40, 3, 3, 'F');
                      
                      yPos += 10;
                      pdf.setFontSize(12);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('Resume Financier', 20, yPos);
                      
                      yPos += 10;
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      
                      const totalRevenue = myProperties
                        .filter(p => p.status === 'loué')
                        .reduce((sum, p) => sum + p.price, 0);
                      const totalUnpaid = myProperties
                        .filter(p => p.status === 'loué' && p.unpaidMonths)
                        .reduce((sum, p) => sum + (p.price * (p.unpaidMonths || 0)), 0);
                      
                      pdf.text(`Revenu mensuel total : ${formatPrice(totalRevenue)}`, 20, yPos);
                      yPos += 8;
                      pdf.setTextColor(220, 38, 38);
                      pdf.text(`Impayes totaux : ${formatPrice(totalUnpaid)}`, 20, yPos);
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
                      pdf.save(`Kushtati-Historique-Paiements-${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.pdf`);
                    }}
                    className="bg-brand-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center gap-2"
                  >
                    <Download size={20} />
                    Télécharger l'historique
                  </button>
                </div>
                
                {myProperties
                  .filter(p => p.status === 'loué')
                  .map(property => (
                    <div key={property.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-brand-primary text-lg">
                            {property.title}
                          </h3>
                          <p className="text-sm text-slate-600">
                            Locataire : {property.tenant}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(property.price)}
                          </p>
                          <p className="text-xs text-slate-500">par mois</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-600">
                          Dernier paiement : {property.lastPayment}
                        </span>
                      </div>

                      {property.unpaidMonths && property.unpaidMonths > 0 ? (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                          <XCircle size={20} className="text-red-600" />
                          <div className="flex-1">
                            <p className="font-bold text-red-800">
                              {property.unpaidMonths} mois impayés
                            </p>
                            <p className="text-sm text-red-700">
                              Montant dû : {formatPrice(property.price * property.unpaidMonths)}
                            </p>
                          </div>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                            Relancer
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                          <CheckCircle size={20} className="text-green-600" />
                          <p className="text-green-800 font-semibold">À jour</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Contrats */}
            {activeTab === 'contracts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-brand-primary">
                    Gestion des contrats
                  </h2>
                  <button className="bg-brand-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Nouveau contrat
                  </button>
                </div>
                
                {contracts.map(contract => (
                  <div key={contract.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="text-brand-accent" size={24} />
                          <h3 className="text-xl font-bold text-brand-primary">
                            {contract.propertyTitle}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            contract.status === 'actif' 
                              ? 'bg-green-100 text-green-700'
                              : contract.status === 'expiré'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {contract.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-slate-500">Locataire</p>
                            <p className="font-semibold text-slate-800">{contract.tenant}</p>
                            <p className="text-sm text-slate-600">{contract.tenantPhone}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-500">Période</p>
                            <p className="font-semibold text-slate-800">
                              Du {contract.startDate} au {contract.endDate}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-500">Loyer mensuel</p>
                            <p className="font-bold text-brand-accent text-lg">
                              {formatPrice(contract.monthlyRent)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-500">Caution</p>
                            <p className="font-semibold text-slate-800">
                              {formatPrice(contract.deposit)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Download size={16} />
                        Télécharger PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <Send size={16} />
                        Envoyer par email
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-brand-accent rounded-lg hover:bg-amber-100 transition-colors">
                        <Edit size={16} />
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Maintenance */}
            {activeTab === 'maintenance' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-brand-primary">
                    Suivi de la maintenance
                  </h2>
                  <button className="bg-brand-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Nouvelle intervention
                  </button>
                </div>
                
                {maintenanceList.map(item => (
                  <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Settings className="text-slate-400" size={20} />
                          <h3 className="font-bold text-brand-primary">
                            {item.type} - {item.propertyTitle}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'terminé' 
                              ? 'bg-green-100 text-green-700'
                              : item.status === 'en_cours'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 mb-3">{item.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            <span className="text-slate-600">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-slate-400" />
                            <span className="font-bold text-brand-accent">
                              {formatPrice(item.cost)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="p-2 text-brand-accent hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rapports */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary mb-4">
                  Rapports et statistiques
                </h2>
                
                {/* Statistiques financières */}
                <div className="bg-gradient-to-r from-brand-primary to-slate-700 text-white rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BarChart3 size={24} />
                    Performance financière
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Revenus annuels</p>
                      <p className="text-2xl font-bold">
                        {formatPrice(stats.monthlyRevenue * 12)}
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        {formatPrice(stats.monthlyRevenue)}/mois
                      </p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Dépenses maintenance</p>
                      <p className="text-2xl font-bold">
                        {formatPrice(maintenanceList.reduce((sum, m) => sum + m.cost, 0))}
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        {maintenanceList.length} interventions
                      </p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Bénéfice net</p>
                      <p className="text-2xl font-bold">
                        {formatPrice((stats.monthlyRevenue * 12) - maintenanceList.reduce((sum, m) => sum + m.cost, 0))}
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        Après dépenses
                      </p>
                    </div>
                  </div>
                </div>

                {/* Graphiques et analyses */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Revenus par propriété */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="font-bold text-brand-primary text-lg mb-4">
                      Revenus par propriété
                    </h3>
                    <div className="space-y-3">
                      {myProperties
                        .filter(p => p.status === 'loué')
                        .map(property => {
                          const percentage = (property.price / stats.monthlyRevenue) * 100;
                          return (
                            <div key={property.id}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-semibold text-slate-700">
                                  {property.title}
                                </span>
                                <span className="text-sm font-bold text-brand-accent">
                                  {formatPrice(property.price)}
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-brand-accent rounded-full h-2 transition-all"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                {percentage.toFixed(1)}% du total
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Statut des propriétés */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="font-bold text-brand-primary text-lg mb-4">
                      Statut des propriétés
                    </h3>
                    <div className="space-y-4">
                      {/* Graphique en barre horizontale */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-green-700">
                            Louées
                          </span>
                          <span className="text-sm font-bold">
                            {stats.rentedProperties} / {stats.totalProperties}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-8 flex overflow-hidden">
                          <div
                            className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${(stats.rentedProperties / stats.totalProperties) * 100}%` }}
                          >
                            {((stats.rentedProperties / stats.totalProperties) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-blue-700">
                            Disponibles
                          </span>
                          <span className="text-sm font-bold">
                            {stats.availableProperties} / {stats.totalProperties}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-8 flex overflow-hidden">
                          <div
                            className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${(stats.availableProperties / stats.totalProperties) * 100}%` }}
                          >
                            {((stats.availableProperties / stats.totalProperties) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-sm text-slate-600">
                          Taux d'occupation : <span className="font-bold text-brand-primary">
                            {((stats.rentedProperties / stats.totalProperties) * 100).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Évolution des paiements */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="font-bold text-brand-primary text-lg mb-4">
                      Situation des paiements
                    </h3>
                    <div className="space-y-4">
                      {/* Paiements à jour */}
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={24} />
                          <div>
                            <p className="font-semibold text-green-800">À jour</p>
                            <p className="text-xs text-green-600">
                              {myProperties.filter(p => p.status === 'loué' && (!p.unpaidMonths || p.unpaidMonths === 0)).length} propriétés
                            </p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(
                            myProperties
                              .filter(p => p.status === 'loué' && (!p.unpaidMonths || p.unpaidMonths === 0))
                              .reduce((sum, p) => sum + p.price, 0)
                          )}
                        </p>
                      </div>

                      {/* Impayés */}
                      {stats.unpaidAmount > 0 && (
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <XCircle className="text-red-600" size={24} />
                            <div>
                              <p className="font-semibold text-red-800">Impayés</p>
                              <p className="text-xs text-red-600">
                                {myProperties.filter(p => p.unpaidMonths && p.unpaidMonths > 0).length} propriétés
                              </p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-red-600">
                            {formatPrice(stats.unpaidAmount)}
                          </p>
                        </div>
                      )}

                      {/* Taux de recouvrement */}
                      <div className="pt-4 border-t">
                        <p className="text-sm text-slate-600 mb-2">
                          Taux de recouvrement
                        </p>
                        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-4 flex items-center justify-center text-white text-xs font-bold"
                            style={{ 
                              width: `${((stats.monthlyRevenue - stats.unpaidAmount) / stats.monthlyRevenue) * 100}%` 
                            }}
                          >
                            {(((stats.monthlyRevenue - stats.unpaidAmount) / stats.monthlyRevenue) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Répartition des dépenses */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="font-bold text-brand-primary text-lg mb-4">
                      Dépenses de maintenance
                    </h3>
                    <div className="space-y-3">
                      {['Plomberie', 'Électricité', 'Peinture'].map(type => {
                        const typeCost = maintenanceList
                          .filter(m => m.type === type)
                          .reduce((sum, m) => sum + m.cost, 0);
                        const totalCost = maintenanceList.reduce((sum, m) => sum + m.cost, 0);
                        const percentage = totalCost > 0 ? (typeCost / totalCost) * 100 : 0;
                        
                        return (
                          <div key={type}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-semibold text-slate-700">
                                {type}
                              </span>
                              <span className="text-sm font-bold text-slate-800">
                                {formatPrice(typeCost)}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-brand-primary rounded-full h-2 transition-all"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {percentage.toFixed(1)}% du total
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="grid md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      // Générer un rapport PDF professionnel
                      const currentDate = new Date();
                      const pdf = new jsPDF();
                      
                      // Configuration des couleurs
                      const primaryColor: [number, number, number] = [51, 65, 85]; // #334155
                      const accentColor: [number, number, number] = [245, 158, 11]; // #f59e0b
                      const lightGray: [number, number, number] = [241, 245, 249]; // #f1f5f9
                      
                      let yPos = 20;
                      
                      // En-tête avec logo
                      pdf.setFillColor(...accentColor);
                      pdf.rect(0, 0, 210, 50, 'F');
                      
                      // Dessiner le logo K à gauche (proportions du SVG: viewBox 0 0 100 100)
                      const logoScale = 0.3;
                      const logoX = 15;
                      const logoY = 12;
                      
                      pdf.setLineWidth(2.5);
                      // Ligne verticale du K (M25 15V85)
                      pdf.setDrawColor(255, 255, 255);
                      pdf.line(logoX + 25*logoScale, logoY + 15*logoScale, logoX + 25*logoScale, logoY + 85*logoScale);
                      
                      // Ligne diagonale haute du K (M25 50L65 15) - amber clair
                      pdf.setDrawColor(217, 151, 6);
                      pdf.line(logoX + 25*logoScale, logoY + 50*logoScale, logoX + 65*logoScale, logoY + 15*logoScale);
                      
                      // Ligne diagonale basse du K (M45 32.5L75 85) - amber clair
                      pdf.line(logoX + 45*logoScale, logoY + 32.5*logoScale, logoX + 75*logoScale, logoY + 85*logoScale);
                      
                      // Accent horizontal (M65 15H85)
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
                      
                      // Sous-titre et date à droite
                      pdf.setFontSize(16);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('Rapport Mensuel', 195, 23, { align: 'right' });
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.text(currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }), 195, 30, { align: 'right' });
                      pdf.text(`Ref: RM-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`, 195, 36, { align: 'right' });
                      
                      yPos = 60;
                      
                      // Bloc Résumé Financier avec fond
                      pdf.setFillColor(...lightGray);
                      pdf.roundedRect(15, yPos, 180, 45, 3, 3, 'F');
                      
                      yPos += 8;
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...accentColor);
                      pdf.text('RESUME FINANCIER', 20, yPos);
                      yPos += 10;
                      
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(...primaryColor);
                      
                      const financialStats = [
                        ['Revenus Mensuels:', formatPrice(stats.monthlyRevenue)],
                        ['Revenus Annuels:', formatPrice(stats.monthlyRevenue * 12)],
                        ['Depenses Maintenance:', formatPrice(maintenanceList.reduce((sum, m) => sum + m.cost, 0))],
                        ['Benefice Net:', formatPrice((stats.monthlyRevenue * 12) - maintenanceList.reduce((sum, m) => sum + m.cost, 0))]
                      ];
                      
                      financialStats.forEach(([label, value]) => {
                        pdf.text(label, 20, yPos);
                        pdf.setFont('helvetica', 'bold');
                        pdf.setFontSize(11);
                        pdf.text(value, 120, yPos);
                        pdf.setFontSize(10);
                        pdf.setFont('helvetica', 'normal');
                        yPos += 7;
                      });
                      
                      yPos += 8;
                      
                      // Bloc Portefeuille Immobilier avec fond
                      pdf.setFillColor(...lightGray);
                      pdf.roundedRect(15, yPos, 180, 38, 3, 3, 'F');
                      
                      yPos += 8;
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...accentColor);
                      pdf.text('PORTEFEUILLE IMMOBILIER', 20, yPos);
                      yPos += 10;
                      
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(...primaryColor);
                      
                      const portfolioStats = [
                        ['Total Proprietes:', stats.totalProperties.toString()],
                        ['Proprietes Louees:', stats.rentedProperties.toString()],
                        ['Proprietes Disponibles:', stats.availableProperties.toString()],
                        ['Taux d\'Occupation:', `${((stats.rentedProperties / stats.totalProperties) * 100).toFixed(1)}%`]
                      ];
                      
                      portfolioStats.forEach(([label, value]) => {
                        pdf.text(label, 20, yPos);
                        pdf.setFont('helvetica', 'bold');
                        pdf.setFontSize(11);
                        pdf.text(value, 120, yPos);
                        pdf.setFontSize(10);
                        pdf.setFont('helvetica', 'normal');
                        yPos += 6;
                      });
                      
                      yPos += 10;
                      
                      // Détail par propriété
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...accentColor);
                      pdf.text('DETAIL PAR PROPRIETE', 20, yPos);
                      yPos += 8;
                      
                      pdf.setFontSize(9);
                      myProperties.forEach((p, index) => {
                        if (yPos > 250) {
                          pdf.addPage();
                          yPos = 25;
                        }
                        
                        // Fond alterné pour chaque propriété
                        if (index % 2 === 0) {
                          pdf.setFillColor(248, 250, 252);
                          pdf.roundedRect(15, yPos - 3, 180, 24, 2, 2, 'F');
                        }
                        
                        pdf.setFont('helvetica', 'bold');
                        pdf.setFontSize(11);
                        pdf.setTextColor(...primaryColor);
                        pdf.text(p.title, 20, yPos);
                        yPos += 6;
                        
                        pdf.setFont('helvetica', 'normal');
                        pdf.setFontSize(9);
                        pdf.text(`${p.location}`, 20, yPos);
                        
                        pdf.setFont('helvetica', 'bold');
                        pdf.setTextColor(...accentColor);
                        pdf.text(`${formatPrice(p.price)}/mois`, 120, yPos);
                        pdf.setTextColor(...primaryColor);
                        pdf.setFont('helvetica', 'normal');
                        yPos += 5;
                        
                        if (p.tenant) {
                          pdf.setFontSize(8);
                          pdf.text(`Locataire: ${p.tenant}`, 20, yPos);
                          if (p.lastPayment) {
                            pdf.text(`Dernier paiement: ${p.lastPayment}`, 100, yPos);
                          }
                          yPos += 4;
                        }
                        
                        if (p.unpaidMonths && p.unpaidMonths > 0) {
                          pdf.setFillColor(254, 226, 226);
                          pdf.roundedRect(18, yPos - 2, 80, 5, 1, 1, 'F');
                          pdf.setFontSize(8);
                          pdf.setFont('helvetica', 'bold');
                          pdf.setTextColor(220, 38, 38);
                          pdf.text(`${p.unpaidMonths} mois impaye(s) - ${formatPrice(p.price * p.unpaidMonths)}`, 20, yPos);
                          pdf.setTextColor(...primaryColor);
                          pdf.setFont('helvetica', 'normal');
                        } else {
                          pdf.setFillColor(220, 252, 231);
                          pdf.roundedRect(18, yPos - 2, 40, 5, 1, 1, 'F');
                          pdf.setFontSize(8);
                          pdf.setFont('helvetica', 'bold');
                          pdf.setTextColor(22, 163, 74);
                          pdf.text('Paiements a jour', 20, yPos);
                          pdf.setTextColor(...primaryColor);
                          pdf.setFont('helvetica', 'normal');
                        }
                        
                        yPos += 8;
                      });
                      
                      // Pied de page professionnel
                      const pageCount = pdf.internal.pages.length - 1;
                      for (let i = 1; i <= pageCount; i++) {
                        pdf.setPage(i);
                        
                        // Ligne de séparation
                        pdf.setDrawColor(226, 232, 240);
                        pdf.setLineWidth(0.5);
                        pdf.line(15, 275, 195, 275);
                        
                        // Logo et texte dans le footer
                        pdf.setFontSize(8);
                        pdf.setTextColor(100, 116, 139);
                        pdf.setFont('helvetica', 'bold');
                        pdf.text('KUSHTATI IMMO', 105, 281, { align: 'center' });
                        
                        pdf.setFont('helvetica', 'normal');
                        pdf.text('Conakry, Guinee', 105, 285, { align: 'center' });
                        pdf.text('Email: ib362392@gmail.com | Tel: +224 623 93 63 13 | GitHub: kushtati', 105, 289, { align: 'center' });
                        
                        pdf.setFontSize(7);
                        pdf.text(`(c) ${currentDate.getFullYear()} Kushtati Immo - Tous droits reserves - Page ${i}/${pageCount}`, 105, 293, { align: 'center' });
                      }
                      
                      // Télécharger le PDF
                      pdf.save(`Kushtati-Rapport-Mensuel-${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.pdf`);
                      
                      alert('Rapport mensuel PDF généré avec succès !');
                    }}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-brand-accent hover:shadow-lg transition-all text-left"
                  >
                    <Download className="text-brand-accent mb-3" size={32} />
                    <h4 className="font-bold text-brand-primary text-lg mb-2">
                      Télécharger rapport mensuel
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Générer un rapport détaillé de vos activités du mois
                    </p>
                  </button>

                  <button 
                    onClick={() => {
                      // Générer déclaration fiscale en PDF
                      const currentDate = new Date();
                      const fiscalYear = currentDate.getFullYear();
                      const annualRevenue = stats.monthlyRevenue * 12;
                      const expenses = maintenanceList.reduce((sum, m) => sum + m.cost, 0);
                      const taxableIncome = annualRevenue - expenses;
                      
                      const pdf = new jsPDF();
                      
                      // Configuration des couleurs
                      const primaryColor: [number, number, number] = [51, 65, 85]; // #334155
                      const accentColor: [number, number, number] = [245, 158, 11]; // #f59e0b
                      const lightGray: [number, number, number] = [241, 245, 249]; // #f1f5f9
                      
                      let yPos = 20;
                      
                      // En-tête avec logo
                      pdf.setFillColor(...accentColor);
                      pdf.rect(0, 0, 210, 50, 'F');
                      
                      // Dessiner le logo K à gauche (proportions du SVG: viewBox 0 0 100 100)
                      const logoScale = 0.3;
                      const logoX = 15;
                      const logoY = 12;
                      
                      pdf.setLineWidth(2.5);
                      // Ligne verticale du K (M25 15V85)
                      pdf.setDrawColor(255, 255, 255);
                      pdf.line(logoX + 25*logoScale, logoY + 15*logoScale, logoX + 25*logoScale, logoY + 85*logoScale);
                      
                      // Ligne diagonale haute du K (M25 50L65 15) - amber clair
                      pdf.setDrawColor(217, 151, 6);
                      pdf.line(logoX + 25*logoScale, logoY + 50*logoScale, logoX + 65*logoScale, logoY + 15*logoScale);
                      
                      // Ligne diagonale basse du K (M45 32.5L75 85) - amber clair
                      pdf.line(logoX + 45*logoScale, logoY + 32.5*logoScale, logoX + 75*logoScale, logoY + 85*logoScale);
                      
                      // Accent horizontal (M65 15H85)
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
                      
                      // Sous-titre et date à droite
                      pdf.setFontSize(16);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('Declaration Fiscale', 195, 23, { align: 'right' });
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.text(`Annee fiscale ${fiscalYear}`, 195, 30, { align: 'right' });
                      pdf.text(`Ref: DF-${fiscalYear}`, 195, 36, { align: 'right' });
                      
                      yPos = 60;
                      
                      // Revenu imposable en évidence avec design amélioré
                      pdf.setFillColor(254, 243, 199); // yellow-100
                      pdf.roundedRect(15, yPos, 180, 22, 3, 3, 'F');
                      
                      yPos += 8;
                      pdf.setFontSize(12);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(146, 64, 14); // amber-900
                      pdf.text('REVENU IMPOSABLE NET', 105, yPos, { align: 'center' });
                      
                      yPos += 8;
                      pdf.setFontSize(20);
                      pdf.setTextColor(...primaryColor);
                      pdf.text(formatPrice(taxableIncome), 105, yPos, { align: 'center' });
                      
                      yPos += 12;
                      
                      // Détail des Revenus Locatifs
                      pdf.setFontSize(14);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...accentColor);
                      pdf.text('DETAIL DES REVENUS LOCATIFS', 20, yPos);
                      yPos += 8;
                      
                      // En-tête du tableau
                      pdf.setFillColor(...lightGray);
                      pdf.roundedRect(15, yPos - 2, 180, 8, 2, 2, 'F');
                      
                      pdf.setFontSize(9);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...primaryColor);
                      pdf.text('Propriete', 20, yPos + 3);
                      pdf.text('Localisation', 80, yPos + 3);
                      pdf.text('Loyer/Mois', 130, yPos + 3);
                      pdf.text('Revenus Annuels', 165, yPos + 3);
                      yPos += 9;
                      
                      pdf.setFont('helvetica', 'normal');
                      pdf.setFontSize(8);
                      myProperties.forEach((p, index) => {
                        if (yPos > 250) {
                          pdf.addPage();
                          yPos = 25;
                        }
                        
                        // Fond alterné
                        if (index % 2 === 0) {
                          pdf.setFillColor(248, 250, 252);
                          pdf.rect(15, yPos - 2, 180, 6, 'F');
                        }
                        
                        pdf.setTextColor(...primaryColor);
                        pdf.text(p.title.substring(0, 25), 20, yPos);
                        pdf.text(p.location.substring(0, 20), 80, yPos);
                        pdf.text(formatPrice(p.status === 'loué' ? p.price : 0), 130, yPos);
                        pdf.setFont('helvetica', 'bold');
                        pdf.setTextColor(...accentColor);
                        pdf.text(formatPrice(p.status === 'loué' ? p.price * 12 : 0), 165, yPos);
                        pdf.setFont('helvetica', 'normal');
                        pdf.setTextColor(...primaryColor);
                        yPos += 6;
                      });
                      
                      yPos += 3;
                      pdf.setDrawColor(...accentColor);
                      pdf.setLineWidth(1);
                      pdf.line(130, yPos, 185, yPos);
                      yPos += 6;
                      pdf.setFontSize(11);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('TOTAL REVENUS BRUTS', 100, yPos);
                      pdf.setTextColor(...accentColor);
                      pdf.setFontSize(12);
                      pdf.text(formatPrice(annualRevenue), 165, yPos);
                      pdf.setTextColor(...primaryColor);
                      
                      yPos += 12;
                      
                      // Dépenses Déductibles
                      pdf.setFontSize(14);
                      pdf.setTextColor(...accentColor);
                      pdf.text('DEPENSES DEDUCTIBLES', 20, yPos);
                      yPos += 8;
                      
                      pdf.setFontSize(9);
                      pdf.setTextColor(...primaryColor);
                      pdf.text('Type', 25, yPos);
                      pdf.text('Propriété', 65, yPos);
                      pdf.text('Date', 120, yPos);
                      pdf.text('Montant', 170, yPos);
                      yPos += 5;
                      
                      pdf.setDrawColor(226, 232, 240);
                      pdf.line(25, yPos, 185, yPos);
                      yPos += 5;
                      
                      pdf.setFont('helvetica', 'normal');
                      pdf.setFontSize(8);
                      maintenanceList.forEach((m) => {
                        if (yPos > 260) {
                          pdf.addPage();
                          yPos = 20;
                        }
                        
                        pdf.text(m.type, 25, yPos);
                        pdf.text(m.propertyTitle.substring(0, 25), 65, yPos);
                        pdf.text(m.date, 120, yPos);
                        pdf.text(formatPrice(m.cost), 170, yPos);
                        yPos += 6;
                      });
                      
                      yPos += 3;
                      pdf.setDrawColor(51, 65, 85);
                      pdf.line(140, yPos, 185, yPos);
                      yPos += 5;
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('TOTAL DÉPENSES', 110, yPos);
                      pdf.text(formatPrice(expenses), 170, yPos);
                      
                      yPos += 15;
                      
                      // Calcul du Revenu Imposable
                      if (yPos > 230) {
                        pdf.addPage();
                        yPos = 20;
                      }
                      
                      pdf.setFontSize(14);
                      pdf.setTextColor(...accentColor);
                      pdf.text('CALCUL DU REVENU IMPOSABLE', 20, yPos);
                      yPos += 10;
                      
                      pdf.setFontSize(10);
                      pdf.setTextColor(...primaryColor);
                      pdf.setFont('helvetica', 'normal');
                      pdf.text('Revenus Locatifs Bruts', 25, yPos);
                      pdf.text(formatPrice(annualRevenue), 170, yPos);
                      yPos += 8;
                      
                      pdf.setTextColor(220, 38, 38);
                      pdf.text('(-) Dépenses Déductibles', 25, yPos);
                      pdf.text(`- ${formatPrice(expenses)}`, 170, yPos);
                      yPos += 8;
                      
                      pdf.setDrawColor(51, 65, 85);
                      pdf.line(25, yPos, 185, yPos);
                      yPos += 6;
                      
                      pdf.setFillColor(51, 65, 85);
                      pdf.rect(25, yPos - 3, 160, 10, 'F');
                      pdf.setTextColor(255, 255, 255);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setFontSize(12);
                      pdf.text('REVENU NET IMPOSABLE', 30, yPos + 4);
                      pdf.text(formatPrice(taxableIncome), 180, yPos + 4);
                      
                      yPos += 18;
                      
                      // Notice légale
                      if (yPos > 240) {
                        pdf.addPage();
                        yPos = 20;
                      }
                      
                      pdf.setFillColor(239, 246, 255); // blue-50
                      pdf.roundedRect(20, yPos, 170, 25, 3, 3, 'F');
                      pdf.setFontSize(9);
                      pdf.setTextColor(30, 64, 175); // blue-800
                      pdf.setFont('helvetica', 'bold');
                      pdf.text('NOTICE:', 25, yPos + 5);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setFontSize(8);
                      const noticeText = "Ce document est fourni à titre informatif uniquement. Il doit être vérifié et";
                      const noticeText2 = "complété par un expert-comptable avant soumission aux autorités fiscales guinéennes.";
                      pdf.text(noticeText, 25, yPos + 12);
                      pdf.text(noticeText2, 25, yPos + 18);
                      
                      // Pied de page
                      const pageCount = pdf.internal.pages.length - 1;
                      for (let i = 1; i <= pageCount; i++) {
                        pdf.setPage(i);
                        
                        // Ligne de séparation
                        pdf.setDrawColor(226, 232, 240);
                        pdf.setLineWidth(0.5);
                        pdf.line(15, 275, 195, 275);
                        
                        // Logo et texte dans le footer
                        pdf.setFontSize(8);
                        pdf.setTextColor(100, 116, 139);
                        pdf.setFont('helvetica', 'bold');
                        pdf.text('KUSHTATI IMMO', 105, 281, { align: 'center' });
                        
                        pdf.setFont('helvetica', 'normal');
                        pdf.text('Conakry, Guinee - Declaration Fiscale', 105, 285, { align: 'center' });
                        pdf.text('Email: ib362392@gmail.com | Tel: +224 623 93 63 13 | GitHub: kushtati', 105, 289, { align: 'center' });
                        
                        pdf.setFontSize(7);
                        pdf.text(`(c) ${currentDate.getFullYear()} Kushtati Immo - Tous droits reserves - Page ${i}/${pageCount}`, 105, 293, { align: 'center' });
                      }
                      
                      // Télécharger le PDF
                      pdf.save(`Kushtati-Declaration-Fiscale-${fiscalYear}.pdf`);
                      
                      alert('Déclaration fiscale PDF générée avec succès !');
                    }}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-brand-accent hover:shadow-lg transition-all text-left"
                  >
                    <FileText className="text-brand-accent mb-3" size={32} />
                    <h4 className="font-bold text-brand-primary text-lg mb-2">
                      Déclaration fiscale
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Préparer les documents pour votre déclaration
                    </p>
                  </button>

                  <button 
                    onClick={() => {
                      const unpaidProperties = myProperties.filter(p => p.unpaidMonths && p.unpaidMonths > 0);
                      
                      if (unpaidProperties.length === 0) {
                        alert('Aucun impayé détecté ! Tous vos locataires sont à jour.');
                        return;
                      }
                      
                      const reminderMessage = `
CONFIGURATION DES RAPPELS AUTOMATIQUES
========================================

Rappels programmés pour ${unpaidProperties.length} propriété(s) :

${unpaidProperties.map(p => `
📧 ${p.title}
   Locataire: ${p.tenant}
   Impayés: ${p.unpaidMonths} mois (${formatPrice(p.price * (p.unpaidMonths || 0))})
   
   Rappels configurés:
   ✓ Email automatique tous les 15 jours
   ✓ SMS d'alerte en cas de dépassement de 2 mois
   ✓ Notification push sur l'application mobile
`).join('\n')}

Les rappels seront envoyés automatiquement selon le calendrier suivant:
- J+15 : Premier rappel amical
- J+30 : Deuxième rappel avec mise en demeure
- J+45 : Dernier rappel avant procédure

Souhaitez-vous activer ces rappels automatiques ?
                      `;
                      
                      if (confirm(reminderMessage + '\n\nCliquez OK pour activer les rappels.')) {
                        alert('✅ Rappels automatiques activés avec succès !\n\nVos locataires recevront des notifications selon le calendrier défini.');
                      }
                    }}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-brand-accent hover:shadow-lg transition-all text-left"
                  >
                    <Bell className="text-brand-accent mb-3" size={32} />
                    <h4 className="font-bold text-brand-primary text-lg mb-2">
                      Rappels automatiques
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Configurer les notifications de paiement
                    </p>
                  </button>

                  <button 
                    onClick={() => {
                      // Simuler l'upload de documents
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.multiple = true;
                      input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
                      
                      input.onchange = (e: any) => {
                        const files = Array.from(e.target.files || []) as File[];
                        if (files.length > 0) {
                          const fileList = files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(2)} KB)`).join('\n');
                          alert(`✅ ${files.length} document(s) importé(s) avec succès :\n\n${fileList}\n\nLes documents sont maintenant disponibles dans votre espace de stockage.`);
                        }
                      };
                      
                      input.click();
                    }}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-brand-accent hover:shadow-lg transition-all text-left"
                  >
                    <Upload className="text-brand-accent mb-3" size={32} />
                    <h4 className="font-bold text-brand-primary text-lg mb-2">
                      Importer documents
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Ajouter factures et documents importants
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
