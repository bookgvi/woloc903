import { date } from 'quasar'

export default [
  {
    name: 'room',
    label: 'Зал',
    width: 100,
    active: true,
    discount: true
  },
  {
    name: 'percent',
    label: 'процент',
    align: 'right',
    width: 200,
    format: value => `${value}%`,
    active: true,
    discount: true
  },
  {
    name: 'daysOfWeek',
    format: value => {
      if (!value) { return }
      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
      return daysOfWeek[value - 1]
    },
    label: 'день',
    align: 'center',
    active: true,
    discount: true
  },
  {
    name: 'hourFrom',
    label: 'время',
    format: (value, { hourFrom, hourTo }) => [hourFrom, hourTo].map(
      item => `${item}:00`
    ).join(' — '),
    width: 100,
    align: 'center',
    active: true,
    discount: true
  },
  {
    name: 'minHours',
    label: 'Мин. часы',
    align: 'right',
    width: 200,
    active: true,
    discount: true
  },
  {
    name: 'expiredAt',
    label: 'Активна до',
    format: value => date.formatDate(value, 'D MMMM'),
    width: 250,
    align: 'center',
    active: true,
    discount: true
  }
]
