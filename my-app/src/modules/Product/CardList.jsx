// import { useEffect, useState } from 'react';
// import { Card } from './Card';
// import CardForm from './CardForm';
// import CardDetails from './CardDetails';

// export default function CardList() {
//   const [cards, setCards] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [editingCard, setEditingCard] = useState(null);

//   useEffect(() => {
//     fetch('http://wmp.by/api/cards')
//       .then(res => res.json())
//       .then(data => {
//         const parsed = data.map(card => ({
//           ...card,
//           amenities: JSON.parse(card.amenities)
//         }));
//         setCards(parsed);
//       });
//   }, []);

//   const addCard = async (card) => {
//     await fetch('http://wmp.by/api/cards', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(card)
//     });
//     window.location.reload();
//   };

//   const updateCard = async (card) => {
//     await fetch(`http://wmp.by/api/cards/${editingCard.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(card)
//     });
//     window.location.reload();
//   };

//   const deleteCard = async (id) => {
//     await fetch(`http://wmp.by/api/cards/${id}`, { method: 'DELETE' });
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h2>Добавить карточку</h2>
//       <CardForm onSubmit={addCard} />

//       <h2>Карточки</h2>
//       <div className="card-container">
//         {cards.map(card => (
//           <div key={card.id}>
//             <Card item={card} setSelected={setSelected} />
//             <button onClick={() => setEditingCard(card)}>Редактировать</button>
//             <button onClick={() => deleteCard(card.id)}>Удалить</button>
//           </div>
//         ))}
//       </div>

//       {editingCard && (
//         <>
//           <h2>Редактировать карточку</h2>
//           <CardForm
//             initialData={editingCard}
//             onSubmit={updateCard}
//           />
//         </>
//       )}

//       {selected && <CardDetails item={selected} setSelected={setSelected} />}
//     </div>
//   );
// }
