import AppMenuitem from './AppMenuitem'
import { MenuProvider } from './context/menucontext'
import { AppMenuItem } from '../types/types'

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: '我的应用',
      items: [{ label: '主页', icon: 'pi pi-fw pi-home', to: '/home' }],
    },
  ]

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          )
        })}
      </ul>
    </MenuProvider>
  )
}

export default AppMenu
