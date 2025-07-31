import React from "react";
import { Link } from 'react-router-dom';
import { Box, Stack, Avatar, Text } from '@chakra-ui/react';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
interface HeaderProps {
    user: any | null;
}
export const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <Box>
            {user ? (
                <Box bgGradient='linear(to-r, blue.400, blue.500)' margin={0} height={50} top={0} zIndex={1000} color={'white'}>
                    <Stack display={'flex'} alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                        <Link style={{ fontSize: 21, marginLeft: 10 }} to='/templates'>Главная</Link>
                        <Text fontWeight={'bold'} fontSize={32}>TemplatesApp</Text>
                        <Link style={{ fontSize: 21, marginRight: 10 }} to='/profile'> <Stack direction={"row"}><Text alignSelf={'center'}>{user.name}</Text> <Avatar></Avatar>  </Stack></Link>
                    </Stack>
                </Box>
            ) : (
                <></>
            )}
        </Box>

    );
}