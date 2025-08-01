import React from "react";
import { Link } from 'react-router-dom';
import { Box, Stack, Avatar, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
import { AiFillHome } from "react-icons/ai";
import { truncateText } from "@/shared/lib/helpers/trancuateText";
interface HeaderProps {
    user: any | null;
}
export const Header: React.FC<HeaderProps> = ({ user }) => {

    // Определяем значение justify-content на основе ширины экрана
    const justifyContent = useBreakpointValue({
        base: 'flex-end', // Для очень маленьких экранов - прижимаем к правому краю
        sm: 'space-between', // Для маленьких экранов и больше - стандартное поведение
    });

    // Определяем, показывать ли логотип
    const showLogo = useBreakpointValue({
        base: false, // Скрываем на очень маленьких экранах
        sm: true, // Показываем на маленьких экранах и больше
    });
    const nameText = truncateText(user.name, 15);
    return (
        <Box>
            {user ? (
                <Box userSelect={'none'} bgGradient='linear(to-r, blue.400, blue.500)' margin={0} top={0} height={'80px'} position={'sticky'} width={'100%'} color={'white'}>
                    <Stack ml={'2'} mr={'2'} display={'flex'} alignItems={'center'} justifyItems={'center'} justifyContent={'space-between'} direction={'row'}>
                        <Link draggable={'false'} style={{ fontSize: 21, marginLeft: 10 }} to='/templates'>
                            <Icon justifySelf={'center'} alignSelf={'center'} boxSize={'45px'} as={AiFillHome}></Icon>
                        </Link>
                        {showLogo && (
                            <Text draggable={'false'} fontWeight={'bold'} fontSize={50}>TemplatesApp</Text>
                        )}
                        <Link draggable={'false'} style={{ fontSize: 21, marginRight: 10 }} to='/profile'>
                            <Stack direction={"row"}>
                                <Text fontWeight={'medium'} alignSelf={'center'}>{nameText}</Text>
                                <Avatar></Avatar>
                            </Stack>
                        </Link>
                    </Stack>
                </Box>
            ) : (
                <></>
            )}
        </Box>

    );
}