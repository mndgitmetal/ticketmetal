import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiService } from './api.ts';
import ImageUpload from '../components/ImageUpload.tsx';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  city: string;
  state: string;
  image_url: string;
  max_tickets: number;
  price: number;
  sales_end_date: string;
}

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    location: '',
    address: '',
    city: '',
    state: '',
    image_url: '',
    max_tickets: 0,
    price: 0,
    sales_end_date: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const loadEventData = useCallback(async () => {
    if (!id) return;
    
    try {
      setInitialLoading(true);
      const event = await apiService.getEvent(parseInt(id));
      
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().slice(0, 16),
        location: event.location,
        address: event.address,
        city: event.city,
        state: event.state,
        image_url: event.image_url || '',
        max_tickets: event.max_tickets,
        price: event.price,
        sales_end_date: event.sales_end_date ? new Date(event.sales_end_date).toISOString().slice(0, 16) : ''
      });
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
      toast.error('Erro ao carregar dados do evento');
      navigate('/events');
    } finally {
      setInitialLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEdit && id) {
      loadEventData();
    }
  }, [isEdit, id, loadEventData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'max_tickets' || name === 'price' ? Number(value) : value
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const eventData = {
        ...formData,
        organizer_id: 3, // ID do usuário de teste
        is_active: true
      };

      if (isEdit && id) {
        await apiService.updateEvent(parseInt(id), eventData);
        toast.success('Evento atualizado com sucesso!');
      } else {
        await apiService.createEvent(eventData);
        toast.success('Evento criado com sucesso!');
      }
      
      navigate('/events');
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      toast.error('Erro ao salvar evento');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/events')}
          className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Editar Evento' : 'Novo Evento'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Atualize as informações do evento' : 'Preencha os dados para criar um novo evento'}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título do Evento</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o título do evento"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Descreva o evento"
            required
          />
        </div>

        {/* Data e Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data e Hora</label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Localização */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do local"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Endereço completo"
              required
            />
          </div>
        </div>

        {/* Cidade e Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cidade"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Estado"
              required
            />
          </div>
        </div>

        {/* Preço e Ingressos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Máximo de Ingressos</label>
            <div className="relative">
              <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                name="max_tickets"
                value={formData.max_tickets}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Data de Encerramento das Vendas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Encerramento das Vendas</label>
          <input
            type="datetime-local"
            name="sales_end_date"
            value={formData.sales_end_date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload de Imagem */}
        <ImageUpload
          onImageUploaded={handleImageUpload}
          currentImageUrl={formData.image_url}
        />

        {/* Botões */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Salvando...' : (isEdit ? 'Atualizar' : 'Criar')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;