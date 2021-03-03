import { Aux } from '../../hoc/Aux';
import styles from './Layout.module.css'

export const Layout = (props) => (
  <Aux>
    <div>Toolbar</div>
    <main className={styles.content}>
      {props.children}
    </main>
  </Aux>
)
