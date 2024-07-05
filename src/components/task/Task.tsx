import  { useState } from 'react';
import { Check, Trash } from 'phosphor-react';

import styles from './Task.module.css';

export interface TaskTypes {
  id: number;
  content: string;
  isChecked: boolean;
  onChangeCheck?: (id: number, isChecked: boolean) => void;
  onDeleteTask?: (id: number) => void ;
}

export function Task({ 
  id,
  content,
  isChecked,
  onChangeCheck,
  onDeleteTask,
}: TaskTypes) {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);

  const handleChangeInput = () => {
    setIsCheckedState(!isCheckedState);
    onChangeCheck!(id, !isCheckedState);
  };

  return (
    <section className={isCheckedState ? styles.container_checked : styles.container}>
      <label className={styles.checkbox_label}>
        <input
          type="checkbox" 
          className={styles.checkbox_input}
          checked={isCheckedState}
          onChange={handleChangeInput}
        />
        <span className={styles.checkbox_span}>
          {isCheckedState ? <Check size={12} weight='bold' /> : null}
        </span>
      </label>
      <p className={isCheckedState ? styles.underlined_text : styles.text}>
        {content}
      </p>
      <button className={styles.button} onClick={() => onDeleteTask!(id)}>
        <Trash size={18}/>
      </button>
    </section>
  );
}
