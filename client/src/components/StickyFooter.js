import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >

                <Box
                    component="footer"
                    sx={{
                        // borderTop :'1px solid white',
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: 'black',
                        color: 'white'
                    }}
                >
                    <Container maxWidth="sm"> 
                        <Typography>
                            <a href="https://bloggsy.onrender.com" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon color='primary' />
                            </a>
                            <a href='https://www.linkedin.com/in/rugved-wagh-aa51ab207/' target='_blank'>
                                <LinkedInIcon color='primary' />
                            </a>
                        </Typography>
                        <Typography variant="body1">
                            Created by rugved
                        </Typography>
                        <Typography variant="body1" color="white">
                            {'Copyright © '}
                            <Link color="inherit" href="https://bloggy-3d0t.onrender.com/">
                                Blogsy
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

