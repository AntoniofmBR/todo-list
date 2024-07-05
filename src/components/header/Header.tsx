import logo from '../../assets/logo.png'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img
      className={styles.img}
      src={logo} 
      alt="logo to-do" 
      />
    </header>
  )
}