import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, DollarSign, Users, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

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
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EventFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      // Simulação de salvamento - em produção, fazer chamada para API
      console.log('Dados do evento:', data);
      
      toast.success(
        isEdit ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!'
      );
      
      navigate('/events');
    } catch (error) {
      toast.error('Erro ao salvar evento');
    } finally {
      setLoading(false);
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Informações Básicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="label">Título do Evento *</label>
              <input
                type="text"
                {...register('title', { required: 'Título é obrigatório' })}
                className="input-field"
                placeholder="Ex: Festival de Música 2024"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Descrição *</label>
              <textarea
                {...register('description', { required: 'Descrição é obrigatória' })}
                className="input-field h-24 resize-none"
                placeholder="Descreva o evento..."
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="label">Data e Hora *</label>
              <input
                type="datetime-local"
                {...register('date', { required: 'Data é obrigatória' })}
                className="input-field"
              />
              {errors.date && (
                <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="label">Data de Encerramento das Vendas *</label>
              <input
                type="datetime-local"
                {...register('sales_end_date', { required: 'Data de encerramento é obrigatória' })}
                className="input-field"
              />
              {errors.sales_end_date && (
                <p className="text-red-600 text-sm mt-1">{errors.sales_end_date.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Localização
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Local *</label>
              <input
                type="text"
                {...register('location', { required: 'Local é obrigatório' })}
                className="input-field"
                placeholder="Ex: Parque da Cidade"
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="label">Endereço *</label>
              <input
                type="text"
                {...register('address', { required: 'Endereço é obrigatório' })}
                className="input-field"
                placeholder="Ex: Rua das Flores, 123"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="label">Cidade *</label>
              <input
                type="text"
                {...register('city', { required: 'Cidade é obrigatória' })}
                className="input-field"
                placeholder="Ex: São Paulo"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="label">Estado *</label>
              <select
                {...register('state', { required: 'Estado é obrigatório' })}
                className="input-field"
              >
                <option value="">Selecione o estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">URL da Imagem</label>
              <input
                type="url"
                {...register('image_url')}
                className="input-field"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Preços e Ingressos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Preço do Ingresso (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Preço é obrigatório',
                  min: { value: 0, message: 'Preço deve ser maior que zero' }
                })}
                className="input-field"
                placeholder="50.00"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="label">Quantidade Máxima de Ingressos *</label>
              <input
                type="number"
                min="1"
                {...register('max_tickets', { 
                  required: 'Quantidade é obrigatória',
                  min: { value: 1, message: 'Quantidade deve ser maior que zero' }
                })}
                className="input-field"
                placeholder="500"
              />
              {errors.max_tickets && (
                <p className="text-red-600 text-sm mt-1">{errors.max_tickets.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Salvando...' : (isEdit ? 'Atualizar' : 'Criar Evento')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
