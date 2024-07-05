import { ClipboardText } from 'phosphor-react'

import styles from './IsEmpty.module.css'

export function IsEmpty() {
  return (
    <div className={styles.container}>
      <ClipboardText size={56}/>
      <div className={styles.texts}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}