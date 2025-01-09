import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menu',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  },
 
  {
    displayName: 'Stock',
    iconName: 'solar:widget-add-line-duotone',
    route: '/ui-components/list-stock',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Insurance',
    iconName: 'solar:widget-add-line-duotone',
    route: '/ui-components/list-insurance',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Claims',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/list-claims',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Forecast',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/list-forcast',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Formations',
    iconName: 'solar:widget-add-line-duotone',
    route: '/ui-components/list-course',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  }  ,{
    displayName: 'My Formations',
    iconName: 'solar:widget-add-line-duotone',
    route: '/ui-components/myformation',
    isAdmin: false,  // Only accessible for non-admin users
    isFormateur: false, // Visible uniquement pour les formateurs

  }
  ,
  {
    displayName: 'Insurance',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/insurance',
    isAdmin: true,  // Only accessible for admins
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Forecast',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/forecast',
    isAdmin: true,  // Only accessible for admins
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Claims',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/claims',
    isAdmin: true,  // Only accessible for admins
    isFormateur: false, // Visible uniquement pour les formateurs

  },
  {
    displayName: 'Stock',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/stock',
    isAdmin: true,  // Only accessible for admins
    isFormateur: false, // Visible uniquement pour les formateurs
  },
  {
    displayName: 'Formations',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/courses',
    isAdmin: true,  // Only accessible for admins
    isFormateur: true, // Visible uniquement pour les formateurs
  },
  {
    displayName: 'Lessons',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lessons',
    isAdmin: true,  // Only accessible for admins
    isFormateur: true, // Visible uniquement pour les formateurs
  },
  {
    displayName: 'Contests',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/contests',
    isAdmin: true,  // Only accessible for admins
    isFormateur: true, // Visible uniquement pour les formateurs
  },
  {
    displayName: 'Games',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/games',
    isAdmin: true,  // Only accessible for admins
    isFormateur: true, // Visible uniquement pour les formateurs
  },

];
