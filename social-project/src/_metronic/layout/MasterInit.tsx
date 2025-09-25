import { useLayout } from '@/components/core'
import { Tab } from 'bootstrap'
import { useEffect, useState } from 'react'
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  SwapperComponent,
  ToggleComponent,
} from '../assets/ts/components'
import { ThemeModeComponent } from '../assets/ts/layout'

export function MasterInit() {
  const {config} = useLayout()
  const [initialized, setInitialized] = useState(false)
  const pluginsInitialization = () => {
    ThemeModeComponent.init()
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
      document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
        Tab.getOrCreateInstance(tab)
      })
    }, 500)
  }

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      pluginsInitialization()
    }
  }, [config, initialized])

  return <></>
}
