import { useEffect, useState } from 'react';
import { Box, Divider, Typography, Stack, MenuItem, IconButton, Popover, CircularProgress } from '@mui/material';
import { ICONS } from 'src/assets/library';
import { GET_NOTIFICATIONS } from 'src/apiService/apiDeclaration';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { setNotifications } from 'src/redux/features/auth/slice';
import { useNavigate } from 'react-router-dom';

export default function NotificationPopovers() {
  const [open, setOpen] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.auth.notifications);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const getNotifications = async () => {
    setLoading(true);
    try {
      const resp = await GET_NOTIFICATIONS(page, user._id);
      const newNotifications = [...notifications, ...resp.data.rows];
      setNotifications(newNotifications);
      dispatch(setNotifications(newNotifications));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderRelativeTime = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date);
  };

  const handleNavigate = (data) => {
    navigate('/order-details', { state: data });
  };

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
            },
          }),
        }}
      >
        {ICONS.notification}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 345,
            height: 'max-content',
            maxHeight: '70vh',
            overflowY: 'auto',
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          {ICONS.notification}
          <Typography variant="h5" color={'#acd629'} noWrap>
            Notifications
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack>
          {notifications.map((item, index) => (
            <>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleNavigate(item.orderId);
                }}
                sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                key={index}
              >
                <Box
                  sx={{
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    bgcolor: 'whitesmoke',
                  }}
                >
                  {ICONS.notificationOutline}
                </Box>
                <Box sx={{ width: '80%', display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                    variant="h8"
                  >
                    <b>{user.language === 'ENGLISH' ? item.enTitle : item.frTitle}</b>
                    <br />
                    {user.language === 'ENGLISH' ? item.enMessage : item.frMessage}
                  </Typography>
                  <Typography variant="h7">{renderRelativeTime(item.createdAt)}</Typography>
                </Box>
              </MenuItem>
              <Divider style={{ margin: 0 }} />
            </>
          ))}

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          <Typography
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            onClick={() => !loading && setPage(page + 1)}
          >
            See more
          </Typography>
        </Stack>
      </Popover>
    </>
  );
}
