export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Mes Modules',
        to: '/etudiant/dashboard',
        icon: 'cil-speedometer',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'mes Notes',
        to: '/etudiant/mesnotes',
        icon: 'cil-speedometer',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Emploi de Temps',
        to: 'etudiant/emploi',
        icon: 'cil-speedometer',

      },
    ]
  }
]