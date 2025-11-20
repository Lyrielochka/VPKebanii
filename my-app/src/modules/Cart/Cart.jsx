import { loadCartFromLocalStorage } from "../utils/utils";
import '../../theme/scss/cart.css';

export function Cart() {
const result = loadCartFromLocalStorage('Cart');

const sum = result.reduce((prev, curr) => curr.item.price+prev, 0)

    return(
        <div className="Cart">
        <div>Корзина</div>
        <div>
        {result?.map(result => {
            const {count, item} = result;
            return(
                <div>
                    <div>{item.name}</div>
                    <div>{count}</div>
                </div>
            )
        })}
        </div>
        <div>
            <div>Итого: {sum} </div>
            <div onClick={() => {alert('Заказа оформлен')}}>Оформить</div>
        </div>
        </div>

    );
}