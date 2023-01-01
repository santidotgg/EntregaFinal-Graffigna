import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box sx={{ width: '95%', margin:'5%' }}>
      <LinearProgress />
    </Box>
  );
}