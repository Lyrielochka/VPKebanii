import "../../theme/scss/ContactBlock.scss";
import { Footer } from "./Footer";
import { ScrollBar } from "./ScrollBar";

export function ContactsBlock() {
  return (
    <section className="contacts">
      <h2 className="contacts__title">Контакты<img className='mark' src="/headerUS.png" alt="" /></h2>
      <div className="contacts__info">
        <div className="contacts__details">
          <p><strong>Электронная почта</strong></p>
          <p>pokanepridymal@yandex.by</p>
          <p><strong>Юридический адрес</strong></p>
          <p>Беларусь,Гомельский район, агрогородок Урицкое, Тенистая улица, 10</p>
        </div>
        <div className="contacts__map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1446.5557292836713!2d30.813716506340906!3d52.468343426265655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d46b78dbc1efe3%3A0x552fc311ccded9c4!2sUritskaya%20Srednyaya%20Shkola!5e0!3m2!1sen!2sby!4v1761201041285!5m2!1sen!2sby" 
          width="100%" 
          height="400" 
          style= {{ border: 0 }} 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
        <div className="line">
        <img src="/line.png" alt="" />
        </div>
      <Footer/>
      <ScrollBar/>
    </section>
  );
}
