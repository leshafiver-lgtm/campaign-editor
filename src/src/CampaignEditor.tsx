import React, { useState } from 'react';
import {
  Instagram,
  Youtube,
  Twitter,
  PlayCircle,
  Rss,
  Plus,
  Eye,
  X,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';

type SocialId = 'instagram' | 'youtube' | 'vk' | 'tiktok' | 'twitter';

interface FormState {
  title: string;
  description: string;
  type: string;
  category: string;
  budget: number;
  paid: number;
  rate: number;
  minPay: number;
  maxPay: number;
  socials: SocialId[];
}

export default function CampaignEditor() {
  const [form, setForm] = useState<FormState>({
    title: 'Продвижение подкаста',
    description: 'Делайте нарезки с моего подкаста.',
    type: 'Клип',
    category: 'Личный бренд',
    budget: 3000,
    paid: 1395.5,
    rate: 2.5,
    minPay: 10,
    maxPay: 250,
    socials: ['instagram', 'youtube', 'tiktok'],
  });

  const [coverUrl, setCoverUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');

  const updateForm = (field: keyof FormState, value: string | number | SocialId[]) => {
    setForm(prev => ({ ...prev, [field]: value as never }));
  };

  const toggleSocial = (social: SocialId) => {
    setForm(prev => ({
      ...prev,
      socials: prev.socials.includes(social)
        ? prev.socials.filter(s => s !== social)
        : [...prev.socials, social],
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'cover' | 'logo',
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'cover') setCoverUrl(url);
      else setLogoUrl(url);
    }
  };

  const progressPercent = Math.min((form.paid / form.budget) * 100, 100) || 0;

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 pb-24 font-sans">
      <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
        <h1 className="text-xl font-bold">Редактирование "Награда за контент"</h1>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
          <X className="w-5 h-5 text-[#D8A83A]" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold mb-4">Настройка вознаграждения за контент</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Придумать название</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D8A83A] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2">Описание задачи</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D8A83A] focus:outline-none transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Тип</label>
                  <select
                    value={form.type}
                    onChange={e => updateForm('type', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D8A83A] focus:outline-none transition appearance-none cursor-pointer"
                  >
                    <option className="bg-[#1a1a1a]">Клип</option>
                    <option className="bg-[#1a1a1a]">Видео</option>
                    <option className="bg-[#1a1a1a]">Шортс</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Категория</label>
                  <select
                    value={form.category}
                    onChange={e => updateForm('category', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D8A83A] focus:outline-none transition appearance-none cursor-pointer"
                  >
                    <option className="bg-[#1a1a1a]">Личный бренд</option>
                    <option className="bg-[#1a1a1a]">Развлечения</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {[
                  { id: 'instagram', icon: Instagram },
                  { id: 'youtube', icon: Youtube },
                  { id: 'vk', icon: Rss },
                  { id: 'tiktok', icon: PlayCircle },
                  { id: 'twitter', icon: Twitter },
                ].map(social => {
                  const isActive = form.socials.includes(social.id as SocialId);
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.id}
                      onClick={() => toggleSocial(social.id as SocialId)}
                      className={`p-2 rounded-lg border transition ${
                        isActive
                          ? 'bg-[#D8A83A]/10 border-[#D8A83A]'
                          : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? 'text-[#D8A83A]' : 'text-white'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Дополнительный контент</h2>
            <p className="text-xs text-white/40 mb-3">
              Мы рекомендуем вам добавить весь дополнительный материал
            </p>
            <input
              type="text"
              defaultValue="https://drive.google.com/drive/folders/1qn..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D8A83A] focus:outline-none transition"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Требования к содержанию</h2>
            <p className="text-xs text-white/40 mb-3">
              Добавьте правила по содержанию, которым должны следовать пользователи.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  defaultValue="Обязательно отметьте @Prime Oracles в описании."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pr-10 text-sm focus:border-[#D8A83A] focus:outline-none transition"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <label className="block text-xs text-white/40 mb-2">
                  Что бы вы хотели уточнить?
                </label>
                <input
                  type="text"
                  defaultValue="Работали до этого с подобным контентом?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pr-10 text-sm focus:border-[#D8A83A] focus:outline-none transition"
                />
                <button className="absolute right-3 top-[34px] text-white/40 hover:text-white transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 pl-0 lg:pl-10 border-l-0 lg:border-l border-white/10">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Бюджет компании</label>
            <div className="relative w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                $
              </span>
              <input
                type="number"
                value={form.budget}
                onChange={e => updateForm('budget', Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-7 text-sm focus:border-[#D8A83A] focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Ставка вознаграждения</label>
            <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-lg p-4 w-3/4">
              <div>
                <div className="text-xs text-white/40 mb-1">Ставка</div>
                <div className="font-semibold text-lg">${form.rate}</div>
              </div>
              <div className="text-white/40 text-sm mt-4">За</div>
              <div>
                <div className="text-xs text-white/40 mb-1">Просмотры</div>
                <div className="font-semibold text-lg">1,000</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-3/4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Минимальная оплата
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  $
                </span>
                <input
                  type="number"
                  value={form.minPay}
                  onChange={e => updateForm('minPay', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-7 text-sm focus:border-[#D8A83A] focus:outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Максимальная оплата
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  $
                </span>
                <input
                  type="number"
                  value={form.maxPay}
                  onChange={e => updateForm('maxPay', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-7 text-sm focus:border-[#D8A83A] focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-4">Предпросмотр карточки</h2>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative w-full max-w-[400px]">
              <div className="h-32 bg-white/5 relative group flex items-center justify-center border-b border-white/10 hover:bg-white/10 transition cursor-pointer">
                {coverUrl ? (
                  <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/30 flex flex-col items-center group-hover:text-[#D8A83A] transition">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Загрузить обложку</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e, 'cover')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="absolute top-24 left-5 w-16 h-16 bg-[#121212] border-2 border-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center group z-10 hover:border-[#D8A83A] transition cursor-pointer">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-5 h-5 text-white/40 group-hover:text-[#D8A83A] transition" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e, 'logo')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="p-5 pt-12">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold pr-2 leading-tight">
                    {form.title || 'Без названия'}
                  </h3>
                  <div className="bg-[#5b21b6] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                    ${form.rate} / 1K <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-sm text-white/60 mb-8 line-clamp-2 min-h-[40px]">
                  {form.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-white/70">
                    <span>
                      Выплачено ${form.paid} из ${form.budget}
                    </span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D8A83A] transition-all duration-500 ease-out rounded-full relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(216,168,58,1)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-xl border-t border-white/10 flex justify-center z-50">
        <button className="bg-[#D8A83A] text-black font-bold py-3.5 px-32 rounded-xl hover:bg-[#e0b552] active:scale-95 transition-all shadow-[0_0_20px_rgba(216,168,58,0.3)]">
          Продолжить
        </button>
      </div>
    </div>
  );
}
