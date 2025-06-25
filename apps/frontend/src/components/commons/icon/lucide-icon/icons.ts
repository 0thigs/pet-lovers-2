import {
  HandPlatter,
  ScrollText,
  ShoppingBasket,
  SquareUser,
  Pencil,
  Trash,
  PawPrint,
  Plus,
  DollarSign,
  Menu,
  ClipboardList,
  type LucideProps,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  list: ClipboardList,
  product: ShoppingBasket,
  service: HandPlatter,
  customer: SquareUser,
  orders: ScrollText,
  edit: Pencil,
  pet: PawPrint,
  delete: Trash,
  add: Plus,
  menu: Menu,
  order: DollarSign,
}
