import { useState } from 'react';
import { ProductCardList } from './ProductCardList';
import CardDetails from './CardDetails';

export function CategoryPage() {
  const [selected, setSelected] = useState();

  const allCards = [
    {
  path: 'c4.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},

{
  path: 'c5.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},



{
  path: 'c6.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c6.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c4.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},

{
  path: 'c5.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},



{
  path: 'c6.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c6.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c1.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},


{
  path: 'c2.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},


{
  path: 'c3.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c4.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},

{
  path: 'c5.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},
{
  path: 'c1.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},


{
  path: 'c2.png',
  name: 'Новая сосновка',
  amenities: [
    { label: '6 спальных мест', icon: 'bed.png' },
    { label: 'Настольный теннис', icon: 'pingpong.png' },
    { label: 'Баня', icon: 'sauna.png' },
    { label: 'Бассейн', icon: 'pooll.png' }
  ],
  price: 10000
},

  ];

  return (
    <div>
      <h2 className='categoryTitle'>Категория: Все дома</h2>
      <ProductCardList cards={allCards} setSelected={setSelected} />

      {selected && <CardDetails item={selected} setSelected={setSelected} />}
    </div>
  );
}
