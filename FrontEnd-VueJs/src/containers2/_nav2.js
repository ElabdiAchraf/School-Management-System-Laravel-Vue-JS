export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'prof',
        to: '/prof/dashboard',
        icon: 'cil-speedometer',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'mes_modules',
        to: '/prof/mes_modules',
        icon: 'cil-speedometer',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reservation Salle',
        to: '/prof/reserver',
        icon: 'cil-speedometer',

      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'mes_modules',
      //   to: 'gestion_notes/:id',
      //   icon: 'cil-speedometer',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW'
      //   }
      // }
    ]
  }
]