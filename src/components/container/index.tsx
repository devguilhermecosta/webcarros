import { ReactNode } from 'react';
import Style from './container.module.css';

export default function Container({ children }: { children: ReactNode}) {
  return (
    <section className={Style.container}>
      {children}
    </section>
  )
}