import { Filter } from './filter';
import { SwitchComponent } from '../switches/switch-component';
import { BaseComponent } from '../elements/base-component';
import { SwitchModal } from '../switches/switch-modal';
import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { FilterCategory } from '../../interfaces/enums';

export class SwitchFilter extends Filter {
  private categoryA: keyof typeof FilterCategory = 'manufacturer';
  private categoryB: keyof typeof FilterCategory = 'switches';
  private manufacturersWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private switchWrapper = new BaseComponent({ tag: 'ul', className: 'switch', parent: this.node });

  private manufacturers = [...DB.getVariants(this.categoryA)]
    .filter((elem) => elem !== 'null')
    .map(
      (item) =>
        new FormField({
          className: 'filter',
          type: 'checkbox',
          text: item,
          name: this.categoryA,
          value: item,
          checked: DB.filter.params.get(this.categoryA)?.has(item),
        }),
    );

  private switches = DB.switches
    .filter((item) => item.id !== 'null')
    .map((item) => {
      const component = new SwitchComponent(item, this.categoryB);
      component.getInputNode().type = 'checkbox';
      component.getInputNode().disabled = false;
      component.checked = !!DB.filter.params.get(this.categoryB)?.has(item.id);
      component.getInputNode().parentElement?.classList.remove('switch__item_false');
      return component;
    });

  private modalWrapper: BaseComponent | null | undefined;

  private switchModal: SwitchModal | null | undefined;

  constructor() {
    super('Переключатели');
    this.manufacturers.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          if (target.checked) DB.filter.add(this.categoryA, target.value);
          else DB.filter.remove(this.categoryA, target.value);
      });
    });
    this.switches.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          if (target.checked) DB.filter.add(this.categoryB, target.value);
          else DB.filter.remove(this.categoryB, target.value);
      });
    });
    this.manufacturersWrapper.appendEl(this.manufacturers);
    this.switchWrapper.appendEl(this.switches);
    this.switchWrapper.getNode().addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('switch__label')) {
        target.setAttribute('id', 'open');
        this.modalWrapper = new BaseComponent({ className: 'switch__modal' });
        this.switchModal = new SwitchModal(target.textContent || '', !target.classList.contains('switch__item_false'));
        target.append(this.modalWrapper.getNode());
        this.modalWrapper.appendEl(this.switchModal);
        target.addEventListener('mouseout', () => {
          target.removeAttribute('id');
          this.modalWrapper?.destroy();
          this.modalWrapper = null;
        });
      }
    });
  }

  getRadioInputs() {
    return this.switches;
  }

  getInputs() {
    return this.manufacturers;
  }
}
