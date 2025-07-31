import React from "react";
import { Link } from "react-router-dom";
import type { ITemplate } from "@/entities/template/model/types";
import { Image, Box, Button, Card, CardFooter, CardHeader, Flex, Heading, Stack, Stat, StatLabel, Text } from "@chakra-ui/react";
import { truncateText } from "@/shared/lib/helpers/trancuateText";


interface TemplateCardProps {
    template: ITemplate;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = React.memo(({
    template,
    onEdit,
    onDelete,
    onDuplicate,
}) => {
    const formatedCreatedAt = new Date(template.createdAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const trancuatedDescription = truncateText(template.description, 50)
    return (
        <Box borderRadius={"md"} boxShadow={"md"} border={"2px solid"} borderColor={'gray.200'}  >
            <Link to={`/template/${template.id}`}>
                <Card display={'flex'} variant={"elevated"}>
                    <CardHeader>
                        <Box className="flex items-center" >
                            <Stack direction={'column'}>
                                <Image src={'../public/1.jpg'}></Image>
                                <Heading marginLeft={2} title={template.name} data-tooltip-id="my-toolTip" size={'md'}>{template.name}</Heading>
                                <Stack marginLeft={2} direction={'column'}>
                                    <Stack>
                                        <Text>{trancuatedDescription}</Text>
                                        <Text>Статус: {template.status}</Text>
                                    </Stack>
                                    <Text>
                                        <Text fontSize="sm">
                                            Создан: {formatedCreatedAt}
                                        </Text>
                                    </Text>

                                </Stack>
                            </Stack>
                        </Box>

                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                        <Flex justify="space-around" wrap="wrap">
                            <Stack direction={'row'}>
                                {(onEdit || onDelete || onDuplicate) && (
                                    <div>
                                        {onEdit && <Button onClick={() => onEdit(template.id)}>Изменить</Button>}
                                        {onDuplicate && <Button onClick={() => onDuplicate(template.id)}>Дублировать</Button>}
                                        {onDelete && <Button onClick={() => onDelete(template.id)}>Удалить</Button>}
                                    </div>
                                )}
                            </Stack>
                        </Flex>
                    </CardFooter>
                </Card>
            </Link>
        </Box >

    )
})