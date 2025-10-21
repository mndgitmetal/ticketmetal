import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, CreditCard, User, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  city: string;
  state: string;
  price: number;
  image: string;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  agreeTerms: boolean;
}

const Checkout: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    agreeTerms: false
  });

  useEffect(() => {
    fetchEvent();
    // Obter quantidade da URL
    const urlParams = new URLSearchParams(window.location.search);
    const qty = urlParams.get('quantity');
    if (qty) setQuantity(parseInt(qty));
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      // Simulação de dados - em produção, fazer chamada para API
      const mockEvent: Event = {
        id: 1,
        title: 'Festival de Música 2024',
        date: '2024-03-15T20:00:00',
        location: 'Parque da Cidade',
        city: 'São Paulo',
        state: 'SP',
        price: 50.00,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500'
      };
      
      setEvent(mockEvent);
    } catch (error) {
      toast.error('Erro ao carregar evento');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .slice(0, 15);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Validações
      if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      if (!formData.agreeTerms) {
        toast.error('Você deve aceitar os termos de uso');
        return;
      }

      // Simulação de processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Pagamento processado com sucesso!');
      
      // Redirecionar para página de sucesso ou ingressos
      // navigate(`/success/${eventId}`);
      
    } catch (error) {
      toast.error('Erro ao processar pagamento');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evento não encontrado</h2>
          <Link to="/events" className="btn-primary">
            Voltar para Eventos
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = event.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/events/${eventId}`}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao evento</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Summary */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}, {event.city} - {event.state}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{quantity}x ingresso(s)</p>
                    <p className="font-medium text-gray-900">R$ {totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dados Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">CPF *</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      className="input-field"
                      placeholder="000.000.000-00"
                      maxLength={14}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Telefone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="input-field"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagamento
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mercado Pago</p>
                      <p className="text-sm text-gray-600">Pagamento seguro e rápido</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Você será redirecionado para o Mercado Pago para finalizar o pagamento
                </p>
              </div>

              {/* Terms */}
              <div className="card">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                  <div className="text-sm text-gray-600">
                    <p>
                      Eu aceito os{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Termos de Uso
                      </a>{' '}
                      e{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processando...' : `Finalizar Compra - R$ ${totalPrice.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresso(s)</span>
                  <span className="text-gray-900">{quantity}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço unitário</span>
                  <span className="text-gray-900">R$ {event.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de serviço</span>
                  <span className="text-gray-900">R$ 0,00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-blue-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Pagamento 100% seguro</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">🔒</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
