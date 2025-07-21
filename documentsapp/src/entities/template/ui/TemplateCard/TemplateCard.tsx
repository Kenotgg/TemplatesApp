import React from "react";
import { Link } from "react-router-dom";
import type { ITemplate } from "@/entities/template/model/types";
import { Avatar, Box, Button, Card, CardFooter, CardHeader, Flex, Heading, Stack, Stat, StatLabel, Text } from "@chakra-ui/react";
import { truncateText } from "@/shared/lib/utils/trancuateText";
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
        <Box>
            <Card.Root display={'flex'} variant={"elevated"} className="border border-gray-200 rounded-lg">
                <CardHeader  >
                    <Box className="flex items-center" >
                        <Stack direction={'column'}>
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
                <CardFooter width={30} className="flex justify-between items-center">
                    <Flex justify="space-around" wrap="wrap">
                        <Stack direction={'row'}>
                            {(onEdit || onDelete || onDuplicate) && (
                                <div>
                                    {onEdit && <Button onClick={() => onEdit(template.id)}>Edit</Button>}
                                    {onDuplicate && <Button onClick={() => onDuplicate(template.id)}>Duplicate</Button>}
                                    {onDelete && <Button onClick={() => onDelete(template.id)}>Delete</Button>}
                                </div>
                            )}
                             <Link to={`/template/${template.id}`}>Посмотреть детали</Link>
                        </Stack>
                    </Flex>
                </CardFooter>
            </Card.Root>
           
        </Box>

    )
})