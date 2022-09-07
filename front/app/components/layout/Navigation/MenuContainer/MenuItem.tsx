import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './Menu.module.scss'
import cn from 'classnames'
import { IMenuItem } from './menu.interface'
import Link from 'next/link'
import MaterialIcon from '@/components/ui/MaterialIcon'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
    const { asPath } = useRouter()
    console.log(item.icon)
    return (
        <li className={cn({
            [styles.active]: asPath === item.link
        })}>
            <Link href={item.link}>
                <a>
                    <MaterialIcon name={item.icon} />
                    <span>{item.title}</span>
                </a>
            </Link>
        </li>
    )
}

export default MenuItem