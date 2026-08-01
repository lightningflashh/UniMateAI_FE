import {
  BarChart3,
  GraduationCap,
  Heart,
  Home,
  School,
} from 'lucide-react'

export const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Universities',
    href: '/universities',
    icon: School,
  },
  {
    title: 'Majors',
    href: '/majors',
    icon: GraduationCap,
  },
  {
    title: 'Favorites',
    href: '/favorites',
    icon: Heart,
  },
  {
    title: 'Statistics',
    href: '/statistics',
    icon: BarChart3,
  },
]