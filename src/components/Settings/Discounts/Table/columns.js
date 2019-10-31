import { date } from 'quasar'

export default [
  {
    name: 'room',
    label: 'Зал',
    active: true,
    width: 50,
  },
  {
    name: 'percent',
    label: 'процент',
    format: value => `${value}%`,
    active: true,
    align: 'right',
    width: 50,
  },
  {
    name: 'daysOfWeek',
    format: value => {
      if (!value) { return }
      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
      return daysOfWeek[value - 1]
    },
    label: 'день',
    align: 'right',
    active: true,
  },
  {
    name: 'hourFrom',
    label: 'время',
    format: (value, { hourFrom, hourTo }) => [hourFrom, hourTo].map(
      item => `${item}:00`
    ).join(' — '),
    align: 'center',
    active: true,
  },
  {
    name: 'minHours',
    label: 'Мин. часы',
    align: 'center',
    active: true,
  },
  {
    name: 'expiredAt',
    label: 'Активна до',
    format: value => date.formatDate(value, 'D MMMM'),
    align: 'center',
    active: true,
  }
]
