import { BaseComponent } from './base-component';
import { InputProps } from '../../interfaces/interfaces';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'input' }));
    const { value, type, placeholder, pattern, min, max, name } = props;
    const node = this.node;
    if (value) node.setAttribute('value', value);
    if (type) node.setAttribute('type', type);
    if (placeholder) node.setAttribute('placeholder', placeholder);
    if (pattern) node.setAttribute('pattern', pattern);
    if (min) node.setAttribute('min', min);
    if (max) node.setAttribute('max', max);
    if (name) node.setAttribute('name', name);
    node.setAttribute('required', 'true');
  }
}
