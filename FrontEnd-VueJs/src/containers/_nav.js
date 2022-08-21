export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['personnes']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'utilisateurs',
        route: '/users',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Créer Utilsateur',
            to: '/users/create'
          },
          {
            name: 'Professeurs',
            to: '/users/professeurs'
          },
          {
            name: 'Etudiants',
            to: '/users/etudiants'
          },
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Gestions']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Classes',
        to: '/classes',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Modules',
        to: '/modules/get',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reservations',
        to: '/reservation',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'PFE',
        to: '/pfes',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Salles',
        to: '/salles',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Seance',
        to: '/seances',
        icon: 'cil-drop'
      },


    ]
  }
]