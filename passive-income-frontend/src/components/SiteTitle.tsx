import { Typography } from "@mui/material";

const SiteTitle = ({ children }: { children: string }) => {
  return (
    <Typography
      variant="h6"
      marginBottom={2}
      display="flex"
      alignItems="center"
      borderBottom="2px solid"
      pb={1}
      fontWeight="2xl"
    >
      {children}
    </Typography>
  );
};

export default SiteTitle;
