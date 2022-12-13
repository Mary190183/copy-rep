import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';
import ProductsListState from '../../states/goods-state';

export default class AvFilter extends Filter {
  private filterWrapper: BaseComponent;

  private all: Button;

  private inStock: Button;

  constructor(private productsState: ProductsListState) {
    super('Наличие');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.all = new Button({ className: 'filter__btn active', text: 'Всё', parent: this.filterWrapper.getNode() });
    this.all.getNode().onclick = () => {
      this.all.getNode().classList.add('active');
      this.inStock.getNode().classList.remove('active');
      productsState.set({ inStock: !productsState.props.inStock });
    };
    this.inStock = new Button({ className: 'filter__btn', text: 'В наличии', parent: this.filterWrapper.getNode() });
    this.inStock.getNode().onclick = () => {
      this.all.getNode().classList.remove('active');
      this.inStock.getNode().classList.add('active');
      productsState.set({ inStock: !productsState.props.inStock });
    };
  }
}