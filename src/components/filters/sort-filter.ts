import { Button } from '../elements/button';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

export class SortFilter extends BaseComponent {
  private alphSortAsc = new FormField({
    className: 'sort',
    modificator: 'alph-asc',
    type: 'radio',
    name: 'sort',
    checked: !!DB.filter.getParam('sortType') && DB.filter.getParam('sortDirection') === 'ascending',
  });
  private alphSortDesc = new FormField({
    className: 'sort',
    modificator: 'alph-desc',
    type: 'radio',
    name: 'sort',
    checked: DB.filter.getParam('sortType') === 'title' && DB.filter.getParam('sortDirection') === 'descending',
  });
  private priceSortAsc = new FormField({
    className: 'sort',
    modificator: 'price-asc',
    type: 'radio',
    name: 'sort',
    checked: DB.filter.getParam('sortType') === 'priceMin' && DB.filter.getParam('sortDirection') === 'ascending',
  });
  private priceSortDesc = new FormField({
    className: 'sort',
    modificator: 'price-desc',
    type: 'radio',
    name: 'sort',
    checked: DB.filter.getParam('sortType') === 'priceMin' && DB.filter.getParam('sortDirection') === 'descending',
  });
  private inStockSortAsc = new FormField({
    className: 'sort',
    modificator: 'stock-asc',
    type: 'radio',
    name: 'sort',
    checked: DB.filter.getParam('sortType') === 'sumQuantity' && DB.filter.getParam('sortDirection') === 'ascending',
  });
  private inStockSortDesc = new FormField({
    className: 'sort',
    modificator: 'stock-desc',
    type: 'radio',
    name: 'sort',
    checked: DB.filter.getParam('sortType') === 'sumQuantity' && DB.filter.getParam('sortDirection') === 'descending',
  });
  private resetSort = new Button({
    className: 'sort__clear',
    text: 'Очистить сортировку',
  });


  constructor() {
    super({ className: 'sort' });
    this.alphSortAsc.getInputNode().setAttribute('title', 'Отсортировать в алфивитном порядке');
    this.alphSortDesc.getInputNode().setAttribute('title', 'Отсортировать в обратном алфивитном порядке');
    this.priceSortAsc.getInputNode().setAttribute('title', 'Отсортировать по возрастанию цены');
    this.priceSortDesc.getInputNode().setAttribute('title', 'Отсортировать по уменьшению цены');
    this.inStockSortAsc.getInputNode().setAttribute('title', 'Отсортировать по увеличению остатка на складе');
    this.inStockSortDesc.getInputNode().setAttribute('title', 'Отсортировать по уменьшению остатка на складе');
    this.alphSortAsc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'title')
      .setParam('sortDirection', 'ascending');
    this.alphSortDesc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'title')
      .setParam('sortDirection', 'descending');
    this.priceSortAsc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'priceMin')
      .setParam('sortDirection', 'ascending');
    this.priceSortDesc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'priceMin')
      .setParam('sortDirection', 'descending');
    this.inStockSortAsc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'sumQuantity')
      .setParam('sortDirection', 'ascending');
    this.inStockSortDesc.getInputNode().onchange = () => DB.filter.setParam('sortType', 'sumQuantity')
      .setParam('sortDirection', 'descending');
    this.appendEl(
      [
        this.alphSortAsc,
        this.alphSortDesc,
        this.priceSortAsc,
        this.priceSortDesc,
        this.inStockSortAsc,
        this.inStockSortDesc,
        this.resetSort,
      ]
    );
    //! работает по тз, но надо рефачить, выглядит как KEK
  }

  uncheckAll() {
    [ 
      this.alphSortAsc,
      this.alphSortDesc,
      this.priceSortAsc,
      this.priceSortDesc,
      this.inStockSortAsc,
      this.inStockSortDesc,
    ].forEach((item) => {Object.assign(item.getInputNode(), { checked: false })});
    DB.filter.setParam('sortType').setParam('sortDirection');
  }

  getResertSortNode() {
    return this.resetSort.getNode();
  }
}
