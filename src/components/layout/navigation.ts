import {
  BookOpen,
  GraduationCap,
  Home,
  School,
  Settings,
  Users,
} from 'lucide-react'

export const navigation = [
  {
    title: 'Dashboard',
    href: '/',
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
    title: 'Admissions',
    href: '/admissions',
    icon: BookOpen,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
] as const