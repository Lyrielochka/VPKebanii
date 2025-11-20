// import { useState } from 'react';

// export default function CardForm({ onSubmit, initialData = {} }) {
//   const [path, setPath] = useState(initialData.path || '');
//   const [name, setName] = useState(initialData.name || '');
//   const [price, setPrice] = useState(initialData.price || '');
//   const [amenities, setAmenities] = useState(initialData.amenities || []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ path, name, price, amenities });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={path} onChange={e => setPath(e.target.value)} placeholder="Путь к изображению" />
//       <input value={name} onChange={e => setName(e.target.value)} placeholder="Название" />
//       <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Цена" type="number" />
//       <button type="submit">Сохранить</button>
//     </form>
//   );
// }
