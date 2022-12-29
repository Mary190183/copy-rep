import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { FilterCategory } from '../../interfaces/enums';

export class BrandFilter extends Filter {
  private category: keyof typeof FilterCategory = 'brand';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private brands = [...DB.getVariants(this.category)].map(
    (item) =>
      new FormField({
        className: 'filter',
        type: 'checkbox',
        text: item,
        name: this.category,
        value: item,
        checked: DB.filter.params.get(this.category)?.has(item),
      }),
  );

  constructor() {
    super('Бренды');

    this.filterWrapper.node.onchange = (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.checked) DB.filter.add(this.category, target.value);
      else DB.filter.remove(this.category, target.value);
    };

    this.filterWrapper.appendEl(this.brands);
  }

  getInputs() {
    return this.brands;
  }
}
