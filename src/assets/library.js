import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableChartIcon from '@mui/icons-material/TableChart';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

export const IMAGES = {
  logo: require('./logo.png'),
  google:
    'https://firebasestorage.googleapis.com/v0/b/jacques-bf86d.appspot.com/o/jacquesAssets%2FgoogleLogo.png?alt=media&token=baeb8119-7004-42ed-a780-2dd79902e6f0',
};

export const ICONS = {
  PROFILE: <AccountBoxIcon color="primary" />,
  GRID: <TableChartIcon color="primary" />,
  MENU: <MenuIcon />,
  USER: <Person2Icon />,
  EMAIL: <EmailIcon />,
  PASSWORD: <LockIcon />,
  VISIBLE: <VisibilityIcon />,
  HIDE: <VisibilityOffIcon />,
  HELP: <HelpIcon color="primary" fontSize="15px" style={{ cursor: 'pointer' }} />,
  DELETE: <DeleteIcon />,
  EDIT: <EditIcon />,
  VIEW: <VisibilityIcon />,
  MORE: <MoreVertIcon />,
  SEARCH: <SearchIcon />,
};
