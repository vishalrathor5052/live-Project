import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, styled } from '@mui/material';
import { useDispatch } from 'src/store';
import { Item, SidebarProps } from 'src/Interface/Interface';
import { memo, useState, useEffect } from 'react';
import { IconButtonComponent } from './IconButtonComponent';
import IMAGE from '../shared/Image';
import { setHeaderTitle, setWardEmployee } from '../store/actions/header';

const listItems: Item[] = [
  // {
  //   label: 'Wards',
  //   path: '/wards',
  //   exact: false,
  //   helper: 'Manage wards',
  //   icon: IMAGE.wardImage,
  //   activeIcon: IMAGE.wardActiveImage,
  //   title: 'All Wards',
  // },
  // {
  //   label: 'People',
  //   path: '/people',
  //   exact: false,
  //   helper: 'Manage people',
  //   icon: IMAGE.peopleImage,
  //   activeIcon: IMAGE.peopleActiveImage,
  //   title: 'People Management',
  // },
  {
    label: 'Rostering',
    path: '/rostering',
    exact: false,
    helper: 'Manage rosters',
    icon: IMAGE.rosterImage,
    activeIcon: IMAGE.rosterActiveImage,
    title: 'Roster Management',
  },
  // {
  //   label: 'Roles',
  //   path: '/roles',
  //   exact: false,
  //   helper: 'Manage roles and permissions',
  //   icon: IMAGE.roleImage,
  //   activeIcon: IMAGE.roleActiveImage,
  //   title: 'Roles and Permissions',
  // },
];

const ListItem = styled(ListItemButton)(() => ({
  paddingLeft: '0%',
  paddingRight: '0%',
}));

const SideBarComponent = ({ textStyle }: SidebarProps): JSX.Element => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const handleHeaderTitle = (titleData: Item, index: number) => {
    const { title, path } = titleData;
    dispatch(setHeaderTitle(title));
    history.push(path);
    setIndex(index);
    dispatch(setWardEmployee('Wards'));
  };

  useEffect(() => {
    const routeIndex = listItems.findIndex(item => item.path === pathname);
    setIndex(routeIndex);
  }, [pathname]);

  return (
    <List>
      {listItems.map((route: Item, ind: number) => (
        <ListItem
          style={{ padding: ' 20px 0' }}
          selected={
            route.exact
              ? pathname === route.path
              : pathname.startsWith(route.path)
          }
          key={route.label}
          onClick={() => handleHeaderTitle(route, ind)}
        >
          <ListItemIcon sx={textStyle}>
            <IconButtonComponent
              imgSrc={ind === index ? route.activeIcon : route.icon}
              size={'small'}
              customStyle={{ height: '30px', width: '30px' }}
              fontSize={'inherit'}
              label={'notification'}
            />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

export default memo(SideBarComponent);
